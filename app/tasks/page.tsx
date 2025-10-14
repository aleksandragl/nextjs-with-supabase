import { createAdminClient } from "@/lib/supabase/server";
import TasksClient from "./TasksClient";

export default async function Page() {
  const supabase = createAdminClient();
  const { data: tasks, error } = await supabase.from("tasks").select();

  if (error) {
    console.error("Error fetching tasks:", error.message);
  }

  return (
    <div className="p-8 space-y-8">
      {/* Server-side Read */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Server-side Tasks</h1>
        <pre className="bg-gray-100 text-black p-4 rounded">
          {JSON.stringify(tasks, null, 2)}
        </pre>
      </div>

      {/* Client-side CRUD */}
      <div>
        <TasksClient />
      </div>
    </div>
  );
}
