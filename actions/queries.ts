'use server'
import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { GeneratedPdfTypes } from "@/lib/types"
import { add } from "date-fns"
export const BankInformation = async()=>{
    try {
        const session = await auth.api.getSession({
            headers:await headers()
        })
        const getBankInformation = await prisma.bank.findUnique({
            where:{
                userId:session?.user.id
            },
            include:{
                transactions:true
            }
        })
        return getBankInformation
    } catch (error) {
        console.log(error)
    }
}

export const DeductFromBank = async(BankId:string,amount:number)=>{
    try {
        const Deduction = await prisma.bank.update({
            where:{
                id:BankId
            },
            data:{
                amount
            }
        })
        return Deduction
    } catch (error) {
        console.log(error)
    }
}


export const SaveGeneratedPdfData = async({
    userId,
    schoolName,
    schoolLevel,
    subject,
    term,
    year,
    selectedTopics,
    lessonsPerWeek,
    startWeek,
    startLesson,
    endWeek,
    endLesson,
    addBreaks,
    breaks,
    doubleLesson,
    className
}: GeneratedPdfTypes) => {
    try {
        if (!userId) {
            throw new Error("userId is required");
        }

        const savePdf = await prisma.generatedPdfScheme.create({
            data: {
                userId,
                schoolName,
                schoolLevel,
                subject,
                term,
                year,
                selectedTopics,
                lessonsPerWeek,
                startWeek,
                startLesson,
                endWeek,
                endLesson,
                addBreaks,
                breaks:{
                    create: breaks?.map((breakItem) => ({
                        startWeek: breakItem.startWeek,
                        startLesson: breakItem.startLesson,
                        endWeek: breakItem.endWeek,
                        endLesson: breakItem.endLesson,
                        title: breakItem.title
                    })) || []
                },
                doubleLesson,
                class:className
            }
        });

        return savePdf;
    } catch (error) {
        console.error("Error saving PDF data:", error);
        throw new Error("Failed to save PDF data");
    }
};

export const getGeneratedPdfData = async({userId}:{userId:any})=>{
    try {
        const getGeneratedPdfs = await prisma.generatedPdfScheme.findMany({
            where:{
                userId:userId,
                
            },
            include:{
                breaks:true
            },
            orderBy:{
                createdAt:'asc'
            }
        })
        return getGeneratedPdfs
    } catch (error) {
        console.error("Error getting PDF data:", error);
        throw new Error("Failed to get pdf data");
    }
}