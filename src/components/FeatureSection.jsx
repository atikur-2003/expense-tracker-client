import { FaUsers, FaWallet, FaChartPie } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 text-center">
        {/* Small label */}
        <span className="text-base bg-violet-50 px-3 py-1 rounded-full font-semibold text-purple-500 mb-4">
          Our Features
        </span>

        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
          Everything you need to manage your expenses smartly
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Track your income, spending, and savings effortlessly with our
          powerful tools.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <FaUsers className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-User Support</h3>
            <p className="text-gray-600">
              Collaborate with your family or team members to manage shared
              expenses seamlessly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <FaWallet className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Smart Expense Tracking
            </h3>
            <p className="text-gray-600">
              Categorize your expenses, set budgets, and monitor spending in
              real time.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <FaChartPie className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Insightful Analytics</h3>
            <p className="text-gray-600">
              Visualize your spending habits through charts and reports to make
              better decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
