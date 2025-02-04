import { authorization } from "@/actions/pesapalpayments";
import axios from "axios";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
export async function POST(req:NextRequest) {
  try {
    const body = await req.json(); // Get JSON data from request

    if (!body || !body.OrderTrackingId || ! body.OrderMerchantReference) {
      return NextResponse.json({ message: "Invalid payload received" }, { status: 400 });
    }

    const orderTrackingId = body.OrderTrackingId;
    const pesapaltoken = await authorization();
    const IPNURL = ` https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`
    const headers = {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization':`${pesapaltoken}`
    }
    const response = await axios.get(IPNURL,{headers})

    if(!response){
      return NextResponse.json({ message: "No response received" }, { status: 400 });
    }

    function extractDynamicSegment(urlString:string) {
      const regex = /\/orderconfirmation\/([^?]+)/i;
      const match = urlString.match(regex);
      return match ? match[1] : null;
    }

    const statusCodeOfPayment = response.data.status_code;
    const paidAmount = response.data.amount
    const userId:any = extractDynamicSegment(response.data.call_back_url)?.toString()


    const existingBankRecord = await prisma.bank.findUnique({
      where:{userId:userId},
      select:{
        amount:true,
        id:true
      }
    })
    
    const previousAmount = existingBankRecord?.amount || 0;
    
    
    if (!userId) {
      return NextResponse.json({ message: "Credentials not found" }, { status: 400 });
    }
    
    if(statusCodeOfPayment === 1){
        const bank = await prisma.bank.upsert({
          where:{
            userId
          },
          update:{
            amount: previousAmount + paidAmount
          },
          create:{
            userId,
            amount:paidAmount
          }
        })

        if(bank){
          await prisma.transactions.create({
            data:{
              bankId:bank.id,
              Amount:paidAmount,
              OrderTrackingId:body.OrderTrackingId.toString(),
              OrderMerchantReference:body.OrderMerchantReference.toString()
            }
        })
        }
    }
    revalidatePath('/wallet')

    return NextResponse.json({ message: "Success"}, { status: 200 });

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "An Error has occured", error}, 
      { status: 200 }
    );
  }
}


// Handle CORS preflight requests
export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": `${process.env.SERVER_URL}`, // Your frontend's origin
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
    },
  });
}
