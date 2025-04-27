// import { NextResponse, NextRequest } from "next/server";
// import {Resend} from "resend"
// import EmailTemplate from "@/components/EmailTemplate/EmailTemplate";

// const resend = new Resend(process.env.RESEND_API_KEY);


// export async function POST(request:NextRequest) {
   
//     try {
//         const data = await resend.emails.send({
//           from: 'Your Website <onboarding@resend.dev>',
//           to: ['example@gmail.com'], // Replace with your admin email
//           subject: `New message from ${name}`,
//           react: EmailTemplate({ name, email, message }),
//         });
    
//         NextResponse.json(data , {status : 200});
//       } catch (error) {
//         res.status(500).json({ error });
//       }
// }