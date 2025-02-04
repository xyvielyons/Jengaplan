"use server"

import { auth } from '@/auth';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { headers as head } from 'next/headers';
import prisma from '@/lib/prisma';
export const authorization = async()=>{
  try {
  const apiUrl = 'https://pay.pesapal.com/v3/api/Auth/RequestToken'

  const headers = {
    'Accept':'application/json',
    'Content-Type':'application/json'
  }
  const resp = await axios.post(apiUrl,{
    consumer_key:process.env.PESAPAL_CONSUMER_KEY,
    consumer_secret:process.env.PESAPAL_CONSUMER_SECRET
  },{headers})
  return resp.data.token
  } catch (error) {
      console.log('An error has occured (PAUTH)',error)
  }
}

export const RegisterPesapalIPN = async()=>{
  try {
    const pesapalToken = await authorization()
    const IpnUrl = 'https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN'
    const headers = {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization':`${pesapalToken}`
    }
    const requestObject = {
      url:`${process.env.SERVER_URL}/api/pesapaltransaction`,
      ipn_notification_type:"POST"
    }
    const response = await axios.post(IpnUrl,requestObject,{headers})

    return response.data
  } catch (error) {
      return console.log('An error has occured (IPN)',error)
  }
}

export const InitiatePayment = async({
  price,
  phoneNumber,
  name,
}:{
  price:string,
  phoneNumber:string,
  name:string,
  
})=>{
  try {
    const uid = uuidv4();
    const session = await auth.api.getSession({
      headers:await head()
    })
    const pesapaltoken = await authorization()
    const submitOrderRequestUrl = 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest'
    const headers = {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization':`${pesapaltoken}`
    }
    const requestPaymentObject ={

      "id": uid,
      "currency": "KES",
      "amount":price,
      "description": "your testing the api you built",
      "callback_url": `http://127.0.0.1:3000/orderconfirmation/${session?.user.id}`,
      "redirect_mode": "",
      "cancellation_url":"http://127.0.0.1:3000/ordercancelled",
      "notification_id": "7a232b0b-8b52-4bde-94c4-dc330e92ee9d",
      "branch": "Water vending ATM",
      "billing_address": {
          "email_address": "myvending@gmail.com",
          "phone_number": phoneNumber,
          "country_code": "KE",
          "first_name": name,
          "middle_name": "",
          "last_name": "",
          "line_1": "Water Vending ATM",
          "line_2": "req.body.order",
          "city": "",
          "state": "",
          "postal_code": "",
          "zip_code": ""
      }
    }
    const response = await axios.post(submitOrderRequestUrl,requestPaymentObject,{headers})  
    return response.data
  } catch (error) {
    return console.log('An error has occured (IP)',error)
  }
}

export const createTransaction = async () => {
  try {
    const transactionData = {
      bankId: "cm6ptmqsj00059kk8fi2v922p",
      Amount: 20, // ✅ Now correctly typed as an Int
      OrderTrackingId: "1234567890",
      OrderMerchantReference: "1234567890",
    };

    console.log("Creating transaction:", transactionData);

    const res = await prisma.transactions.create({ data: transactionData });

    console.log("Transaction created successfully:", res);
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
}
