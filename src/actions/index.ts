import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { checkRateLimit } from "@/lib/upstashLimit";
import { sendEmail } from "@/services/sendEmail";

export const server = {
  sendContactInfo: defineAction({
    accept: "form",
    input: z.object({
      email: z.email("el email no es válido"),
      query: z
        .string({ error: "la consulta no puede estar vacía" })
        .min(1, { error: "la consulta no puede estar vacía" }),
    }),
    handler: async (formData, context) => {
      const { email } = formData;
      const identifier = context?.clientAddress || email;
      await checkRateLimit(identifier);
      await sendEmail(formData);

      return {
        success: true,
        error: null,
      };
    },
  }),
};
