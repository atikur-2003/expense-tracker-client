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
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetch incomes from API
  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await axiosSecure.get("/expenses");
      setExpenses(res.data);
    };
    fetchExpenses();
  }, [axiosSecure]);

  const chartData = expenses.map((exp) => ({
    name: exp.source,
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
            className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition duration-300"
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
                  <p className="font-medium">{exp.source}</p>
                  <p className="text-sm text-gray-500">{exp.date}</p>
                </div>
                <p className="text-red-500 font-semibold">{exp.amount}</p>
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
