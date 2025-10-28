import React from "react";

const FAQSection = () => {
  return (
    <div className="px-4 bg-white md:px-10 lg:px-20 py-16">
      <div className="text-center my-10">
        <h1 className="text-3xl text-gray-800 font-bold">Frequently Asked Questions</h1>
      </div>
      <div className="collapse collapse-arrow bg-gray-50 border border-gray-100">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-gray-800 font-semibold">
          What is the Expense Tracker app?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Expense Tracker is a simple tool that helps you record your daily
          expenses, track income, and analyze your spending habits to stay
          financially organized.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-50 border border-gray-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-gray-800 font-semibold">
          Is my financial data secure?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Yes, your data is completely secure. All sensitive information is
          stored safely, and authentication is handled using modern security
          standards like JWT.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-50 border border-gray-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-gray-800 font-semibold">
          Can I track multiple categories of expenses?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Absolutely! You can organize your expenses into different categories
          such as food, travel, shopping, bills, and more to get better
          insights.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-50 border border-gray-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-gray-800 font-semibold">
          Can I access my data from any device?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Yes, your data is synced securely in the cloud. You can log in from
          any device to view or manage your expenses in real time.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-gray-50 border border-gray-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-gray-800 font-semibold">
          Is the app free to use?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Yes! The basic version of the Expense Tracker is free to use. We plan
          to introduce premium features like analytics and budget planning soon.
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
