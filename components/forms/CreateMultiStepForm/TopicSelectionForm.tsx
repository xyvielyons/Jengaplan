"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getData, getUniqueTopics } from "@/actions/schemes";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import NavButtons from "./FormNavButtons";
import { setCurrentStep, updateFormData } from "@/store/slices/SchemeSlice";

// Zod validation schema
const formSchema = z.object({
  topics: z.array(z.string()).min(1, "Select at least one topic."),
});

export default function TopicSelectorForm() {
  const [topics, setTopics] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const formStateData = useAppSelector((state: any) => state.schemes.formData);
  const currentStep = useAppSelector((state) => state.schemes.currentStep);

  // Initialize the form using any pre-selected topics from global state.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { topics: formStateData?.selectedTopics || [] },
  });

  const selectedTopics: string[] = form.watch("topics");

  // If the global state changes and contains selected topics, update the form.
  useEffect(() => {
    if (formStateData?.selectedTopics) {
      form.setValue("topics", formStateData.selectedTopics);
    }
  }, [formStateData?.selectedTopics]);

  // Fetch topics from server action
  useEffect(() => {
    async function fetchTopics() {
      const databaseModelName = formStateData?.class + formStateData?.subject;
      const getFullDbData = await getData(databaseModelName);
      const getTopics = await getUniqueTopics(getFullDbData);
      setTopics(getTopics);
    }
    fetchTopics();
  }, []);

  // Function to toggle topic selection while maintaining order
  const handleCheckedChange = (topic: string) => {
    const newSelection = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic) // Remove if already selected
      : [...selectedTopics, topic]; // Add new topic

    // Ensure the selection follows the original order defined by topics
    const orderedSelection = topics.filter((t) => newSelection.includes(t));
    form.setValue("topics", orderedSelection);
  };

  const onSubmit = (data: { topics: string[] }) => {
    dispatch(updateFormData({ selectedTopics: data.topics }));
    dispatch(setCurrentStep(currentStep + 1));
    console.log(data);
  };

  return (
    <Card className="max-w-lg mx-auto p-6 shadow-md">
      <h2 className="text-lg font-bold mb-4">Select Topics</h2>

      {topics.length === 0 ? (
        <p>Loading topics...</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topics"
              render={() => (
                <div className="space-y-2">
                  {topics.map((topic) => (
                    <FormItem key={topic} className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={selectedTopics.includes(topic)}
                          onCheckedChange={() => handleCheckedChange(topic)}
                        />
                      </FormControl>
                      <span>{topic}</span>
                    </FormItem>
                  ))}
                  <FormMessage />
                </div>
              )}
            />
            <NavButtons />
          </form>
        </Form>
      )}

      {/* Display selected topics */}
      <div className="mt-4 p-2 bg-gray-100 rounded dark:bg-slate-700">
        <h3 className="font-semibold">Selected Topics:</h3>
        <pre className="text-sm">{JSON.stringify(selectedTopics, null, 2)}</pre>
      </div>
    </Card>
  );
}
