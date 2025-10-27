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
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaArrowDown, FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";

const Expense = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  // Fetch incomes from API
  useEffect(() => {
    console.log("User email:", user?.email);
    if (!user?.email) return;
    const fetchExpenses = async () => {
      const res = await axiosSecure.get(`/expenses?email=${user.email}`);
      console.log("Fetched expense:", res.data);
      setExpenses(res.data);
    };
    fetchExpenses();
  }, [user?.email, axiosSecure]);

  const handleUpdateExpense = async (id, updatedData) => {
    try {
      await axiosSecure.put(`/expenses/${id}`, updatedData);
      // Update local state instantly
      setExpenses((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...updatedData } : item
        )
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Expense updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axiosSecure.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Expense has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (income) => {
    setEditingExpense(income);
    setIsEditModalOpen(true);
  };

  // chart data
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
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No incomes added yet.
          </p>
        ) : (
          <div>
            <div className="mb-5 flex justify-between">
              <h1 className="text-xl font-semibold">All Incomes</h1>
              <button className="flex items-center gap-2 text-sm px-3 py-2 text-purple-500 border border-purple-500 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-500 hover:text-white transition duration-300">
                <FaArrowDown /> Download
              </button>
            </div>
            <ul className="">
              {expenses.map((expense) => (
                <div>
                  <li
                    key={expense._id}
                    className="group py-3 rounded-lg flex justify-between text-gray-700 hover:shadow-lg cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-red-100 text-red-600 p-2 rounded-full text-xl">
                        {expense.icon}
                      </span>
                      <div>
                        <p className="font-medium">{expense.source}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(
                            expense.date || expense.createdAt || Date.now()
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Right: Amount + Hover Icons */}
                    <div className="flex items-center gap-5 transition duration-300">
                      {/* Action Buttons on Hover */}
                      <div className="hidden group-hover:flex gap-4 transition duration-300">
                        <button
                          onClick={() => handleEditClick(expense)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteIncome(expense._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <span className="flex items-center gap-2 px-2 py-0.5 rounded-lg font-medium text-red-600 bg-green-50">
                        + ${Number(expense.amount || 0).toLocaleString()}{" "}
                        <FaArrowTrendDown />
                      </span>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ===== Add Expense Modal ===== */}
      {isModalOpen && (
        <AddExpenseModal
          closeModal={() => setIsModalOpen(false)}
          setExpenses={setExpenses}
        />
      )}

      {/* Edit Income Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Income
            </h2>

            {/* Emoji Picker Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Choose Icon
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-3xl bg-gray-100 p-2 rounded-lg hover:scale-110 transition"
                  onClick={() => setShowPicker((prev) => !prev)}
                >
                  {selectedEmoji || editingExpense.emoji || editingExpense.icon}
                </button>
                {showPicker && (
                  <div className="absolute z-50 mt-60">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        setSelectedEmoji(emojiData.emoji);
                        setShowPicker(false);
                      }}
                      theme="light"
                      height={400}
                      width={300}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Edit Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const updatedData = {
                  source: e.target.source.value,
                  amount: e.target.amount.value,
                  emoji: selectedEmoji || editingExpense.emoji,
                  date: e.target.date.value,
                };
                await handleUpdateExpense(editingExpense._id, updatedData);
                setIsEditModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Income Source
                </label>
                <input
                  type="text"
                  name="source"
                  defaultValue={editingExpense.source}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={editingExpense.amount}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={
                    editingExpense.date
                      ? editingExpense.date.split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-2 rounded-lg cursor-pointer transition duration-300"
              >
                Update Expense
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
