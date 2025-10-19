import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaPlus } from "react-icons/fa";
import AddIncomeModal from "./AddIncomeModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Income= () => {
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

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Income Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income List + Button */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">All Incomes</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FaPlus /> Add Income
          </button>
        </div>

        {incomes.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No incomes added yet.</p>
        ) : (
          <ul className="divide-y">
            {incomes.map((income) => (
              <li key={income._id} className="py-3 flex justify-between text-gray-700">
                <span>{income.source}</span>
                <span className="font-semibold">${income.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && <AddIncomeModal setIsModalOpen={setIsModalOpen} setIncomes={setIncomes} />}
    </div>
  );
};

export default Income;
