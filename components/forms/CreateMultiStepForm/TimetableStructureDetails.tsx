'use client'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@heroui/react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  lessonsPerWeek: z.coerce.number(),
  startWeek: z.coerce.number(),
  startLesson: z.coerce.number(),
  endWeek: z.coerce.number(),
  endLesson: z.coerce.number(),
  doubleLesson: z.array(z.number()).default([]), // default value set here
})

import { primaryClasses, primarySubjects, secondaryClasses, secondarySubjects } from '@/constants'
import NavButtons from './FormNavButtons'
import { setCurrentStep, updateFormData } from '@/store/slices/SchemeSlice'

type Props = {}

const TimetableStructureDetails = (props: Props) => {
  // Retrieve previous form data from Redux
  const formData = useAppSelector((state: any) => state.schemes.formData)
  // Initialize the double-lesson toggle based on whether previous data exists
  const [showDoubleLesson, setShowDoubleLesson] = useState<any>(
    !!(formData.doubleLesson && formData.doubleLesson.length > 0)
  )
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector((state: any) => state.schemes.currentStep)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formData,
    },
  })

  // Helper function to generate lesson pairs for double lessons
  const lessonPairs = () => {
    const lessons = form.watch('lessonsPerWeek') || 1;
    const pairs: [number, number][] = []
    for (let i = 1; i < lessons; i++) {
      pairs.push([i, i + 1])
    }
    return pairs;
  };

  // Submit handler: update the Redux form data and move to the next step
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(updateFormData(values))
    dispatch(setCurrentStep(currentStep + 1));
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* Lessons per week */}
          <FormField
            control={form.control}
            name="lessonsPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of lessons per week</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(Number(value))
                    }}
                    defaultValue={String(field.value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="4" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 lesson per week</SelectItem>
                      <SelectItem value="2">2 lessons per week</SelectItem>
                      <SelectItem value="3">3 lessons per week</SelectItem>
                      <SelectItem value="4">4 lessons per week</SelectItem>
                      <SelectItem value="5">5 lessons per week</SelectItem>
                      <SelectItem value="6">6 lessons per week</SelectItem>
                      <SelectItem value="7">7 lessons per week</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Lesson Details */}
          <h1 className="text-[16px] font-bold text-gray-800 dark:text-gray-200">First Lesson details</h1>
          <div className="flex flex-col md:items-center md:justify-center md:flex-row gap-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="startWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Week of Teaching</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={1}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="startLesson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Lesson of Teaching</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value))
                        }}
                        defaultValue={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select lesson" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(form.watch('lessonsPerWeek') || 1)].map((_, index) => (
                            <SelectItem key={index + 1} value={String(index + 1)}>
                              Lesson {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Last Lesson Details */}
          <h1 className="text-[16px] font-bold text-gray-800 dark:text-gray-200">Last Lesson details</h1>
          <div className="flex flex-col md:items-center md:justify-center md:flex-row gap-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="endWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Week of Teaching</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="endLesson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Lesson of Teaching</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value))
                        }}
                        defaultValue={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select lesson" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(form.watch('lessonsPerWeek') || 1)].map((_, index) => (
                            <SelectItem key={index + 1} value={String(index + 1)}>
                              Lesson {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Double Lesson Toggle */}
          <div className="flex items-center gap-2 py-4 ">
            <Checkbox
              id="double-lesson"
              checked={showDoubleLesson}
              onCheckedChange={(checked:any) => {
                setShowDoubleLesson(checked);
                if (!checked) {
                  // Reset the doubleLesson field to an empty array when unchecked
                  form.setValue("doubleLesson", []);
                }
              }}
            />
            <FormLabel htmlFor="double-lesson">Enable double lessons</FormLabel>
          </div>

          {/* Double Lesson Selection */}
          {showDoubleLesson && (
            <FormField
              control={form.control}
              name="doubleLesson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Double Lesson</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        // Parse the JSON value (e.g., "[1,2]") and update the field
                        field.onChange(JSON.parse(value));
                      }}
                      defaultValue={field.value && field.value.length > 0 ? JSON.stringify(field.value) : ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select double lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        {lessonPairs().map((pair, index) => (
                          <SelectItem key={index} value={JSON.stringify(pair)}>
                            {`Lesson ${pair[0]} & ${pair[1]}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Navigation Buttons */}
          <NavButtons />
        </form>
      </Form>
    </div>
  )
}

export default TimetableStructureDetails;
