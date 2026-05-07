import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmailTemplate } from "@/lib/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { first_name, last_name, budget, project_type, email, message, other } =
    await req.json();

  try {
    const data = await resend.emails.send({
      from: "Mustafa Tawab <onboarding@resend.dev>", // ✅ test mode
      to: ["mustafa.tawab.dev@gmail.com"], // Must match the email linked to your Resend account
      subject: `New message from ${first_name} ${last_name && last_name}`,
      html: contactEmailTemplate({
        first_name,
        last_name,
        email,
        project_type:
          project_type === "Other" ? other || "Other" : project_type,
        budget,
        message,
      }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
