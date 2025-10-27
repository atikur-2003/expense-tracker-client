import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaWallet } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";

const COLORS = ["#10B981", "#EF4444"]; // green for income, red for expense

const Overview = () => {
  const {user}=useAuth()
  const axiosSecure = useAxiosSecure();
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);


  // fetching summery
  useEffect(() => {
  if (!user?.email) {
    // console.log("No user email, skipping summary fetch");
    return;
  }

  const fetchSummary = async () => {
    try {
      const resSummary = await axiosSecure.get(`/summary?email=${user.email.toLowerCase()}`);
      const { totalIncome, totalExpense, balance } = resSummary.data;
      // console.log("Fetched summary:", resSummary.data);

      setTotals({
        income: totalIncome || 0,
        expense: totalExpense || 0,
        balance: balance || 0, // Use balance from API response
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
      setTotals({
        income: 0,
        expense: 0,
        balance: 0,
      }); // Fallback in case of error
    }
  };

  fetchSummary();
}, [user?.email, axiosSecure]);


// fetching recent transaction
useEffect(() => {
  if (!user?.email) {
    console.log("No user email, skipping transactions fetch");
    return;
  }

  const fetchTransactions = async () => {
    try {
      // Fetch recent transactions from the correct endpoint
      const resTx = await axiosSecure.get(`/transactions?email=${user.email.toLowerCase()}`);
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
          <div className="flex gap-5 items-center">
            <div className="bg-purple-500 p-3 text-white rounded-full">
              <FaWallet size={30} />
            </div>
            <div>
              <h2 className="text-gray-700 font-medium">Total Balance</h2>
              <p className="text-lg font-semibold">
                ${totals.balance.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border-l-4 border-green-500 transition-transform hover:scale-105">
          <div className="flex gap-5 items-center">
            <div className="bg-green-500 p-3 text-white rounded-full">
              <FaArrowTrendUp size={30} />
            </div>
            <div>
              <h2 className="text-gray-700 font-medium">Total Income</h2>
              <p className="text-lg font-semibold">
                ${totals.income.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border-l-4 border-red-500 transition-transform hover:scale-105">
          <div className="flex gap-5 items-center">
            <div className="bg-red-500 p-3 text-white rounded-full">
              <FaArrowTrendDown size={30} />
            </div>
            <div>
              <h2 className="text-gray-700 font-medium">Total Expense</h2>
              <p className="text-lg font-semibold">
                ${totals.expense.toFixed(2)}
              </p>
            </div>
          </div>
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

export default Overview;
