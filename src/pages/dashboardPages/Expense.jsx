import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AddExpenseModal from "./AddExpenseModal";


const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch or mock data
  useEffect(() => {
    const mockExpenses = [
      { id: 1, category: "Food", amount: 120, date: "2025-10-15" },
      { id: 2, category: "Transport", amount: 60, date: "2025-10-16" },
      { id: 3, category: "Bills", amount: 90, date: "2025-10-17" },
      { id: 4, category: "Shopping", amount: 150, date: "2025-10-18" },
    ];
    setExpenses(mockExpenses);
  }, []);

  const chartData = expenses.map((exp) => ({
    name: exp.category,
    amount: exp.amount,
  }));

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="space-y-8">
      {/* ===== Chart Section ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl px-2 py-3 shadow">
        <h2 className="text-xl font-semibold mb-4">Expense Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Expense List Section ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">All Expenses</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            + Add Expense
          </button>
        </div>

        {/* Expense List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {expenses.length > 0 ? (
            expenses.map((exp) => (
              <div
                key={exp.id}
                className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{exp.category}</p>
                  <p className="text-sm text-gray-500">{exp.date}</p>
                </div>
                <p className="text-red-500 font-semibold">${exp.amount.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No expenses yet</p>
          )}
        </div>
      </div>

      {/* ===== Add Expense Modal ===== */}
      {isModalOpen && (
        <AddExpenseModal
          closeModal={() => setIsModalOpen(false)}
          onAddExpense={handleAddExpense}
        />
      )}
    </div>
  );
};

export default Expense;
