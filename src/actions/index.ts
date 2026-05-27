import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

export const server = {
  sendContactInfo: defineAction({
    accept: "json",
    input: z.object({
      email: z.string().email(),
      query: z.string().min(1),
    }),
    handler: async ({ email, query }) => {
      const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

      const resend = new Resend(RESEND_API_KEY);
      const { error } = await resend.batch.send([
        {
          from: "n@nagarestudio.site",
          to: "nagarestudiojs@gmail.com",
          subject: "New Contact Query",
          html: `
          <p>You have received a new contact query from ${email}:</p>
          <p>${query}</p>
        `,
        },
        {
          from: "n@nagarestudio.site",
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
        return { errpr: error.message };
      }

      return {
        success: true,
      };
    },
  }),
};
