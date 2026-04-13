import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  // Implementation for handling POST request

  const body = await request.json();
  const { email, query } = body;
  try {
    const data = await resend.emails.send({
      from: "Nagare Web <nagare@nagarestudio.site>",
      to: email,
      subject: "Consulta recibida",
      html: `<h1>Hemos recibido tu consulta!</h1>
             <p><strong>Hola ${email}!</strong>, Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
             <p><strong>Tu consulta:</strong> ${query}</p>
             <p>Saludos,<br/>El equipo de Nagare Web</p>`,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to send email" }), {
      status: 500,
    });
  }
};
