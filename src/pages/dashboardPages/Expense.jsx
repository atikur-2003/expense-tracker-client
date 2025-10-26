import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
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

  const chartData = expenses.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
    amount: item.amount,
    source: item.source,
  }));

  // ✅ custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { source, amount } = payload[0].payload;
      return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-2 text-sm">
          <p className="font-semibold text-purple-600">{source}</p>
          <p className="text-gray-700">Amount: ${amount}</p>
        </div>
      );
    }
    return null;
  };

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="space-y-8">
      {/* ===== Chart Section ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Header section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Expense Overview
            </h2>
            <p className="text-sm text-gray-500">
              Track your spending trends over time and gain insights into where
              your money goes.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition duration-300"
          >
            + Add Expense
          </button>
        </div>

        {/* Chart section */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.1}
              />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="url(#colorExpense)"
                dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#7c3aed" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Expense List Section ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">All Expenses</h3>
          
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
