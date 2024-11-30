import React, { useEffect, useState } from "react";
import { mainTheme, Boards } from "../../../../utils/interfaces";
import { Link } from "react-router-dom";
import { Modal } from "../../objects/ui/Modal";

interface ComponentProps {
  theme: mainTheme;
  boards: Boards[];
}

const BoardList: React.FC<ComponentProps> = ({ theme, boards }) => {
  const currentTheme = theme;
  const [allBoards, setAllBoards] = useState<Boards[]>([]);

  const createId = () => {
    let currentLength = allBoards.length;

    console.log("New ID: ", currentLength)

    return currentLength;
  }

  const [newBoards, setNewBoards] = useState<Boards>({
    id: createId(),
    name: "",
    description: "",
  })
  const [modal, setModal] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    // Update the state with the new value.
    setNewBoards((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(newBoards)
  };

  const addBoards = () => {
    setAllBoards([...allBoards, newBoards]);
    setModal(false);
  }

  useEffect(() => {
    setAllBoards(boards);
  }, []);

  console.log(allBoards);

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
          {allBoards.map((board) => (
            <Link
              to={`/b/${board.id}`}
              key={board.id}
              className={`flex flex-col justify-between rounded-lg shadow hover:shadow-xl transition p-4 ${currentTheme.global.textPrimary} border ${currentTheme.global.border}`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">{board.name}</h2>
                  {/* {board.daysLeft && (
                  <span className="text-sm px-2 py-1 rounded-lg">
                    {board.daysLeft}
                  </span>
                )} */}
                </div>
                <p
                  className={`w-full text-left text-sm mb-4 ${currentTheme.global.textSecondary}`}
                >
                  {board.description}
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
                className={`${theme.sidenav.bg} input-field`}
                // use this for newProjectName
                onChange={(e) => handleInputChange(e)}
                name="name"
                value={newBoards.name}

              />
            </div>
            <div className="mb-4">
              <label className={`block ${theme.global.textSecondary} text-sm mb-2`}>
                Project Description
              </label>
              <textarea
                className={`${theme.sidenav.bg} input-field resize-none h-[150px]`}
                onChange={(e) => handleInputChange(e)}
                name="description"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`${theme.hoverEffects.btnHover} ${theme.global.textPrimary} ${theme.global.border} transition border py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
                type="button"
                onClick={() => addBoards()}
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

export default BoardList;