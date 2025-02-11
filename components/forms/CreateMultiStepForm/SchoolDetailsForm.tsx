'use client'
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@heroui/react'
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { primaryClasses, primarySubjects, secondaryClasses, secondarySubjects } from '@/constants'
import NavButtons from './FormNavButtons'
import { setCurrentStep, updateFormData } from '@/store/slices/SchemeSlice'

const formSchema = z.object({
  schoolName: z.string().min(2).max(50),
  schoolLevel: z.string(),
  subject: z.string(),
  term: z.string(),
  year: z.string(),
  class: z.string(),
})

type Props = {}

const SchoolDetailsForm = (props: Props) => {
  const formData = useAppSelector((state: any) => state.schemes.formData)
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector((state: any) => state.schemes.currentStep)

  // Initialize react-hook-form with values from global state.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...formData },
  })

  // Use `watch` to get the current values from the form.
  const selectedLevel = form.watch("schoolLevel")
  const selectedClass = form.watch("class")

  // Determine available options based on the selected values.
  const schoolLevelItems = selectedLevel === 'primary' ? primaryClasses : secondaryClasses
  const subjects = selectedLevel === 'secondary' ? secondarySubjects : primarySubjects(selectedClass)

  // Submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(updateFormData(values))
    dispatch(setCurrentStep(currentStep + 1))
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input placeholder="Kenya High School" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schoolLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a school level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row w-full gap-2">
            <div className="w-full">
              {selectedLevel && (
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{selectedLevel === "primary" ? "Grade" : "Form"}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={selectedLevel === "primary" ? 'Select primary level' : 'Select secondary level'} />
                          </SelectTrigger>
                          <SelectContent>
                            {schoolLevelItems.map((item) => (
                              <SelectItem key={item.name} value={item.serverName}>
                                {item.name}
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
            </div>
            <div className="w-full">
              {selectedClass && (
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.name} value={subject.serverName}>
                                {subject.name}
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
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-2">
            <div className="w-full">
              {selectedLevel && (
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Term</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="term1">Term 1</SelectItem>
                            <SelectItem value="term2">Term 2</SelectItem>
                            <SelectItem value="term3">Term 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <NavButtons />
        </form>
      </Form>
    </div>
  )
}

export default SchoolDetailsForm
