import React from "react";
import usePageTitle from "../../hooks/usePageTitle";
// import { Dropdown } from 'primereact/dropdown';
import ThemeToggle from "../../components/app/ThemeToggle";
import { getTheme } from "../../utils/getTheme";
import { HiPencil, HiUserCircle } from "react-icons/hi2";

const SettingsPage: React.FC = () => {
  // Set page title
  const { currentTheme } = getTheme();
  const image = localStorage.getItem("image");
  usePageTitle("Settings");

  return (
    <div
      className={`p-6 space-y-6 flex flex-col items-center ${currentTheme.global.text} `}
    >
      <div className="w-[50%]">
        {/* // <!-- Profile Section --> */}
        <div className={`${currentTheme.global.bg}  rounded p-4  w-full`}>
          <h2 className={`text-xl font-semibold`}>Profile</h2>
          <div className={`flex flex-col items-center space-y-4 mt-4 `}>
            {image ? (
              <img
                src={image}
                alt="Profile"
                className={`w-40 h-40 rounded-full`}
              />
            ) : (
              <HiUserCircle className={`w-40 h-40 rounded-full`} />
            )}
            <div className="flex items-center justify-between  space-x-10">
              <div>
                <p className={`text-lg font-medium`}>John Doe</p>
                <p className={`${currentTheme.global.textSecondary}`}>
                  john.doe@email.com
                </p>
              </div>
              <button
                className={`ml-auto ${currentTheme.hoverEffects.btnHover} transition-all p-2 rounded`}
              >
                <HiPencil />
              </button>
            </div>
          </div>
        </div>

        {/* // <!-- Theme Settings --> */}
        <div className={` rounded p-4 w-full`}>
          <h2 className="text-xl font-semibold">Appearance</h2>
          <div className="mt-4 flex items-center justify-between">
            <p className={`${currentTheme.global.textSecondary}`}>
              Current Theme:{" "}
            </p>
            <ThemeToggle border={true} theme={currentTheme} />
          </div>
        </div>

        {/* // <!-- Payment/Billing --> 
      <div className={`  rounded p-4 border w-full`}>
        <h2 className={`text-xl font-semibold`}>Billing</h2>
        <p className={`${currentTheme.global.textSecondary}`}>Current Plan: <strong>Premium</strong></p>
        <button className={`mt-4 ${currentTheme.hoverEffects.btnHover} ${currentTheme.global.border} border px-4 py-2 rounded`}>Manage Billing</button>
      </div>*/}
      </div>
    </div>
  );
};

export default SettingsPage;
