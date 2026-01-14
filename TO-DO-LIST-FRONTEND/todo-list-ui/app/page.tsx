"use client";

import { useEffect, useState } from "react";
import { todoApi } from "@/lib/todoApi";
import { TodoResponse } from "@/types/todo";
import TodoItem from "@/components/TodoItem";

export default function TodoApp() {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      console.error("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {

      const saved = await todoApi.create({ text: newTask });
      setTodos([...todos, saved]);
      setNewTask("");
    } catch (err) {

      alert("Could not save task. Check if backend is running and matches DTO.");
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const updated = await todoApi.toggle(id);
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const completionRate = todos.length > 0
    ? (todos.filter(t => t.completed).length / todos.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-4">
      <div className="max-w-xl mx-auto">


        <header className="mb-12 text-center">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
            Tasks<span className="text-indigo-600">.</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full bg-slate-200 h-1.5 rounded-full max-w-[200px] overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-700 ease-out"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {Math.round(completionRate)}% Completed
            </p>
          </div>
        </header>

        {/* Action Input */}
        <form onSubmit={handleAdd} className="relative mb-10 group">
          <input
            type="text"
            className="w-full bg-white border-2 border-slate-100 rounded-[2rem] p-6 pr-32 text-lg font-medium shadow-xl shadow-slate-200/50 outline-none focus:border-indigo-500 transition-all"
            placeholder="Next on the list..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-3 bottom-3 px-8 bg-indigo-600 text-white rounded-[1.5rem] font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            Add
          </button>
        </form>

        {/* List Rendering */}
        <div className="min-h-[300px]">
          {loading ? (
            <div className="flex justify-center py-10 animate-pulse text-slate-300 uppercase tracking-widest font-bold text-xs">
              Synchronizing with server...
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {todos.length === 0 && (
                <div className="text-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium italic">Your list is clear. Add a task above.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}