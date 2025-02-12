"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { getData, getUniqueTopics } from "@/actions/schemes";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import NavButtons from "./FormNavButtons";
import { setCurrentStep, updateFormData } from "@/store/slices/SchemeSlice";

// Zod validation schema – extend as needed.
const formSchema = z.object({
  topics: z.array(z.string()).min(1, "Select at least one topic."),
  subtopics: z.record(z.array(z.string())),
});

export default function TopicSubtopicSelectorForm() {
  const [topics, setTopics] = useState<string[]>([]);
  const [subtopicsByTopic, setSubtopicsByTopic] = useState<{ [key: string]: string[] }>({});
  const dispatch = useAppDispatch();
  const formStateData = useAppSelector((state: any) => state.schemes.formData);
  const currentStep = useAppSelector((state: any) => state.schemes.currentStep);

  // Initialize the form with default values.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topics: formStateData?.selectedTopics || [],
      subtopics: formStateData?.selectedSubtopics || {},
    },
  });

  const selectedTopics = form.watch("topics");
  const selectedSubtopics = form.watch("subtopics");

  // Reset form values if global state changes.
  useEffect(() => {
    form.reset({
      topics: formStateData?.selectedTopics || [],
      subtopics: formStateData?.selectedSubtopics || {},
    });
  }, [formStateData, form]);

  // Fetch topics and subtopics from your data source.
  useEffect(() => {
    async function fetchTopicsAndSubtopics() {
      const databaseModelName = formStateData?.class + formStateData?.subject;
      const fullData: any = await getData(databaseModelName);
      const uniqueTopics = await getUniqueTopics(fullData);
      setTopics(uniqueTopics);

      // Build a mapping of each topic to its unique subtopics,
      // preserving the order as they appear in the full data.
      const mapping: { [key: string]: string[] } = {};
      uniqueTopics.forEach((topic) => {
        const subtopics = fullData
          .filter((item: any) => item.TOPIC === topic)
          .map((item: any) => item.SUBTOPIC);
        // Remove duplicates while preserving the first occurrence order.
        const uniqueSubtopics = subtopics.filter(
          (value: any, index: number, self: any) => self.indexOf(value) === index
        );
        mapping[topic] = uniqueSubtopics;
      });
      setSubtopicsByTopic(mapping);
    }
    fetchTopicsAndSubtopics();
  }, [formStateData?.class, formStateData?.subject]);

  // Toggle topic selection while preserving order.
  // If a topic is checked, preselect all its subtopics.
  const handleTopicCheckedChange = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      // Remove the topic and its subtopics
      const newTopics = selectedTopics.filter((t: string) => t !== topic);
      form.setValue("topics", topics.filter((t) => newTopics.includes(t)));
      const newSubtopics = { ...selectedSubtopics };
      delete newSubtopics[topic];
      form.setValue("subtopics", newSubtopics);
    } else {
      // Add the topic and preselect all its subtopics (if available)
      const newTopics = [...selectedTopics, topic];
      const orderedSelection = topics.filter((t) => newTopics.includes(t));
      form.setValue("topics", orderedSelection);
      // Only set subtopics if not already selected.
      if (!selectedSubtopics[topic] || selectedSubtopics[topic].length === 0) {
        form.setValue("subtopics", { ...selectedSubtopics, [topic]: subtopicsByTopic[topic] || [] });
      }
    }
  };

  // Toggle subtopic selection for a given topic, preserving order.
  const handleSubtopicCheckedChange = (topic: string, subtopic: string) => {
    const currentSubtopics = selectedSubtopics[topic] || [];
    const newSubtopics = currentSubtopics.includes(subtopic)
      ? currentSubtopics.filter((s: string) => s !== subtopic)
      : [...currentSubtopics, subtopic];
    const orderedSubtopics = (subtopicsByTopic[topic] || []).filter((s) => newSubtopics.includes(s));
    form.setValue("subtopics", { ...selectedSubtopics, [topic]: orderedSubtopics });
  };

  const onSubmit = (data: { topics: string[]; subtopics: Record<string, string[]> }) => {
    dispatch(updateFormData({ selectedTopics: data.topics, selectedSubtopics: data.subtopics }));
    dispatch(setCurrentStep(currentStep + 1));
    console.log("Submitted data:", data);
  };

  return (
    <Card className="max-w-lg mx-auto p-6 shadow-md">
      <h2 className="text-lg font-bold mb-4">Select Topics and Subtopics</h2>

      {topics.length === 0 ? (
        <p>Loading topics...</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topics"
              render={() => (
                <div className="space-y-4">
                  {topics.map((topic) => (
                    <div key={topic} className="border p-2 rounded">
                      {/* Topic Checkbox */}
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={selectedTopics.includes(topic)}
                            onCheckedChange={() => handleTopicCheckedChange(topic)}
                          />
                        </FormControl>
                        <span>{topic}</span>
                      </div>

                      {/* Render Subtopics ONLY if the topic is selected */}
                      {selectedTopics.includes(topic) &&
                        subtopicsByTopic[topic] &&
                        subtopicsByTopic[topic].length > 0 && (
                          <div className="ml-6 mt-2 space-y-1">
                            {subtopicsByTopic[topic].map((subtopic) => (
                              <div key={subtopic} className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={selectedSubtopics[topic]?.includes(subtopic) || false}
                                    onCheckedChange={() => handleSubtopicCheckedChange(topic, subtopic)}
                                  />
                                </FormControl>
                                <span>{subtopic}</span>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                  <FormMessage />
                </div>
              )}
            />
            <NavButtons />
          </form>
        </Form>
      )}

      {/* Debugging output to see the current selections */}
      <div className="mt-4 p-2 bg-gray-100 rounded dark:bg-slate-700">
        <h3 className="font-semibold">Selected Topics:</h3>
        <pre className="text-sm">{JSON.stringify(selectedTopics, null, 2)}</pre>
        <h3 className="font-semibold">Selected Subtopics:</h3>
        <pre className="text-sm">{JSON.stringify(selectedSubtopics, null, 2)}</pre>
      </div>
    </Card>
  );
}
