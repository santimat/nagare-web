import { Resend } from "resend";
export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API);

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, message } = await body;

    const { data, error } = await resend.emails.send({
      from: "Nagare <nagare@nagarestudio.site>",
      to: email,
      subject: "New Message from Nagare Studio",
      html: `<p>${message}</p>`,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
