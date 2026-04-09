import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  // Implementation for handling POST request

  const body = await request.json();
  const { email, query } = body;
  try {
    const data = await resend.emails.send({
      from: "Nagare Web <nagare@nagarestudio.site>",
      to: "nagarestudiojs@gmail.com",
      subject: "Consulta desde el formulario de contacto",
      html: `<h1>Nuevo mensaje de contacto</h1>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensaje:</strong> ${query}</p>`,
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
