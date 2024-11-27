import React, { useEffect, useState } from "react";
import { mainTheme, Projects } from "../../../../utils/interfaces";
import { Link } from "react-router-dom";
import { Modal } from "../../objects/ui/Modal";

interface ComponentProps {
  theme: mainTheme;
  projects: Projects[];
}

const ProjectList: React.FC<ComponentProps> = ({ theme, projects }) => {
  const currentTheme = theme;
  const [projectList, setProjectList] = useState<Projects[]>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setProjectList(projects);
  }, []);

  console.log(projectList);

  return (
    <>
      <div className="p-4 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <button
            className={`${currentTheme.global.textPrimary} ${currentTheme.hoverEffects.btnHover} border ${currentTheme.global.border} transition-colors px-4 py-2 rounded-lg`}
            onClick={() => {setModal(!modal)}}
          >
            Add New Project
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className={`flex flex-col justify-between rounded-lg shadow hover:shadow-xl transition p-4 ${currentTheme.global.textPrimary} border ${currentTheme.global.border}`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">{project.name}</h2>
                  {/* {project.daysLeft && (
                  <span className="text-sm px-2 py-1 rounded-lg">
                    {project.daysLeft}
                  </span>
                )} */}
                </div>
                <p
                  className={`w-full text-left text-sm mb-4 ${currentTheme.global.textSecondary}`}
                >
                  {project.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Modal
        open={modal}
        onClose={() => {setModal(!modal)}}
        position="center"
        theme={currentTheme}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <form>
            <div className="mb-4">
              <label className={`block ${theme.global.textSecondary} text-sm mb-2`}>
                Project Name
              </label>
              <input
                type="text"
                className={`${theme.sidenav.bg} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
              />
            </div>
            <div className="mb-4">
              <label className={`block ${theme.global.textSecondary} text-sm mb-2`}>
                Project Description
              </label>
              <textarea
                className={`${theme.sidenav.bg} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline resize-none h-[150px]`}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`${theme.hoverEffects.btnHover} ${theme.global.textPrimary} ${theme.global.border} transition border py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
                type="button"
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProjectList;
