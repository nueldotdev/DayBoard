import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getTheme } from "../../../utils/getTheme";
import Header from "./Header";
import SideNav from "./SideNav";
import useThemeStore from "../../../store/themeStore";
// import { handleTokens } from "../../../../services/handleToken";
import { useAuthStore } from "../../../store/authStore";
import { PiArrowsLeftRight } from "react-icons/pi";


const Layout: React.FC = () => {
  const { currentTheme } = getTheme();
  const [bgImg, setBgImg] = React.useState<string>("");
  const { themeName } = useThemeStore();
  const [showNav, setShowNav] = React.useState<boolean>(true);
  // const [loading, setLoading] = React.useState<boolean>(true);

  const {isAuthenticated, loading, checkAuth} = useAuthStore()

  const interests = [
    "space",
    "nature",
    "mountains",
    "coding",
    "work",
    "fitness",
    "music",
    "food",
    "travel",
    "art",
  ]; // Add more interests here

  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

  useEffect(() => {
    if (isAuthenticated != true && loading === true) {
      checkAuth()
    } else if (isAuthenticated === false && loading === false) {
      window.location.href = '/auth?type=login'
    }
  }, [loading]);


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const randomInterest =
          interests[Math.floor(Math.random() * interests.length)];
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${randomInterest},day,light&client_id=${API_KEY}`
        );
        const data = await response.json();
        const image = data.urls.regular;
        setBgImg(image);
        localStorage.setItem("bgImg", image);
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
      }
    };

    if (!localStorage.getItem("bgImg")) {
      fetchImage();
    } else {
      setBgImg(localStorage.getItem("bgImg")!);
    }
  }, []);

  return (
    <div
      className={`fixed max-h-screen min-h-screen h-screen w-full ${currentTheme.global.text} ${currentTheme.global.bg}`}
    >
      {loading && (
        <div
          className={`absolute z-[10000] h-screen w-full flex items-center justify-center ${currentTheme.sidenav.bg} transition-opacity duration-1000 ease-in-out`}
        >
          <div
            className={`animate-bounce rounded-full h-32 w-32 flex items-center justify-center`}
          >
            <img
              src="/dayboard-dark.svg"
              alt="Dayboard Logo"
              className="w-20"
            />
          </div>
        </div>
      )}
      <div
        className={`flex ${currentTheme.global.bg} max-h-full min-h-full h-full`}
      >
        <div
          className={`absolute h-full py-2 w-12 left-1 z-[1000]`}
        >
          <div className={`h-full border ${currentTheme.global.border} ${currentTheme.glass.bg} bg-zinc-900/25 rounded-lg transition-all duration-300 ease-in-out` + (showNav ? " translate-x-0" : " translate-x-[-100%]")}>
            <div>
            <Header />
            <SideNav />
            </div>
            <button
              className={`absolute bottom-2 left-12 z-50 ${currentTheme.hoverEffects.textHover} text-white rounded-lg p-2 transition bg-opacity-90`}
              onClick={() => setShowNav(!showNav)}
              aria-label="Toggle Side Panel"
            >
              <PiArrowsLeftRight />
            </button>
          </div>
        </div>
        <div
          className={`w-full overflow-auto ${showNav ? "pl-12" : "pl-0"} transition-all duration-300 ease-in-out`}
          style={{
            backgroundImage: `${
              themeName === "dark"
                ? "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))"
                : "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))"
            }, url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
