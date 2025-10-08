import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const {
    first_name,
    last_name,
    company,
    budget,
    project_type,
    email,
    message,
    other
  } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "Mustafa Tawab <onboarding@resend.dev>", // ✅ test mode
      to: ["tawab05@gmail.com"], // Must match the email linked to your Resend account
      subject: `New message from ${first_name} ${last_name && last_name}`,
      html: `
            <div className='text-blue-700 border-2 border-blue-600 p-20 w-full bg-blue-200'>
                
                <div>
                        Name :  ${first_name} ${last_name && last_name}
                </div>

                <div>
                Email : <a href='mailto:${email}'>${email}</a>
                </div>

                <div>
                    Company : ${company}
                </div>

                <div>
                    Project Type : ${project_type == "Other" ? `${other}` : project_type}
                    
                </div>



                <div>
                    Budget  : ${budget}
                </div>
                
                

                <div class='text-lg font-semibold'>
                    Message : ${message}
                </div>
            </div>
            `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
