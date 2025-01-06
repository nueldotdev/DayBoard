import React, { useState, useEffect } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import ThemeToggle from "../../components/app/ThemeToggle";
import { getTheme } from "../../utils/getTheme";
import { FocusTimerSettings } from "../../components/app/settings/FocusTimerSettings";
import { ProfileCard } from "../../components/app/settings/ProfileCard";
import { SubscriptionSection } from "../../components/app/settings/SubscriptionSection";
import { Button } from "../../components/app/objects/ui/Button";
import { Modal } from "../../components/app/objects/ui/Modal";
import { ComingSoon } from "../../components/app/objects/ui/ComingSoon";

const SettingsPage: React.FC = () => {
  // Set page title
  const { currentTheme } = getTheme();
  const image = localStorage.getItem("bgImg");
  usePageTitle("Settings");
  const [modal, setModal] = useState<boolean>(false);

  // State for managing which tab/group is selected
  const [selectedTab, setSelectedTab] = useState<string>("general");

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
    <>
      <div
        className={`fill-all p-6 flex flex-col md:flex-row ${currentTheme.global.text} ${currentTheme.glass.bg} transition-all`}
      >
        {/* Sidebar for Tab Navigation */}
        <div
          className={`w-full md:w-[20%] p-4 ${currentTheme.sidenav.bg} border-r ${currentTheme.sidenav.border} rounded-l-md`}
        >
          <h2 className="text-lg font-semibold">Settings</h2>
          <ul className="mt-4 space-y-2">
            <li
              className={`cursor-pointer p-2 rounded-md ${
                selectedTab === "general"
                  ? currentTheme.hoverEffects.textBg
                  : ""
              }`}
              onClick={() => setSelectedTab("general")}
            >
              General
            </li>
            <li
              className={`cursor-pointer p-2 rounded-md ${
                selectedTab === "profile"
                  ? currentTheme.hoverEffects.textBg
                  : ""
              }`}
              onClick={() => setSelectedTab("profile")}
            >
              Profile
            </li>
            <li
              className={`cursor-pointer p-2 rounded-md ${
                selectedTab === "preference"
                  ? currentTheme.hoverEffects.textBg
                  : ""
              }`}
              onClick={() => setSelectedTab("preference")}
            >
              Preference
            </li>

            <li
              className={`cursor-pointer p-2 rounded-md ${
                selectedTab === "subscription"
                  ? currentTheme.hoverEffects.textBg
                  : ""
              }`}
              onClick={() => setSelectedTab("subscription")}
            >
              Subscription
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div
          className={`w-full md:w-[80%] flex justify-center fill-all p-4 rounded-r-md space-y-6 ${currentTheme.sidenav.bg}`}
        >
          <div className="w-4/6">
            {selectedTab === "profile" && (
              <ProfileCard
                name="John Doe"
                email="john.doe@email.com"
                theme={currentTheme}
              />
            )}

            {selectedTab === "preference" && (
              <div className={`rounded p-4 w-full`}>
                <div>
                  <div>
                    <h2 className="text-xl font-semibold">Choose Theme</h2>
                    <div className="mt-4 flex items-center justify-between">
                      <p className={`${currentTheme.global.textSecondary}`}>
                        Current Theme:
                      </p>
                      <ThemeToggle border={true} theme={currentTheme} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Choose Sound</h2>
                    <div className="mt-4 flex items-center justify-between">
                      {/* This should be a modal of all the sounds we have */}
                      <p className={`${currentTheme.global.textSecondary}`}>
                        Current Sound:
                      </p>
                      <Button
                        className={`p-2 rounded-md  ${currentTheme.global.text} ${currentTheme.global.border} border ${currentTheme.hoverEffects.btnHover} bg-transparent`}
                        onClick={() => setModal(true)}
                      >
                        Change Sound
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Wallpaper</h2>
                    <div className="mt-4 flex items-center justify-between">
                      <p className={`${currentTheme.global.textSecondary}`}>
                        Current Wallpaper:
                      </p>
                      <div className="relative group w-2/5">
                        <img
                          src={image || "default-wallpaper.jpg"}
                          alt="Current Wallpaper"
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center ${currentTheme.global.bg} bg-opacity-50 opacity-0 rounded-md group-hover:opacity-100 transition-opacity`}>
                          <Button
                            className={`p-2 fill-all rounded-md ${currentTheme.global.text} bg-transparent`}
                            onClick={() => setModal(true)}
                          >
                            Change Wallpaper
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "general" && (
              <FocusTimerSettings
                theme={currentTheme}
                focusTime={focusTime}
                setFocusTime={setFocusTime}
                onSave={handleSaveFocusTime}
                loading={loading}
              />
            )}

            {selectedTab === "subscription" && <SubscriptionSection />}
          </div>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} theme={currentTheme}>
        <ComingSoon />
      </Modal>
    </>
  );
};

export default SettingsPage;
