import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddIncome = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!incomeData.title || !incomeData.amount || !incomeData.category || !incomeData.date) {
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
          title: "",
          amount: "",
          category: "",
          date: "",
          description: "",
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
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">
          Add Income
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
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

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={incomeData.category}
              onChange={handleChange}
              className="select select-bordered w-full focus:outline-none focus:border-purple-500"
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
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

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={incomeData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Optional details..."
              className="textarea textarea-bordered w-full focus:outline-none focus:border-purple-500"
            ></textarea>
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
