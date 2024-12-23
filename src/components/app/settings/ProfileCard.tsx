// ProfileCard.tsx
import React from "react";
import { HiPencil, HiUserCircle } from "react-icons/hi2";
import { mainTheme } from "../../../utils/interfaces";

interface ProfileCardProps {
  image: string | null;
  name: string;
  email: string;
  theme: mainTheme
}

const ProfileCard: React.FC<ProfileCardProps> = ({ image, name, email }) => {
  return (
    <div className={`rounded p-4 w-full shadow-lg`}>
      <h2 className="text-xl font-semibold">Profile</h2>
      <div className="flex flex-col items-center space-y-4 mt-4">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover"
          />
        ) : (
          <HiUserCircle className="w-40 h-40" />
        )}
        <div className="flex items-center justify-between space-x-10 w-full">
          <div className="flex flex-col items-start">
            <p className="text-lg font-medium">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <button className="ml-auto p-2 rounded hover:bg-gray-300 transition-all">
            <HiPencil />
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProfileCard };
