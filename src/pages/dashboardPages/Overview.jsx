import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaWallet } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import OverviewExpenseSection from "./OverviewExpenseSection";
import OverviewIncomeSection from "./OverviewIncomeSection";
import RecentTransaction from "./RecentTransaction";


const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });

  // fetching summery
  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const fetchSummary = async () => {
      try {
        const resSummary = await axiosSecure.get(
          `/summary?email=${user.email.toLowerCase()}`
        );
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


  return (
    <div className="space-y-8">
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
      <RecentTransaction totals={totals}/>
      <OverviewExpenseSection />
      <OverviewIncomeSection />
    </div>
  );
};

export default Overview;
