import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  
    const { name, email, message } = await req.json();
    console.log(name)
    console.log(email)
    console.log(message)
    try {
        const data = await resend.emails.send({
            from: "Mustafa Tawab <onboarding@resend.dev>", // ✅ test mode
            to: ["tawab05@gmail.com"], // Must match the email linked to your Resend account
            subject: `New message from ${name}`,
            html: `
                    <div>
                         <h1>  ${name}!</h1>
                        <a href='mailto:${email}'>${email}</a>
                        <div class='text-lg font-semibold'>
                            ${message}
                        </div>
                    </div>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error });
    }
}
