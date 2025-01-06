import React from "react";
import BoardList from "../../../components/app/projects/main/BoardList";
import usePageTitle from "../../../hooks/usePageTitle";
import { getTheme } from "../../../utils/getTheme";

const BoardsPage: React.FC = () => {
  const { currentTheme } = getTheme();

  // Set page title
  usePageTitle("My Boards");

  return (
    <>
      <div className="w-full h-full flex">
        <BoardList theme={currentTheme} />
      </div>
    </>
  );
};

export default BoardsPage;
