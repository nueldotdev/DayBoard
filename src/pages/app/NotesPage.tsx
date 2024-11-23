import React from "react";
// import SectionBox from '../../components/app/notes/SectionBox'
import { getTheme } from "../../utils/getTheme";
import MainEditor from "../../components/app/objects/text-editor-components/MainEditor";

const NotesPage: React.FC = () => {
  const { currentTheme } = getTheme();

  return (
    <>
      <div className="w-full h-full flex gap-2 p-4 ">
        <div className={`w-[45%] h-full ${currentTheme.global.border} border`}></div>
        <div className={`w-full h-full ${currentTheme.global.border} border`}>
          <MainEditor />
        </div>
      </div>
    </>
  );
};

export default NotesPage;
