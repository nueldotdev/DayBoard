import React, { useState } from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineCog6Tooth,
  HiEllipsisHorizontal,
  HiOutlineFolderPlus as HiOutlineFolderPlusIcon,
} from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";

const routes = [
  { path: "/", element: <HiOutlineSquares2X2 size={24} />, name: "Home" },
  {
    path: "/notes",
    element: <HiOutlineDocumentText size={24} />,
    name: "Notes",
  },
  {
    path: "/tasks",
    element: <HiOutlineCheckCircle size={24} />,
    name: "Tasks",
  },
  {
    path: "/settings",
    element: <HiOutlineCog6Tooth size={24} />,
    name: "Settings",
  },
];

const projects = [
  {
    name: "Project 1",
    color: "#a84e32",
  },
  {
    name: "Project 2",
    color: "#3244a8",
  },
  {
    name: "Project 3",
    color: "#d95a00",
  },
];

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div className="w-full p-4 bg-white dark:bg-zinc-900 relative min-h-screen max-h-screen flex flex-col transition-all border-r border-r-zinc-300 dark:border-r-zinc-700 gap-y-4">
      <div className="w-full">
        {/* Sidebar content */}
        <div className="w-full">
          {routes.map((route) => (
            <li key={route.path} className="text-dark list-none">
              <NavLink
                to={route.path}
                end={route.path === "/app"}
                className={({ isActive }) =>
                  isActive
                    ? `bg-[#40e4a031] dark:bg-[#35aa7931] p-2 mb-2 transition flex items-center gap-x-2 rounded-lg ${
                        isNavOpen ? "" : "justify-center"
                      }`
                    : `hover:bg-[#40e4a031] dark:hover:bg-[#35aa7931] p-2 mb-2 transition flex items-center gap-x-2 rounded-lg ${
                        isNavOpen ? "" : "justify-center"
                      }`
                }
              >
                <span className="icon">{route.element}</span>
                <span className={`text ${isNavOpen ? "" : "hidden"}`}>
                  {route.name}
                </span>
              </NavLink>
            </li>
          ))}
        </div>
      </div>
      <hr className="w-full border border-[#acacac31] dark:border-[#acacac31]" />
      <div className="w-full">
        {/* Footer content */}
        <div className="w-full">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="text-base text-neutral-500 dark:text-neutral-500">My Projects</h2>
            <HiOutlineFolderPlusIcon size={18} className="text-neutral-500 cursor-pointer dark:text-neutral-500" />
          </div>
          <div className="w-full">
            {projects.map((project) => {
              // Create a semi-transparent background color based on project.color
              // const transparentColor = `${project.color}3b`;

              return (
                <li
                  key={project.name}
                  className={`flex items-center justify-between list-none w-full p-2 mb-2 transition gap-x-2 rounded-lg cursor-pointer
              ${isNavOpen ? "" : "justify-center"}`}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = `${project.color}3b`)
                  } // Hover color
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  } // Reset color on leave
                  onClick={() => navigate(project.name)} // Use navigate on list item
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
