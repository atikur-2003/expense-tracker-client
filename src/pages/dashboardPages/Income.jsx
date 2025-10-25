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

const COLORS = ["#10B981", "#EF4444"];

const Income = () => {
  const axiosSecure = useAxiosSecure();
  const [incomes, setIncomes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch incomes from API
  useEffect(() => {
    const fetchIncomes = async () => {
      const res = await axiosSecure.get("/incomes");
      setIncomes(res.data);
    };
    fetchIncomes();
  }, [axiosSecure]);

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
    <div className=" space-y-6">
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
            className="flex items-center gap-2 px-4 py-2 border border-purple-400 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-all"
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
              {incomes.map((income) => (
                <div>
                  <li
                    key={income._id}
                    className="group py-3 flex justify-between text-gray-700 hover:shadow-lg cursor-pointer transition-all duration-300"
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
                          // onClick={() => handleEditClick(income)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          // onClick={() => handleDeleteIncome(income._id)}
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
  );
};

export default Income;
