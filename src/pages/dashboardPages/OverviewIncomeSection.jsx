import React, { useEffect, useState } from "react";
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
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaArrowTrendUp } from "react-icons/fa6";

const OverviewIncomeSection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [incomes, setIncomes] = useState([]);

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

  // chart data
  const chartData = incomes.slice(0, 4).map((income) => ({
    date: new Date(income.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
    amount: income.amount,
    source: income.source,
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
    <div>
      <div className="grid md:grid-cols-2 gap-6 mt-10 md:mt-16">
        {/* Chart section */}
        <div className="bg-white h-100 rounded-xl mb-10 md:mb-0">
          <div className="text-center py-3">
            <h1>Incomes Overview</h1>
          </div>
          <ResponsiveContainer width="100%" height="100%" className='text-sm p-0'>
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

        {/* ===== Recent Expenses ===== */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm py-6 px-1 md:px-3">
          <div className="flex items-center justify-between mb-4 pl-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Recent Incomes
            </h2>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {incomes.length ? (
              incomes.slice(0, 4).map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-xl bg-green-100 text-green-600`}
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
                      "flex items-center gap-1 px-2 py-1 rounded-lg text-green-600 bg-green-50"
                    }
                  >
                    ${Number(tx.amount || 0).toLocaleString()}
                    <FaArrowTrendUp />
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
      </div>
    </div>
  );
};

export default OverviewIncomeSection;
