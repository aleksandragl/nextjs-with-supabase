import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, description, completed");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createAdminClient();
  const { title, description } = await request.json();

  if (!title)
    return NextResponse.json({ error: "Title required" }, { status: 400 });

  const { data, error } = await supabase
    .from("tasks")
    .insert({ title, description, completed: false })
    .select("id, title, description, completed")
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const supabase = createAdminClient();
  const { id, title, description, completed } = await request.json();

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const { data, error } = await supabase
    .from("tasks")
    .update({ title, description, completed })
    .eq("id", id)
    .select("id, title, description, completed")
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const supabase = createAdminClient();
  const { id } = await request.json();

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
