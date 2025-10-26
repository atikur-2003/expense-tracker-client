import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import EmojiPicker from "emoji-picker-react";
import useAuth from "../../hooks/useAuth";

const AddIncomeModal = ({ setIsModalOpen, setIncomes }) => {
  const {user} = useAuth()
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const [formData, setFormData] = useState({
    icon: "",
    type: "income",
    source: "",
    amount: "",
    email: user.email,
    date: "",
  });

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setFormData((prev) => ({ ...prev, icon: emojiData.emoji }));
    setShowPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosSecure.post("/incomes", formData);
      setIncomes((prev) => [...prev, res.data]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Income added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Income
        </h2>

        {/* Emoji Picker Section */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Choose Icon
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-3xl bg-gray-100 p-2 rounded-lg hover:scale-110 transition"
              onClick={() => setShowPicker(!showPicker)}
            >
              {selectedEmoji || "😊"}
            </button>
            {showPicker && (
              <div className="absolute z-50 mt-60">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme="light"
                  height={400}
                  width={300}
                />
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Income Source
            </label>
            <input
              type="text"
              name="source"
              required
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              required
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-2 rounded-lg cursor-pointer transition duration-300"
          >
            {loading ? "Adding..." : "Add Income"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
