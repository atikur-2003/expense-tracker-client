import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const COLORS = ["#10B981", "#EF4444"]; // green for income, red for expense

const RecentTransaction = ({ totals }) => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user?.email) {
      console.log("No user email, skipping transactions fetch");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const resTx = await axiosSecure.get(
          `/transactions?email=${user.email.toLowerCase()}`
        );
        console.log("Fetched transactions:", resTx.data);
        setTransactions(resTx.data || []); // Ensure an array is set, even if empty
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]); // Fallback to empty array on error
      }
    };

    fetchTransactions();
  }, [user?.email, axiosSecure]);

  const chartData = [
    { name: "Income", value: totals.income },
    { name: "Expense", value: totals.expense },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* ===== Recent Transactions ===== */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm py-6 px-1 md:px-3">
          <div className="flex items-center justify-between mb-4 pl-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Recent Transactions
            </h2>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {transactions.length ? (
              transactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-xl ${
                        tx.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
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
                    className={` flex items-center gap-1 px-2 py-1 rounded-lg ${
                      tx.type === "income"
                        ? "text-green-600 bg-green-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    ${Number(tx.amount || 0).toLocaleString()}
                    {tx.type === "income" ? (
                      <FaArrowTrendUp />
                    ) : (
                      <FaArrowTrendDown />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-800 text-center mt-6">
                No recent transactions yet.
              </p>
            )}
          </div>
        </div>

        {/* ===== Financial Overview Chart ===== */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm py-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Financial Overview
          </h2>
          <div className="relative w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={3}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Balance
              </p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                ${totals.balance.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransaction;
