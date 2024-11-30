import React, { useRef } from "react";
import { LiaUnderlineSolid } from "react-icons/lia";
import { FaBold } from "react-icons/fa";
import { PiTextItalicBold } from "react-icons/pi";

const MainEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Function to handle formatting
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value || "");
  };

  // const HeadingPop = () => {
  //   return (<div className="absolute left-0 mt-1 border rounded shadow-lg flex flex-col">
  //     <button
  //       onClick={() => applyFormat("formatBlock", "H1")}
  //       className="px-4 py-2 text-left text-lg font-bold hover:bg-gray-200"
  //     >
  //       H1
  //     </button>
  //     <button
  //       onClick={() => applyFormat("formatBlock", "H2")}
  //       className="px-4 py-2 text-left text-lg hover:bg-gray-200"
  //     >
  //       H2
  //     </button>
  //     <button
  //       onClick={() => applyFormat("formatBlock", "H3")}
  //       className="px-4 py-2 text-left text-lg hover:bg-gray-200"
  //     >
  //       H3
  //     </button>
  //   </div>)
  // }

  return (
    <div className="max-w-full h-full w-full mx-auto p-2 rounded-md shadow-md">
      {/* Toolbar */}
      <div className="flex items-center justify-start gap-3 mb-2">
        <button
          onClick={() => applyFormat("bold")}
          className="p-2 border rounded shadow"
          aria-label="Bold"
        >
          <FaBold size={20} />
        </button>
        <button
          onClick={() => applyFormat("italic")}
          className="p-2 border rounded shadow"
          aria-label="Italic"
        >
          <PiTextItalicBold size={20} />
        </button>
        <button
          onClick={() => applyFormat("underline")}
          className="p-2 border rounded shadow"
          aria-label="Underline"
        >
          <LiaUnderlineSolid size={20} />
        </button>

        {/* Headers Dropdown */}
        {/* <div className="relative">
          <Popover content={<HeadingPop />}>
          <button
            className="p-2 border rounded shadow flex items-center gap-1"
            aria-label="Headers"
          >
            <LuHeading size={20} />
            <span className="text-sm">Headers</span>
            </button>
            </Popover>          
        </div> */}
      </div>

      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        className="max-h-[90%] min-h-[90%] p-2 border overflow-auto rounded-md focus:outline-none"
        suppressContentEditableWarning={true} // Suppresses React warning for uncontrolled editing
      ></div>
    </div>
  );
};

export default MainEditor;
