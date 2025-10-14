import { describe, it, expect, vi, beforeEach } from "vitest";
import * as notes from "@/utils/notes";
//import { createClient } from "@/lib/supabase/client";

const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();
const mockEq = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
    })),
  })),
}));

describe("Notes Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchNotes: returns notes successfully", async () => {
    const mockData = [{ id: 1, title: "Test Note" }];
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const result = await notes.fetchNotes();
    expect(result).toEqual(mockData);
  });

  it("addNote: adds new note successfully", async () => {
    const mockData = { id: 1, title: "New Note" };
    const mockSingleFn = vi
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    mockInsert.mockReturnValue({ select: () => ({ single: mockSingleFn }) });

    const result = await notes.addNote("New Note");
    expect(result).toEqual(mockData);
  });

  it("addNote: throws error if no title", async () => {
    await expect(notes.addNote("")).rejects.toThrow("Title required");
  });

  it("deleteNote: deletes note successfully", async () => {
    const mockEqFn = vi.fn().mockResolvedValue({ data: null, error: null });
    mockDelete.mockReturnValue({ eq: mockEqFn });

    await expect(notes.deleteNote(1)).resolves.not.toThrow();

    expect(mockDelete).toHaveBeenCalled();
    expect(mockEqFn).toHaveBeenCalledWith("id", 1);
  });

  it("updateNote: updates note successfully", async () => {
    const mockData = { id: 1, title: "Updated Note" };
    const mockSingleFn = vi
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    mockEq.mockReturnValue({ select: () => ({ single: mockSingleFn }) });
    mockUpdate.mockReturnValue({ eq: mockEq });

    const result = await notes.updateNote(1, "Updated Note");
    expect(result).toEqual(mockData);
  });

  it("updateNote: throws error if no title", async () => {
    await expect(notes.updateNote(1, "")).rejects.toThrow("Title required");
  });
});
