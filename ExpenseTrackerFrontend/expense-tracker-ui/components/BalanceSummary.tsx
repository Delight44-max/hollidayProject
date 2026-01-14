import { ExpenseResponse } from "@/types/expense";

interface Props {
  expenses: ExpenseResponse[];
}

export default function BalanceSummary({ expenses }: Props) {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm font-medium text-gray-500 uppercase">Total Expenses</p>
        <p className="text-2xl font-bold text-red-600">NGN{total.toFixed(2)}</p>
      </div>
      {/* You can add 'Income' or 'Remaining Budget' cards here later */}
    </div>
  );
}