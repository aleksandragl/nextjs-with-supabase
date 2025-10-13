import { createAdminClient } from "@/lib/supabase/server";
import TodoClient from "./TodoClient";

export default async function Page() {
  const supabase = createAdminClient();
  const { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    console.error("Error fetching todos:", error.message);
  }

  return (
    <div className="p-8 space-y-8">
      {/* Server-side Read */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Server-side TODOs</h1>
        <pre className="bg-gray-100 text-black p-4 rounded">
          {JSON.stringify(todos, null, 2)}
        </pre>
      </div>

      {/* Client-side CRUD */}
      <div>
        <TodoClient />
      </div>
    </div>
  );
}
