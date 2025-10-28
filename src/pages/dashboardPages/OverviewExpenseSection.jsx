import React, { useEffect, useState } from "react";
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
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowTrendDown } from "react-icons/fa6";

const OverviewExpenseSection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [expenses, setExpenses] = useState([]);

  // Fetch incomes from API
  useEffect(() => {
    if (!user?.email) return;
    const fetchExpenses = async () => {
      const res = await axiosSecure.get(`/expenses?email=${user.email}`);
      setExpenses(res.data);
    };
    fetchExpenses();
  }, [user?.email, axiosSecure]);

  // Format date for better X-axis labels
  const chartData = expenses.slice(0, 4).map((expense) => ({
    name: new Date(expense.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
    source: expense.source,
    amount: expense.amount,
  }));

  const barColors = ["#8b5cf6", "#c4b5fd"];

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mt-10 md:mt-16">
        {/* ===== Recent Expenses ===== */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm py-6 px-1 md:px-3">
          <div className="flex items-center justify-between mb-4 pl-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Recent Expenses
            </h2>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {expenses.length ? (
              expenses.slice(0, 4).map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-xl bg-red-100 text-red-600`}
                    >
                      {tx.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                        {tx.source || "General"}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(
                          tx.date || tx.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      "flex items-center gap-1 px-2 py-1 rounded-lg text-red-600 bg-red-50"
                    }
                  >
                    ${Number(tx.amount || 0).toLocaleString()}
                    <FaArrowTrendDown />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center mt-6">
                No Expense Added yet.
              </p>
            )}
          </div>
        </div>

        {/* ===== Financial Overview Chart ===== */}
        <div className="bg-white h-100 rounded-xl mb-10 md:mb-0">
          <div className="text-center py-3">
            <h1>Expenses Overview</h1>
          </div>
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
    </div>
  );
};

export default OverviewExpenseSection;
