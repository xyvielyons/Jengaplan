"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { getData, getUniqueTopics } from "@/actions/schemes";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import NavButtons from "./FormNavButtons";
import { setCurrentStep, updateFormData } from "@/store/slices/SchemeSlice";

export default function TopicSubtopicSelectorForm() {
  // Get the global form data
  const formStateData = useAppSelector((state: any) => state.schemes.formData);
  const currentStep = useAppSelector((state: any) => state.schemes.currentStep);
  const dispatch = useAppDispatch();

  // Determine if the school level is primary
  const isPrimary = formStateData?.schoolLevel === "primary";

  // Define two separate schemas:
  const schemaPrimary = z.object({
    strands: z.array(z.string()).min(1, "Select at least one strand."),
    substrands: z.record(z.array(z.string())),
  });

  const schemaSecondary = z.object({
    topics: z.array(z.string()).min(1, "Select at least one topic."),
    subtopics: z.record(z.array(z.string())),
  });

  // Choose the appropriate schema and default values based on school level.
  const resolvedSchema = isPrimary ? schemaPrimary : schemaSecondary;

  const form = useForm({
    resolver: zodResolver(resolvedSchema),
    defaultValues: isPrimary
      ? {
          strands: formStateData?.selectedStrands || [],
          substrands: formStateData?.selectedSubstrands || {},
        }
      : {
          topics: formStateData?.selectedTopics || [],
          subtopics: formStateData?.selectedSubtopics || {},
        },
  });

  // For secondary (topics/subtopics)
  const [topics, setTopics] = useState<string[]>([]);
  const [subtopicsByTopic, setSubtopicsByTopic] = useState<{ [key: string]: string[] }>({});

  // For primary (strands/substrands)
  const [strands, setStrands] = useState<string[]>([]);
  const [substrandsByStrand, setSubstrandsByStrand] = useState<{ [key: string]: string[] }>({});

  // Watch form values
  const selectedTopics = form.watch("topics");
  const selectedSubtopics = form.watch("subtopics");
  const selectedStrands = form.watch("strands");
  const selectedSubstrands = form.watch("substrands");

  // Reset form values if global state changes.
  useEffect(() => {
    form.reset(
      isPrimary
        ? {
            strands: formStateData?.selectedStrands || [],
            substrands: formStateData?.selectedSubstrands || {},
          }
        : {
            topics: formStateData?.selectedTopics || [],
            subtopics: formStateData?.selectedSubtopics || {},
          }
    );
  }, [formStateData, form, isPrimary]);

  // Fetch data from your data source.
  useEffect(() => {
    async function fetchData() {
      const databaseModelName = formStateData?.class + formStateData?.subject;
      const fullData: any = await getData(databaseModelName);

      if (isPrimary) {
        // Build unique strands and their substrands.
        const uniqueStrands:any = Array.from(new Set(fullData.map((item: any) => item.STRANDS)));
        setStrands(uniqueStrands);
        const mapping: { [key: string]: string[] } = {};
        uniqueStrands.forEach((strand:any) => {
          const sub = fullData
            .filter((item: any) => item.STRANDS === strand)
            .map((item: any) => item.SUBSTRANDS);
          const uniqueSub = sub.filter(
            (value: any, index: number, self: any) => self.indexOf(value) === index
          );
          mapping[strand] = uniqueSub;
        });
        setSubstrandsByStrand(mapping);
      } else {
        // Build unique topics and their subtopics.
        const uniqueTopics = await getUniqueTopics(fullData);
        setTopics(uniqueTopics);
        const mapping: { [key: string]: string[] } = {};
        uniqueTopics.forEach((topic) => {
          const subs = fullData.filter((item: any) => item.TOPIC === topic).map((item: any) => item.SUBTOPIC);
          const uniqueSubtopics = subs.filter(
            (value: any, index: number, self: any) => self.indexOf(value) === index
          );
          mapping[topic] = uniqueSubtopics;
        });
        setSubtopicsByTopic(mapping);
      }
    }
    fetchData();
  }, [formStateData?.class, formStateData?.subject, isPrimary]);

  // Toggle functions for secondary: topics/subtopics.
  const handleTopicCheckedChange = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      const newTopics = selectedTopics.filter((t: string) => t !== topic);
      form.setValue("topics", topics.filter((t) => newTopics.includes(t)));
      const newSubtopics = { ...selectedSubtopics };
      delete newSubtopics[topic];
      form.setValue("subtopics", newSubtopics);
    } else {
      const newTopics = [...selectedTopics, topic];
      const orderedSelection = topics.filter((t) => newTopics.includes(t));
      form.setValue("topics", orderedSelection);
      if (!selectedSubtopics[topic] || selectedSubtopics[topic].length === 0) {
        form.setValue("subtopics", { ...selectedSubtopics, [topic]: subtopicsByTopic[topic] || [] });
      }
    }
  };

  const handleSubtopicCheckedChange = (topic: string, subtopic: string) => {
    const currentSubtopics = selectedSubtopics[topic] || [];
    const newSubtopics = currentSubtopics.includes(subtopic)
      ? currentSubtopics.filter((s: string) => s !== subtopic)
      : [...currentSubtopics, subtopic];
    const orderedSubtopics = (subtopicsByTopic[topic] || []).filter((s) => newSubtopics.includes(s));
    form.setValue("subtopics", { ...selectedSubtopics, [topic]: orderedSubtopics });
  };

  // Toggle functions for primary: strands/substrands.
  const handleStrandCheckedChange = (strand: string) => {
    if (selectedStrands.includes(strand)) {
      const newStrands = selectedStrands.filter((s: string) => s !== strand);
      form.setValue("strands", strands.filter((s) => newStrands.includes(s)));
      const newSubstrands = { ...selectedSubstrands };
      delete newSubstrands[strand];
      form.setValue("substrands", newSubstrands);
    } else {
      const newStrands = [...selectedStrands, strand];
      const orderedSelection = strands.filter((s) => newStrands.includes(s));
      form.setValue("strands", orderedSelection);
      if (!selectedSubstrands[strand] || selectedSubstrands[strand].length === 0) {
        form.setValue("substrands", { ...selectedSubstrands, [strand]: substrandsByStrand[strand] || [] });
      }
    }
  };

  const handleSubstrandCheckedChange = (strand: string, substrand: string) => {
    const currentSubstrands = selectedSubstrands[strand] || [];
    const newSubstrands = currentSubstrands.includes(substrand)
      ? currentSubstrands.filter((s: string) => s !== substrand)
      : [...currentSubstrands, substrand];
    const orderedSubstrands = (substrandsByStrand[strand] || []).filter((s) => newSubstrands.includes(s));
    form.setValue("substrands", { ...selectedSubstrands, [strand]: orderedSubstrands });
  };

  // onSubmit: update the global state accordingly.
  const onSubmit = (data: any) => {
    if (isPrimary) {
      dispatch(updateFormData({ selectedStrands: data.strands, selectedSubstrands: data.substrands }));
    } else {
      dispatch(updateFormData({ selectedTopics: data.topics, selectedSubtopics: data.subtopics }));
    }
    dispatch(setCurrentStep(currentStep + 1));
    console.log("Submitted data:", data);
  };

  return (
    <Card className="mx-auto p-6 shadow-md">
      <h2 className="text-lg font-bold mb-4">
        {isPrimary ? "Select Strands and Substrands" : "Select Topics and Subtopics"}
      </h2>

      {(isPrimary ? strands.length === 0 : topics.length === 0) ? (
        <p>Loading {isPrimary ? "strands" : "topics"}...</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {isPrimary ? (
              <FormField
                control={form.control}
                name="strands"
                render={() => (
                  <div className="space-y-4">
                    {strands.map((strand) => (
                      <div key={strand} className="border p-2 rounded">
                        {/* Strand Checkbox */}
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={selectedStrands.includes(strand)}
                              onCheckedChange={() => handleStrandCheckedChange(strand)}
                            />
                          </FormControl>
                          <span>{strand}</span>
                        </div>

                        {/* Render Substrands if the strand is selected */}
                        {selectedStrands.includes(strand) &&
                          substrandsByStrand[strand] &&
                          substrandsByStrand[strand].length > 0 && (
                            <div className="ml-6 mt-2 space-y-1">
                              {substrandsByStrand[strand].map((substrand) => (
                                <div key={substrand} className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={selectedSubstrands[strand]?.includes(substrand) || false}
                                      onCheckedChange={() => handleSubstrandCheckedChange(strand, substrand)}
                                    />
                                  </FormControl>
                                  <span>{substrand}</span>
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
            ) : (
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

                        {/* Render Subtopics if the topic is selected */}
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
            )}
            <NavButtons />
          </form>
        </Form>
      )}

      {/* Debugging output */}
      <div className="mt-4 p-2 bg-gray-100 rounded dark:bg-slate-700">
        <h3 className="font-semibold">
          {isPrimary ? "Selected Strands:" : "Selected Topics:"}
        </h3>
        <pre className="text-sm">
          {JSON.stringify(isPrimary ? selectedStrands : selectedTopics, null, 2)}
        </pre>
        <h3 className="font-semibold">
          {isPrimary ? "Selected Substrands:" : "Selected Subtopics:"}
        </h3>
        <pre className="text-sm">
          {JSON.stringify(isPrimary ? selectedSubstrands : selectedSubtopics, null, 2)}
        </pre>
      </div>
    </Card>
  );
}
