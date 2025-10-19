import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#10B981", "#EF4444"]; // green for income, red for expense

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);

  // Fetch totals and transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch summary
        const resSummary = await axiosSecure.get("/summary");
        const { totalIncome, totalExpense } = resSummary.data;

        setTotals({
          income: totalIncome,
          expense: totalExpense,
          balance: totalIncome - totalExpense,
        });

        // Fetch recent transactions
        const resTx = await axiosSecure.get("/transactions"); 
        setTransactions(resTx.data);
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
    <div className="p-3 md:p-8 lg:p-0 space-y-8">
      {/* --- Top Cards --- */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
         Dashboard Overview
      </h1>
      <p>Welcome to Expense Tracker Dashboard</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border-l-4 border-purple-500 transition-transform hover:scale-105">
          <div>
            <h2 className="text-gray-500 font-medium">Total Balance</h2>
            <p className="text-3xl font-bold text-gray-800">
              ${totals.balance.toFixed(2)}
            </p>
          </div>
          <FaWallet className="text-4xl text-purple-500" />
        </div>

        {/* Total Income */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border-l-4 border-green-500 transition-transform hover:scale-105">
          <div>
            <h2 className="text-gray-500 font-medium">Total Income</h2>
            <p className="text-3xl font-bold text-gray-800">
              ${totals.income.toFixed(2)}
            </p>
          </div>
          <FaArrowUp className="text-4xl text-green-500" />
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border-l-4 border-red-500 transition-transform hover:scale-105">
          <div>
            <h2 className="text-gray-500 font-medium">Total Expense</h2>
            <p className="text-3xl font-bold text-gray-800">
              ${totals.expense.toFixed(2)}
            </p>
          </div>
          <FaArrowDown className="text-4xl text-red-500" />
        </div>
      </div>

      {/* --- Recent Transactions + Chart --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Transactions List */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Transactions
          </h2>
          <ul className="divide-y divide-gray-200 max-h-[350px] overflow-y-auto">
            {transactions.length === 0 ? (
              <p className="text-gray-500">No transactions found</p>
            ) : (
              transactions.map((tx) => (
                <li
                  key={tx._id}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{tx.source}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                  <span
                    className={`font-semibold ${
                      tx.type === "income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Circle Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Income vs Expense
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
