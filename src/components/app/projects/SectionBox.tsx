import React, { useState } from "react";
import {
  HiChevronRight,
  HiFolder,
  HiMagnifyingGlass,
  HiOutlinePlus,
} from "react-icons/hi2";
import { getTheme } from "../../../utils/getTheme";
import { Dialog } from "primereact/dialog";
import { boards, sectionList } from "../../../utils/sampleLists";
import { Link, useParams } from "react-router-dom";
import { getObject } from "../../../hooks/getObj";


const SectionBox: React.FC = () => {
  const { currentTheme } = getTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const { boardId } = useParams<{ boardId: string }>();

  const board = getObject(Number(boardId), boards);

  // Filter sections based on search query
  const filteredSections = sectionList.filter((section) =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <div className={`mb-6 flex justify-between items-center`}>
          <div
            className={`flex px-2 py-1 items-center rounded-lg w-fit border ${currentTheme.global.border}`}
          >
            <HiMagnifyingGlass size={24} />
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`p-2 ${currentTheme.global.bg} ${currentTheme.global.text} placeholder:${currentTheme.global.textSecondary} focus:outline-none rounded-lg`}
            />
          </div>
          <button
            className={`${currentTheme.global.textPrimary} ${currentTheme.hoverEffects.btnHover} border ${currentTheme.global.border} transition-colors px-4 py-2 rounded-lg`}
            onClick={() => setVisible(true)}
          >
            {/* Section name and entries */}
            <div className="flex justify-center items-center gap-x-2">
              {/* Folder Icon with color */}
              {/* <HiOutlinePlus size={20} /> */}
              <h2 className="">Add New Section</h2>
            </div>
          </button>
        </div>

        {/* Section boxes (side by side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredSections.map((section) => (
            <Link 
              to={`/b/${board.id}/${section.id}`}
              key={section.id}
              className={`flex items-center p-4 rounded-lg shadow-md w-full ${currentTheme.sidenav.bg} border ${currentTheme.global.border}`}
            >
              <HiFolder className="mr-3" style={{ color: section.color }} />
              {/* Section name and entries */}
              <div className="flex-1">
                {/* Folder Icon with color */}
                <h2 className="text-lg">{section.name}</h2>
              </div>

              {/* Chevron icon for opening (placeholder) */}
              <div className="flex">
                <span
                  className={`text-sm ${currentTheme.global.textSecondary}`}
                >
                  {section.entries}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Dialog visible={visible} onHide={() => setVisible(false)}>
        <p>Content</p>
      </Dialog>
    </>
  );
};

export default SectionBox;
