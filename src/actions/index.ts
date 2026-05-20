import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const server = {
  sendContactInfo: defineAction({
    accept: "json",
    input: z.object({
      email: z.string().email(),
      query: z.string().min(1),
    }),
    handler: async ({ email, query }) => {
      console.log(`Received contact form submission from ${email}: ${query}`);

      return {
        success: true,
        query: "Thank you for contacting us! We will get back to you shortly.",
      };
    },
  }),
};
