import React, { useState, useEffect } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import ThemeToggle from "../../components/app/ThemeToggle";
import { getTheme } from "../../utils/getTheme";
// import { HiPencil, HiUserCircle, HiCog, HiCheckCircle } from "react-icons/hi2";
import { FocusTimerSettings } from "../../components/app/settings/FocusTimerSettings";
import { ProfileCard } from "../../components/app/settings/ProfileCard";
import { SubscriptionSection } from "../../components/app/settings/SubscriptionSection";


const SettingsPage: React.FC = () => {
  // Set page title
  const { currentTheme } = getTheme();
  const image = localStorage.getItem("image");
  usePageTitle("Settings");

  const [focusTime, setFocusTime] = useState<number>(25); // Default 25 minutes
  const [loading, setLoading] = useState<boolean>(false); // Loading state for async actions

  useEffect(() => {
    // Load focus time from localStorage if available
    const savedFocusTime = localStorage.getItem("focusTime");
    if (savedFocusTime) setFocusTime(Number(savedFocusTime));
  }, []);

  const handleSaveFocusTime = () => {
    setLoading(true);
    // Simulate API call or localStorage update
    setTimeout(() => {
      localStorage.setItem("focusTime", String(focusTime));
      setLoading(false);
      alert("Focus time saved successfully!"); // Real implementation should use a notification system
    }, 1000);
  };

  return (
    <div
      className={`p-6 space-y-6 flex flex-col items-center ${currentTheme.global.text} transition-all`}
    >
      <div className="w-full md:w-[50%]">
        {/* Profile Section */}
        <ProfileCard image={image} name="John Doe" email="john.doe@email.com" theme={currentTheme} />

        {/* Theme Settings */}
        <div className={`rounded p-4 w-full ${currentTheme.global.bg}`}>
          <h2 className="text-xl font-semibold">Appearance</h2>
          <div className="mt-4 flex items-center justify-between">
            <p className={`${currentTheme.global.textSecondary}`}>Current Theme:</p>
            <ThemeToggle border={true} theme={currentTheme} />
          </div>
        </div>

        {/* Focus Timer Settings */}
        <FocusTimerSettings
          focusTime={focusTime}
          setFocusTime={setFocusTime}
          onSave={handleSaveFocusTime}
          loading={loading}
        />

        {/* Subscription Section */}
        <SubscriptionSection />

      </div>
    </div>
  );
};

export default SettingsPage;
