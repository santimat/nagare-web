import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { checkRateLimit } from "@/lib/upstashLimit";
import { sendEmail } from "@/services/sendEmail";

export const server = {
  sendContactInfo: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("El email no es válido"),
      query: z
        .string({ error: "La consulta no puede estar vacía" })
        .min(1, { error: "La consulta no puede estar vacía" }),
    }),
    handler: async (formData, context) => {
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
