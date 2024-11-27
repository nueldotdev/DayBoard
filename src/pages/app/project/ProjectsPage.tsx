import React from "react";
import ProjectList from "../../../components/app/projects/main/ProjectList";
import { getTheme } from "../../../utils/getTheme";
import usePageTitle from "../../../hooks/usePageTitle";
import { projects } from "../../../utils/sampleLists";

const ProjectsPage: React.FC = () => {
  const { currentTheme } = getTheme();

  // Set page title
  usePageTitle("Projects");

  return (
    <>
      <div className="w-full h-full flex">
        <ProjectList theme={currentTheme} projects={projects} />
      </div>
    </>
  );
};

export default ProjectsPage;
