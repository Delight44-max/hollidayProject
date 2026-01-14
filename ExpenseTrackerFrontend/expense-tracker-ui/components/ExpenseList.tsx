import { ExpenseResponse } from "@/types/expense";

interface Props {
  expenses: ExpenseResponse[];
  onDelete: (id: number) => void;
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
          <tr>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold text-right">Amount</th>
            <th className="px-6 py-4 font-semibold text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-gray-800">{item.description}</td>
              <td className="px-6 py-4">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                  {item.category}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
              <td className="px-6 py-4 text-right font-bold text-gray-900">
                ${item.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {expenses.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                No expenses found. Start by adding one!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}