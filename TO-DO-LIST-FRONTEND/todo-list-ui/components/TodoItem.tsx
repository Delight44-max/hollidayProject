import { TodoResponse } from "@/types/todo";

interface Props {
  todo: TodoResponse;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl mb-3 hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-4">
        {/* Checkbox / Toggle Button */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            todo.completed
            ? "bg-indigo-600 border-indigo-600 text-white"
            : "bg-white border-slate-300 hover:border-indigo-400"
          }`}
        >
          {todo.completed && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* 💡 FIX: Changed todo.task to todo.text to match your Backend DTO */}
        <span className={`text-lg font-medium transition-all ${
          todo.completed ? "text-slate-400 line-through" : "text-slate-700"
        }`}>
          {todo.text}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-300 hover:text-red-500 transition-colors p-2"
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}