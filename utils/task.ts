import { createClient } from "@/lib/supabase/client";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

const supabase = createClient();

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase.from("tasks").select();
  if (error) throw error;
  return data || [];
}

export async function addTask(
  title: string,
  description?: string
): Promise<Task> {
  if (!title) throw new Error("Title required");

  const { data, error } = await supabase
    .from("tasks")
    .insert({ title, description, completed: false })
    .select()
    .single();

  if (error) throw error;
  return data!;
}

export async function deleteTask(id: number): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}

export async function updateTask(
  id: number,
  title: string,
  description?: string
): Promise<Task> {
  if (!title) throw new Error("Title required");

  const { data, error } = await supabase
    .from("tasks")
    .update({ title, description })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data!;
}
