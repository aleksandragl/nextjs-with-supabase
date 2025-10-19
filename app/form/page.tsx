import FormClient from "./FormClient";
import { revalidatePath } from "next/cache";

export default function FormPage() {
  // Server Action
  async function handleSubmit(formData: FormData): Promise<void> {
    "use server";

    const data = Object.fromEntries(formData);
    console.log("Form submitted:", data);

    // import { createAdminClient } from '@/lib/supabase/server'
    // const supabase = createAdminClient()
    // await supabase.from('contacts').insert(data)

    revalidatePath("/form");
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-4">
      <h1 className="text-2xl font-bold mb-6">Kontaktivorm </h1>
      <FormClient action={handleSubmit} />
    </div>
  );
}
