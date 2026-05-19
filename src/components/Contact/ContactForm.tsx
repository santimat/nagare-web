import { actions } from "astro:actions";
import { actions } from "astro:actions";

export function ContactForm() {
  const handleSubmit = (event: Event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const [email, message] = formData.values();
    console.log({ email, message });
  };

  return (
    <form id="contact-form" class="mx-auto flex flex-col gap-10">
      <div class="flex flex-col">
        <label class="ml-1 text-lg font-semibold">Email</label>
        <input
          type="email"
          required
          name="email"
          placeholder="tuemail@ejemplo.com"
          autocomplete="email"
          class="bg-lighter w-full rounded-xl px-2 py-1 text-white placeholder:text-white/50"
        />
      </div>
      <div class="flex flex-col">
        <label class="ml-1 text-lg font-semibold">Consulta</label>
        <textarea
          name="query"
          placeholder="Dejanos tu consulta aqui..."
          rows="10"
          class="bg-lighter w-full resize-none overflow-y-auto rounded-xl px-2 py-1 text-white placeholder:text-white/50"
        ></textarea>
      </div>
    </form>
  );
}
