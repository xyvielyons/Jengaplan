'use client'
import React from 'react'
import { z } from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Checkbox } from "@/components/ui/checkbox"

// Define the Break schema
const breakSchema = z.object({
  startWeek: z.coerce.number().min(1, "Start week must be at least 1"),
  startLesson: z.coerce.number().min(1, "Start lesson must be at least 1"),
  endWeek: z.coerce.number().min(1, "End week must be at least 1"),
  endLesson: z.coerce.number().min(1, "End lesson must be at least 1"),
  title: z.string().min(1, "Title is required"),
})

// Define the form schema for breaks
const formSchema = z.object({
  // Whether to show breaks or not
  addBreaks: z.boolean().default(false),
  // An array of break objects
  breaks: z.array(breakSchema).default([]),
})

// Type for our form values
type BreakFormValues = z.infer<typeof formSchema>

const AddBreaksForm = () => {
  const form = useForm<BreakFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addBreaks: false,
      breaks: [],
    },
  })

  // useFieldArray manages the dynamic breaks array.
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "breaks",
  })

  // When the checkbox is toggled off, reset the breaks array.
  const handleCheckboxChange = (checked: boolean) => {
    form.setValue("addBreaks", checked)
    if (!checked) {
      form.setValue("breaks", [])
    }
  }

  const onSubmit = (values: BreakFormValues) => {
    console.log("Form submitted with values:", values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Checkbox to enable breaks */}
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="addBreaks"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={handleCheckboxChange}
                  />
                </FormControl>
                <FormLabel htmlFor="addBreaks">Add Breaks</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* When addBreaks is checked, display the field array */}
        {form.watch("addBreaks") && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Breaks</h2>
              <Button
                type="button"
                onClick={() =>
                  append({
                    startWeek: 1,
                    startLesson: 1,
                    endWeek: 1,
                    endLesson: 1,
                    title: "",
                  })
                }
              >
                +
              </Button>
            </div>

            {fields.map((fieldItem, index) => (
              <div key={fieldItem.id} className="border p-4 rounded mb-2">
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name={`breaks.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Break Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Break title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Start Week & Lesson */}
                <div className="flex space-x-2">
                  <FormField
                    control={form.control}
                    name={`breaks.${index}.startWeek`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Week</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`breaks.${index}.startLesson`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Lesson</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* End Week & Lesson */}
                <div className="flex space-x-2">
                  <FormField
                    control={form.control}
                    name={`breaks.${index}.endWeek`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Week</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`breaks.${index}.endLesson`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Lesson</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="button" onClick={() => remove(index)}>
                  Remove Break
                </Button>
              </div>
            ))}
          </div>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AddBreaksForm;
