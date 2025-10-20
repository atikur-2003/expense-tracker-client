import React, { useState } from "react";

const AddExpenseModal = ({ closeModal, onAddExpense }) => {
  const [form, setForm] = useState({ category: "", amount: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.date) return;
    onAddExpense({ ...form, id: Date.now(), amount: Number(form.amount) });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category"
            className="w-full border p-2 rounded-md"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full border p-2 rounded-md"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            type="date"
            className="w-full border p-2 rounded-md"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
