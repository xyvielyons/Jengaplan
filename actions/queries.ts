'use server'
import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { headers } from "next/headers"
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