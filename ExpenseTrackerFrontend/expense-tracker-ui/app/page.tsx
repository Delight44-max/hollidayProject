"use client";

import { useEffect, useState } from "react";
import { expenseApi } from "@/lib/api";
import { ExpenseResponse, ExpenseRequest } from "@/types/expense";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import BalanceSummary from "@/components/BalanceSummary";
import CategoryChart from "@/components/CategoryChart";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await expenseApi.getAll();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError("Failed to load expenses. Is your Spring Boot server running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleAdd = async (newExpense: ExpenseRequest) => {
    try {
      const saved = await expenseApi.create(newExpense);
      setExpenses((prev) => [...prev, saved]);
    } catch (err) {
      alert("Error saving expense");
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await expenseApi.delete(id);
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Error deleting expense");
    }
  };

  if (loading && expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500">Connecting to Spring Boot...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-600 mt-2">Full-stack dashboard with Next.js & Spring Boot</p>
        </header>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}


        <BalanceSummary expenses={expenses} />


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <CategoryChart expenses={expenses} />

          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Transaction</h2>
            <ExpenseForm onAdd={handleAdd} />
          </div>
        </div>


        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
            <span className="text-sm text-gray-500">{expenses.length} items total</span>
          </div>
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        </section>

      </div>
    </main>
  );
}