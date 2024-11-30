import React from "react";
import ProjectList from "../../../components/app/projects/main/BoardList";
import { getTheme } from "../../../utils/getTheme";
import usePageTitle from "../../../hooks/usePageTitle";
import { boards } from "../../../utils/sampleLists";

const ProjectsPage: React.FC = () => {
  const { currentTheme } = getTheme();

  // Set page title
  usePageTitle("Projects");

  return (
    <>
      <div className="w-full h-full flex">
        <ProjectList theme={currentTheme} boards={boards} />
      </div>
    </>
  );
};

export default ProjectsPage;
