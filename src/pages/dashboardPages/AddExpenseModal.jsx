import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddExpenseModal = ({ closeModal, onAddExpense }) => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    type:'expense',
    source: "",
    amount: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosSecure.post("/expenses", formData);
      onAddExpense((prev) => [...prev, res.data]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Expense added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category"
            className="w-full border p-2 rounded-md"
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full border p-2 rounded-md"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
          <input
            type="date"
            className="w-full border p-2 rounded-md"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white cursor-pointer"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
