import { createAdminClient } from "@/lib/supabase/server";
import NotesClient from "./NotesClient";

export default async function Page() {
  const supabase = createAdminClient();
  const { data: notes, error } = await supabase.from("notes").select();

  if (error) {
    console.error("Error fetching notes:", error.message);
  }

  return (
    <div className="p-8 space-y-8">
      {/* Server-side Read */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Server-side Notes</h1>
        <pre className="bg-gray-100 text-black p-4 rounded">
          {JSON.stringify(notes, null, 2)}
        </pre>
      </div>

      {/* Client-side CRUD */}
      <div>
        <NotesClient />
      </div>
    </div>
  );
}
