export const Pricing = () => {
  return (
    <div className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-green-600 mb-10">
          Choose Your Plan
        </h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          {/* Base Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:w-1/3">
            <h3 className="text-3xl font-bold text-green-600 mb-4">
              DayBoard Base
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Get started with the essentials, free forever.
            </p>
            <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-bold">
              Get Free Plan
            </button>
          </div>
          {/* Plus Plan */}
          <div className="bg-green-600 text-white rounded-xl shadow-lg p-8 md:w-1/3">
            <h3 className="text-3xl font-bold mb-4">DayBoard +</h3>
            <p className="text-lg mb-8">
              Unlock premium features for only $10/month.
            </p>
            <button className="bg-yellow-300 text-green-800 py-3 px-6 rounded-lg font-bold">
              Upgrade to Plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
