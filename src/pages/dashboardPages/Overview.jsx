import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#10B981", "#EF4444"]; // green for income, red for expense

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch summary
        const resSummary = await axiosSecure.get("/summary");
        const { totalIncome, totalExpense } = resSummary.data;

        const balance = totalIncome - totalExpense;

        setTotals({
          income: totalIncome || 0,
          expense: totalExpense || 0,
          balance,
        });

        // Fetch recent transactions
        const resTx = await axiosSecure.get("/transactions");
        setTransactions(resTx.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [axiosSecure]);

  const chartData = [
    { name: "Income", value: totals.income },
    { name: "Expense", value: totals.expense },
  ];

  return (
    <div className="p-3 md:p-5 lg:p-0 space-y-8">
      {/* --- Header --- */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">Welcome to Expense Tracker Dashboard</p>
      </div>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border-l-4 border-purple-500 transition-transform hover:scale-105">
          <div>
            <h2 className="text-gray-500 font-medium">Total Balance</h2>
            <p className="text-2xl font-bold text-gray-800">
              ${totals.balance.toFixed(2)}
            </p>
          </div>
          <FaWallet className="text-4xl text-purple-500" />
        </div>

        {/* Total Income */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border-l-4 border-green-500 transition-transform hover:scale-105">
          <div>
            <h2 className="text-gray-500 font-medium">Total Income</h2>
            <p className="text-2xl font-bold text-gray-800">
              ${totals.income.toFixed(2)}
            </p>
          </div>
          <FaArrowUp className="text-4xl text-green-500" />
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border-l-4 border-red-500 transition-transform hover:scale-105">
          <div>
            <h2 className="text-gray-500 font-medium">Total Expense</h2>
            <p className="text-2xl font-bold text-gray-800">
              ${totals.expense.toFixed(2)}
            </p>
          </div>
          <FaArrowDown className="text-4xl text-red-500" />
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* ===== Recent Transactions ===== */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Recent Transactions
            </h2>
            {/* <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400">
              See All →
            </button> */}
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
                      {tx.type === "income" ? "💰" : "💸"}
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
                    className={`font-semibold ${
                      tx.type === "income" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}$
                    {Number(tx.amount || 0).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center mt-6">
                No recent transactions yet.
              </p>
            )}
          </div>
        </div>

        {/* ===== Financial Overview Chart ===== */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center">
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
                <Tooltip/>
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

export default Overview;
