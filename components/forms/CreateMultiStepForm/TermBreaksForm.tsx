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
import NavButtons from './FormNavButtons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setCurrentStep, updateFormData } from '@/store/slices/SchemeSlice'
import { Minus, Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const formData = useAppSelector((state: any) => state.schemes.formData)
  const currentStep = useAppSelector((state) => state.schemes.currentStep)
  const dispatch = useAppDispatch()
  const form:any = useForm<BreakFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formData,
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
    dispatch(updateFormData(values))
    dispatch(setCurrentStep(currentStep + 1));
    console.log(values)
  }

  // Generate options for lessons based on the global lessonsPerWeek.
  // If lessonsPerWeek is not available, default to 4.
  const lessonOptions = () => {
    const lessonsPerWeek = form.watch("lessonsPerWeek") || 4;
    const options = []
    for (let i = 1; i <= lessonsPerWeek; i++) {
      options.push(
        <SelectItem key={i} value={String(i)}>
          {`Lesson ${i}`}
        </SelectItem>
      )
    }
    return options
  }
  const weekOptions = () => {
    const startWeek: number = form.watch("startWeek") || 1;
    const endWeek: number = form.watch("endWeek") || 10;
    const options = [];
  
    for (let i = startWeek; i <= endWeek; i++) {
      options.push(
        <SelectItem key={i} value={String(i)}>
          {`Week ${i}`}
        </SelectItem>
      );
    }
  
    return options;
  };
  

  // // Generate options for weeks. Here we use a fixed range (1–10).
  // const weekOptions = (maxWeeks: number = 10) => {
  //   const options = []
  //   for (let i = 1; i <= maxWeeks; i++) {
  //     options.push(
  //       <SelectItem key={i} value={String(i)}>
  //         {`Week ${i}`}
  //       </SelectItem>
  //     )
  //   }
  //   return options
  // }

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
                radius="sm"
                className="text-gray-800 dark:text-gray-100"
                onClick={() =>
                  append({
                    startWeek: 1,
                    startLesson: 1,
                    endWeek: 1,
                    endLesson: 1,
                    title: "",
                  })
                }
                startContent={<Plus />}
              >
                Add Break
              </Button>
            </div>

            {fields.map((fieldItem, index) => (
              <div key={fieldItem.id} className="border p-4 rounded mb-4 mt-2 space-y-2">
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
                <h1 className="text-[16px] font-bold text-gray-800 dark:text-gray-100">Break start</h1>

                {/* Start Week and Start Lesson as select components */}
                <div className="flex mt-2 flex-col md:flex-row md:gap-2">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`breaks.${index}.startWeek`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Week</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              defaultValue={String(field.value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select week" />
                              </SelectTrigger>
                              <SelectContent>
                                {weekOptions()}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`breaks.${index}.startLesson`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Lesson</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              defaultValue={String(field.value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select lesson" />
                              </SelectTrigger>
                              <SelectContent>
                                {lessonOptions()}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <h1 className="text-[16px] font-bold text-gray-800 dark:text-gray-100">Break end</h1>
                {/* End Week and End Lesson as select components */}
                <div className="flex mt-2 flex-col md:flex-row md:gap-2">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`breaks.${index}.endWeek`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Week</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              defaultValue={String(field.value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select week" />
                              </SelectTrigger>
                              <SelectContent>
                                {weekOptions()}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    
                    <FormField
                      control={form.control}
                      name={`breaks.${index}.endLesson`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Lesson</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              defaultValue={String(field.value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select lesson" />
                              </SelectTrigger>
                              <SelectContent>
                                {lessonOptions()}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-4"
                  radius="sm"
                  startContent={<Minus />}
                >
                  Remove Break
                </Button>
              </div>
            ))}
          </div>
        )}
        <NavButtons />
      </form>
    </Form>
  )
}

export default AddBreaksForm;
