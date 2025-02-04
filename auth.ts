import { betterAuth,BetterAuthOptions } from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma'
import prisma from "./lib/prisma";
//this links to our email provider like mailersend sendgrid and others
import { sendEmail } from "./actions/sendemail";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database:prismaAdapter(prisma,{ 
        provider:"mongodb"
    }),
    plugins:[nextCookies()],
    user:{
        additionalFields:{
            role:{
                type:"string"
            }
        },
        deleteUser:{
            enabled:true
        },
        changeEmail:{
            enabled:true,
            sendChangeEmailVerification:async ({ user, newEmail, url, token }, request) => {
                await sendEmail({
                    to: newEmail,
                    subject: 'JengaScheme: Verify your email change',
                    text: `Click the link to verify: ${url}`
                })
            }
        }
    },
    //we add the email and password method
    //we enable it by setting enables to true
    emailAndPassword: { 
        enabled: true, 
        //we can enable email verification by setting this to true
        requireEmailVerification:true,
        sendResetPassword: async ({user, url, token}, request) => {
            await sendEmail({
                to: user.email,
                subject: "JengaScheme : Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        }
    }, 
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }
    },
    emailVerification:{
			   //email verification to be sent on signup
        sendOnSignUp:true,
        //when the user is verified access is granted outomatically
        autoSignInAfterVerification:true,
        //this gives you access to all the endpoints betterauth provides
        sendVerificationEmail:async({user,token})=>{
        //this is the verification url that will be sent upon sign up
        //it will contain the token
        //it will contain the callback url if the email is verified
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
            await sendEmail({
                to:user.email,
                subject:"JengaScheme - Verify your email address",
                text:`Click the link to verify your email:${verificationUrl}`
            })

        }
    }
}satisfies BetterAuthOptions)
export type Session = typeof auth.$Infer.Session;