import { Prisma } from "@prisma/client";
import { BankInformation, SaveGeneratedPdfData } from "@/actions/queries";

export type getBankInformationTypes = Prisma.PromiseReturnType<typeof BankInformation>
//export type saveGeneratedPdfTypes = Prisma.PromiseReturnType<typeof SaveGeneratedPdfData>

export interface SelectTypes {
    name:string;
    serverName:string;
}
interface Break {
    startWeek: number
    startLesson: number
    endWeek: number
    endLesson: number
    title: string
  }
export interface GeneratedPdfTypes{
    userId?:string
    schoolName?:string
    schoolLevel?:string
    subject?:string
    term?:string
    year?:string
    selectedTopics?:string[]
    lessonsPerWeek?:number
    startWeek?:number
    startLesson?:number
    endWeek?:number
    endLesson?:number
    addBreaks?:boolean
    breaks?:Break[]
    doubleLesson?:number[]
    className?:string
}