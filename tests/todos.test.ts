import { describe, it, expect, vi, beforeEach } from "vitest";
import * as todos from "@/utils/todos";

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

describe("Todos Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchTodos: returns todos successfully", async () => {
    const mockData = [{ id: 1, title: "Test Todo" }];
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const result = await todos.fetchTodos();
    expect(result).toEqual(mockData);
  });

  it("addTodo: adds new todo successfully", async () => {
    const mockData = { id: 1, title: "New Todo" };
    const mockSingleFn = vi
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    mockInsert.mockReturnValue({ select: () => ({ single: mockSingleFn }) });

    const result = await todos.addTodo("New Todo");
    expect(result).toEqual(mockData);
  });

  it("addTodo: throws error if no title", async () => {
    await expect(todos.addTodo("")).rejects.toThrow("Title required");
  });

  it("deleteTodo: deletes todo successfully", async () => {
    const mockEqFn = vi.fn().mockResolvedValue({ error: null });
    mockDelete.mockReturnValue({ eq: mockEqFn });

    await expect(todos.deleteTodo(1)).resolves.not.toThrow();
    expect(mockDelete).toHaveBeenCalled();
    expect(mockEqFn).toHaveBeenCalledWith("id", 1);
  });

  it("updateTodo: updates todo successfully", async () => {
    const mockData = { id: 1, title: "Updated Todo" };
    const mockSingleFn = vi
      .fn()
      .mockResolvedValue({ data: mockData, error: null });
    mockEq.mockReturnValue({ select: () => ({ single: mockSingleFn }) });
    mockUpdate.mockReturnValue({ eq: mockEq });

    const result = await todos.updateTodo(1, "Updated Todo");
    expect(result).toEqual(mockData);
  });

  it("updateTodo: throws error if no title", async () => {
    await expect(todos.updateTodo(1, "")).rejects.toThrow("Title required");
  });
});
