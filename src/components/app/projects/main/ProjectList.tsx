import React from "react";
import { mainTheme } from "../../../../utils/interfaces";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Digital Ocean",
    subtitle: "Social Media Strategy · Social Media Branding",
    daysLeft: "2 days left",
    progress: 56,
    avatars: [
      "https://ui-avatars.com/api/?name=Alice+Brown&background=random",
      "https://ui-avatars.com/api/?name=Bob+Johnson&background=random",
    ],
  },
  {
    id: 2,
    title: "IBM",
    subtitle: "Branding IBM Lab Company · Social Media Strategy · Website Concept",
    progress: 82,
    avatars: [
      "https://ui-avatars.com/api/?name=Alice+Brown&background=random",
      "https://ui-avatars.com/api/?name=Bob+Johnson&background=random",
    ],
  },
  // Add more project objects as needed...
];

interface ComponentProps {
  theme: mainTheme;
}


const ProjectList: React.FC<ComponentProps> = ({theme}) => {
  const currentTheme = theme;

  return (
    <div className="p-4 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button className={`${currentTheme.global.textPrimary} px-4 py-2 rounded-lg`}>
          Add New Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`}
            key={project.id}
            className={`flex flex-col justify-between rounded-lg shadow hover:shadow-xl transition p-4 ${currentTheme.global.textPrimary} border ${currentTheme.global.border}`}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {project.title}
                </h2>
                {project.daysLeft && (
                  <span className="text-sm px-2 py-1 rounded-lg">
                    {project.daysLeft}
                  </span>
                )}
              </div>
              <p className={`w-full text-left text-sm mb-4 ${currentTheme.global.textSecondary}`}>{project.subtitle}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className={`w-full rounded-full h-2.5 ${currentTheme.hoverEffects.textBg}`}>
                <div
                  className="h-2.5 rounded-full"
                  style={{ width: `${project.progress}%`,
                    backgroundColor: `${currentTheme.global.brand}` }}
                ></div>
              </div>
              <span className={`text-sm ${currentTheme.global.textSecondary} ml-2`}>
                {project.progress}%
              </span>
            </div>
            <div className="flex items-center mt-4">
              {project.avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="Contributor"
                  className={`w-8 h-8 rounded-full border-2 ${currentTheme.sidenav.border} -ml-2 ${
                    index === 0 ? "ml-0" : ""
                  }`}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
