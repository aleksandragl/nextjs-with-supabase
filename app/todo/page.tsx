import { createClient } from "@/lib/supabase/server";
import TodoClient from "./TodoClient";

export default async function Page() {
  const supabase = await createClient();
  const { data: todos } = await supabase.from("todos").select();

  return (
    <div className="p-8 space-y-8">
      {/* Serveri Read */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Server-side TODOs</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(todos, null, 2)}
        </pre>
      </div>

      {/* Kliendi Read + Create + Delete */}
      <div>
        <TodoClient />
      </div>
    </div>
  );
}
