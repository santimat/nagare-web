import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

// @upstash/ratelimit is commonJS only, so we need to import it this way
import pkgRateLimit from "@upstash/ratelimit";
const { Ratelimit } = pkgRateLimit;

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

const redisClient = new Redis({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(5, "30 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export const server = {
  sendContactInfo: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("El email no es válido"),
      query: z
        .string({ error: "La consulta no puede estar vacía" })
        .min(1, { error: "La consulta no puede estar vacía" }),
    }),
    handler: async ({ email, query }, context) => {
      const ip = context?.clientAddress;
      const identifier = ip || email;

      const { success, reset } = await ratelimit.limit(identifier);

      if (!success) {
        throw new ActionError({
          code: "TOO_MANY_REQUESTS",
          message: "You have exceeded the maximum number of requests. Please try again later.",
        });
      }

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
        console.log(error);
        throw new ActionError({
          code: error.statusCode || "EMAIL_ERROR",
          message: "There was an error sending your message. Please try again later.",
        });
      }

      return {
        success: true,
        error: null,
      };
    },
  }),
};
