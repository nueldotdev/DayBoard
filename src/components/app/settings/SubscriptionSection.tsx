// SubscriptionSection.tsx
import React from "react";
import { HiCog } from "react-icons/hi2";

const SubscriptionSection: React.FC = () => {
  return (
    <div className="rounded p-4 w-full shadow-lg">
      <h2 className="text-xl font-semibold">Subscription</h2>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Subscription Status:</p>
        <p className="font-medium">Active</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all flex items-center">
          <HiCog className="mr-2" />
          Manage Billing
        </button>
      </div>
    </div>
  );
};

export { SubscriptionSection };
