import React from "react";
import ProjectList from "../../../components/app/projects/main/ProjectList";
import { getTheme } from "../../../utils/getTheme";

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


const ProjectsPage: React.FC = () => {
  const { currentTheme } = getTheme();

  return (
    <>
      <div className="w-full h-full flex">
        <ProjectList theme={currentTheme} />
      </div>
    </>
  );
};

export default ProjectsPage;
