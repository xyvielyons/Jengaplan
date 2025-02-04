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
  amount,
  phoneNumber,
  name,
  email
}:{
  amount:string,
  phoneNumber:string,
  name:string,
  email:string
  
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
      "amount":amount,
      "description": "Jengascheme - Securely top up your wallet and enjoy seamless transactions",
      "callback_url": `http://127.0.0.1:3000/orderconfirmation/${session?.user.id}`,
      "redirect_mode": "",
      "cancellation_url":"http://127.0.0.1:3000/ordercancelled",
      "notification_id": "7a232b0b-8b52-4bde-94c4-dc330e92ee9d",
      "branch": "Jenga Scheme",
      "billing_address": {
          "email_address": email,
          "phone_number": phoneNumber,
          "country_code": "KE",
          "first_name": name,
          "middle_name": "",
          "last_name": "",
          "line_1": "Jenga scheme",
          "line_2": "",
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
