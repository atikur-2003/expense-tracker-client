import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddIncome = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState({
    source: "",
    amount: "",
    date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!incomeData.source || !incomeData.amount || !incomeData.date) {
      Swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }

    const income = {
      ...incomeData,
      amount: parseFloat(incomeData.amount),
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      const res = await axiosSecure.post("/income", income);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Income added successfully!", "success");
        setIncomeData({
          source: "",
          amount: "",
          date: ""
        });
      } else {
        Swal.fire("Error!", "Something went wrong. Try again.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to add income.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">
          Add Income
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Income Source <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="source"
              value={incomeData.title}
              onChange={handleChange}
              placeholder="e.g. Freelance Project Payment"
              className="input input-bordered w-full focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={incomeData.amount}
              onChange={handleChange}
              placeholder="e.g. 500"
              className="input input-bordered w-full focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={incomeData.date}
              onChange={handleChange}
              className="input input-bordered w-full focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn bg-purple-500 hover:bg-purple-600 text-white w-full transition duration-200"
          >
            {loading ? "Saving..." : "Add Income"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
