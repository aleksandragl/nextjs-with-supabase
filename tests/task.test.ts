import { describe, it, expect, vi, beforeEach } from "vitest";
import * as tasks from "@/utils/task";

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

describe("Tasks Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchTasks: returns tasks successfully", async () => {
    const mockData = [{ id: 1, title: "Test Task", completed: false }];
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const result = await tasks.fetchTasks();
    expect(result).toEqual(mockData);
  });

  it("addTask: adds new task successfully", async () => {
    const mockData = { id: 1, title: "New Task", completed: false };
    const mockSingleFn = vi
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    mockInsert.mockReturnValue({ select: () => ({ single: mockSingleFn }) });

    const result = await tasks.addTask("New Task");
    expect(result).toEqual(mockData);
  });

  it("addTask: throws error if no title", async () => {
    await expect(tasks.addTask("")).rejects.toThrow("Title required");
  });

  it("deleteTask: deletes task successfully", async () => {
    const mockEqFn = vi.fn().mockResolvedValue({ error: null });
    mockDelete.mockReturnValue({ eq: mockEqFn });

    await expect(tasks.deleteTask(1)).resolves.not.toThrow();
    expect(mockDelete).toHaveBeenCalled();
    expect(mockEqFn).toHaveBeenCalledWith("id", 1);
  });

  it("updateTask: updates task successfully", async () => {
    const mockData = { id: 1, title: "Updated Task", completed: false };
    const mockSingleFn = vi
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    mockEq.mockReturnValue({ select: () => ({ single: mockSingleFn }) });
    mockUpdate.mockReturnValue({ eq: mockEq });

    const result = await tasks.updateTask(1, "Updated Task");
    expect(result).toEqual(mockData);
  });

  it("updateTask: throws error if no title", async () => {
    await expect(tasks.updateTask(1, "")).rejects.toThrow("Title required");
  });
});
