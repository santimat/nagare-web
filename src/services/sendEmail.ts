import { ActionError } from "astro:actions";
import { Resend } from "resend";

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async ({ email, query }: { email: string; query: string }) => {
  const { error } = await resend.batch.send([
    {
      from: "Nagare@nagarestudio.site",
      to: "nagarestudiojs@gmail.com",
      subject: "New Contact Query",
      html: `
      <p>You have received a new contact query from ${email}:</p>
      <p>${query}</p>
    `,
    },
    {
      from: "Nagare@nagarestudio.site",
      to: email,
      subject: "Thank you for contacting us!",
      html: `
      <p>Dear ${email},</p>
      <p>Thank you for reaching out to us! We have received your query and will get back to you shortly.</p>
      <p>Best regards,<br/>The Nagare Team</p>
    `,
    },
  ]);

  if (error) {
    console.log(error);
    throw new ActionError({
      code: error.statusCode || "EMAIL_ERROR",
      message: "There was an error sending your message. Please try again later.",
    });
  }
};
