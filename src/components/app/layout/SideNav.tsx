import React from "react";
import {
  HiEllipsisHorizontal,
  HiOutlineCog6Tooth,
  HiOutlineFolderPlus as HiOutlineFolderPlusIcon,
  HiOutlineHome,
  HiOutlineSquares2X2
} from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import useThemeStore from "../../../store/themeStore";
import { themes } from "../../../themeConfig";
import Tooltip from "../objects/ui/Tooltip";
import { HiTrendingUp } from "react-icons/hi";

const routes = [
  { 
    path: "/app", 
    element: <HiOutlineHome size={20} />, 
    name: "Home" },
  {
    path: "/app/b",
    element: <HiOutlineSquares2X2 size={20} />,
    name: "Boards",
  },
  // {
  //   path: "/app/schedule",
  //   element: <HiCalendarDays size={20} />,
  //   name: "Schedule",
  // },
  // {
  //   path: "/app/notes",
  //   element: <HiOutlineDocumentText size={20} />,
  //   name: "Notes",element: <HiOutlineRectangleStack  size={20} />,
  // },
  {
    path: "/app/stats",
    element: <HiTrendingUp size={20} />,
    name: "Stats",
  },
  {
    path: "/app/settings",
    element: <HiOutlineCog6Tooth size={20} />,
    name: "Settings",
  },
  
];

const projects = [
  {
    id: 1,
    name: "Project 1",
    color: "#a84e32",
  },
  {
    id: 2,
    name: "Project 2",
    color: "#3244a8",
  },
  {
    id: 3,
    name: "Project 3",
    color: "#d95a00",
  },
];

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return (
    <div
      className={`w-full p-2 relative min-h-screen max-h-screen flex items-start transition-all gap-y-4 ${currentTheme.sidenav.bg}`}
    >
      <div className="w-full">
        {/* Sidebar content */}
        <ul className="w-full flex flex-col gap-y-2">
          {routes.map((route) => (
            <li key={route.path} className="list-none">
              <NavLink
                to={route.path}
                end={route.path === "/app"}
                className={({ isActive }) =>
                  isActive
                    ? `${
                        currentTheme.hoverEffects.textBg
                      } p-1 transition flex flex-col items-center gap-x-2 rounded-md`
                    : `${
                        currentTheme.hoverEffects.textHover
                      } p-1 transition flex flex-col items-center gap-x-2 rounded-md`
                }
              >
                <Tooltip text={route.name} position="right" theme={currentTheme}>
                  <span className="icon">{route.element}</span>
                </Tooltip>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <hr className="w-full border border-[#acacac31] dark:border-[#acacac31] no-display" />
      <div className="w-full no-display">
        {/* Footer content */}
        <div className="w-full">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="text-base text-neutral-500 dark:text-neutral-500">
              My Projects
            </h2>
            <HiOutlineFolderPlusIcon
              size={18}
              className="text-neutral-500 cursor-pointer dark:text-neutral-500"
            />
          </div>
          <div className="w-full">
            {projects.map((project) => {
              // Create a semi-transparent background color based on project.color
              // const transparentColor = `${project.color}3b`;

              return (
                <li
                  key={project.name}
                  className={`flex items-center justify-between list-none w-full p-2 mb-2 transition gap-x-2 rounded-lg cursor-pointer`}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = `${project.color}3b`)
                  } // Hover color
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  } // Reset color on leave
                  onClick={() => navigate(`project/${project.id}`)} // Use navigate on list item
                >
                  {/* Project icon and name */}
                  <div className="flex items-center gap-x-2">
                    <span
                      className={`icon w-4 h-4 rounded-full mr-2`}
                      style={{ backgroundColor: project.color }}
                    ></span>
                    <span>{project.name}</span>
                  </div>

                  {/* Ellipsis menu button */}
                  <button
                    className="p-1 rounded-full ml-2"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents parent onClick from triggering
                      console.log(`Options for ${project.name}`);
                    }}
                  >
                    <HiEllipsisHorizontal size={24} />
                  </button>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
