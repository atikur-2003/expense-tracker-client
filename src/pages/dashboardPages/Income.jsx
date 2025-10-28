import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { FaEdit, FaPlus } from "react-icons/fa";
import AddIncomeModal from "./AddIncomeModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowDown, FaArrowTrendUp, FaTrash } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Income = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [incomes, setIncomes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  // Fetch incomes from API
  useEffect(() => {
    console.log("User email:", user?.email);
    if (!user?.email) return;
    const fetchIncomes = async () => {
      const res = await axiosSecure.get(`/incomes?email=${user.email}`);
      console.log("Fetched incomes:", res.data);
      setIncomes(res.data);
    };
    fetchIncomes();
  }, [user?.email, axiosSecure]);

  const handleEditClick = (income) => {
    setEditingIncome(income);
    setIsEditModalOpen(true);
  };

  const handleUpdateIncome = async (id, updatedData) => {
    try {
      await axiosSecure.put(`/incomes/${id}`, updatedData);
      // Update local state instantly
      setIncomes((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...updatedData } : item
        )
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Income updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axiosSecure.delete(`/incomes/${id}`);
      setIncomes((prev) => prev.filter((item) => item._id !== id));
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
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Format date for better X-axis labels
  const chartData = incomes.map((income) => ({
    name: new Date(income.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
    source: income.source,
    amount: income.amount,
  }));

  const barColors = ["#8b5cf6", "#c4b5fd"];

  return (
    <div>
      <div className="space-y-6">
        {/* ===== Income Overview Section ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Income Overview
              </h2>
              <p className="text-gray-500 text-sm">
                Track your earnings over time and analyze your income trends.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition duration-300"
            >
              <span className="text-lg">＋</span> Add Income
            </button>
          </div>

          {/* Chart Section */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                barCategoryGap="20%"
                margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.1}
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200">
                          <p className="font-semibold text-gray-700 mb-1">
                            {data.source}
                          </p>
                          <p className="text-sm text-purple-600 font-medium">
                            ${Number(data.amount).toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Bar dataKey="amount" radius={[12, 12, 0, 0]} barSize={60}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={barColors[index % 2]} // alternate colors
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income List + Button */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
          {incomes.length === 0 ? (
            <p className="text-gray-500 text-lg text-center py-6">
              No incomes added yet.
            </p>
          ) : (
            <div>
              <div className="mb-5 flex justify-between">
                <h1 className="text-xl font-semibold">All Incomes</h1>
                {/* <button className="flex items-center gap-2 text-sm px-3 py-2 text-purple-500 border border-purple-500 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-500 hover:text-white transition duration-300">
                  <FaArrowDown /> Download
                </button> */}
              </div>
              <ul className="">
                {incomes.map((income) => (
                  <div>
                    <li
                      key={income._id}
                      className="group p-3 rounded-lg flex justify-between text-gray-700 hover:shadow-lg cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="bg-green-100 text-green-600 p-2 rounded-full text-xl">
                          {income.icon}
                        </span>
                        <div>
                          <p className="font-medium">{income.source}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(
                              income.date || income.createdAt || Date.now()
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Right: Amount + Hover Icons */}
                      <div className="flex items-center gap-5 transition duration-300">
                        {/* Action Buttons on Hover */}
                        <div className="hidden group-hover:flex gap-4 transition duration-300">
                          <button
                            onClick={() => handleEditClick(income)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteIncome(income._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <span className="flex items-center gap-2 px-2 py-0.5 rounded-lg font-medium text-green-600 bg-green-50">
                          + ${Number(income.amount || 0).toLocaleString()}{" "}
                          <FaArrowTrendUp />
                        </span>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <AddIncomeModal
            setIsModalOpen={setIsModalOpen}
            setIncomes={setIncomes}
          />
        )}
      </div>


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
                  {selectedEmoji || editingIncome.emoji || editingIncome.icon}
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
                  emoji: selectedEmoji || editingIncome.emoji,
                  date: e.target.date.value,
                };
                await handleUpdateIncome(editingIncome._id, updatedData);
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
                  defaultValue={editingIncome.source}
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
                  defaultValue={editingIncome.amount}
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
                    editingIncome.date
                      ? editingIncome.date.split("T")[0]
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
                Update Income
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Income;
