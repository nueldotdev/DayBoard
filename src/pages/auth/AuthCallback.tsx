import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTheme } from "../../utils/getTheme";
import { getDetails } from "../../../services/handleToken";
import { useState } from "react";

const loadingWords = [
  "Authenticating...",
  "Fetching your data...",
  "Setting things up...",
  "Almost there..."
];


const AuthCallback = () => {
  const navigate = useNavigate();
  const { currentTheme } = getTheme();
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % loadingWords.length);
    }, 1200);

    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const userId = params.get("user_id");

    if (!accessToken || !refreshToken || !userId) {
      navigate("/auth?type=login");
      clearInterval(interval);
      return;
    }

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user_id", userId);

    getDetails();

    // Simulate a short delay before redirect for UX
    setTimeout(() => {
      clearInterval(interval);
      navigate("/app");
    }, 2000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div
      className={`absolute z-[10000] h-screen w-full flex flex-col items-center justify-center ${currentTheme.sidenav.bg} transition-opacity duration-1000 ease-in-out`}
    >
      <div
        className={`animate-bounce rounded-full h-32 w-32 flex items-center justify-center`}
      >
        <img src="/dayboard-dark.svg" alt="Dayboard Logo" className="w-20" />
      </div>
      <p className="mt-8 text-lg font-medium text-center relative h-7">
        <span
          key={loadingIndex}
          className="inline-block transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in"
          style={{ position: "absolute", width: "100%" }}
        >
          {loadingWords[loadingIndex]}
        </span>
      </p>
      <style>
        {`
          @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px);}
        to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
        animation: fade-in 0.5s;
          }
        `}
      </style>
    </div>
  );
};

export default AuthCallback;
