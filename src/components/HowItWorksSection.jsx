import { FaUserPlus, FaWallet, FaChartLine } from "react-icons/fa";

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 text-center">
        {/* Small label */}
        <span className="text-base font-semibold bg-violet-50 px-3 py-1 rounded-full text-purple-500 mb-4">How It Works</span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Simple process, powerful results
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Get started in minutes and take control of your personal or shared finances effortlessly.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <FaUserPlus className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
            <p className="text-gray-600">
              Sign up for free and set up your profile in seconds to start tracking expenses.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <FaWallet className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Add Your Expenses</h3>
            <p className="text-gray-600">
              Log your daily expenses, categorize them, and monitor where your money goes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <FaChartLine className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track & Improve</h3>
            <p className="text-gray-600">
              Visualize spending trends with charts and take smarter financial decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
