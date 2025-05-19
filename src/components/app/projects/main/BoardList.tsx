import React, { useEffect, useState } from "react";
import { mainTheme } from "../../../../utils/interfaces";
import { Link } from "react-router-dom";
import { Modal } from "../../objects/ui/Modal";
import useBoardStore, { Board } from "../../../../store/boardStore";
import Select from "../../objects/ui/Select";
import {
  HiEllipsisHorizontal,
  HiOutlinePencilSquare,
  HiOutlineStar,
  HiTrash,
} from "react-icons/hi2";

interface ComponentProps {
  theme: mainTheme;
  // boards: Boards[];
}

type Option = {
  icon: React.ReactElement;
  label: string;
  value: string;
  color?: string;
};

const testOp2: Option[] = [
  {
    icon: <HiTrash size={20} />,
    label: "Delete",
    value: "Delete this board",
    color: "#b82316",
  },
];

const testOptions: Option[][] = [
  [
    {
      icon: <HiOutlinePencilSquare size={20} />,
      label: "Edit",
      value: "Edit this board",
    },
    {
      icon: <HiOutlineStar size={20} />,
      label: "Favorite",
      value: "Favorite this board",
    },
  ],
  testOp2,
];

const BoardList: React.FC<ComponentProps> = ({ theme }) => {
  const { createBoard, boards, getBoards } = useBoardStore();

  // console.log("Boards Length: ", boards.length)
  const [isLoading, setIsLoading] = useState(true);
  const [allBoards, setAllBoards] = useState<Board[]>([]);

  const [newBoards, setNewBoards] = useState({
    id: `${boards.length + 1}`,
    name: "",
  });
  const [modal, setModal] = useState(false);

  /**
   * Handles input changes for the new board form.
   * Updates the state with the new value.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event containing the changed input.
   */
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    // Update the state with the new value.
    setNewBoards((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(newBoards);
  };

  const addBoards = () => {
    createBoard(newBoards.id, newBoards.name);
    setModal(false);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        await getBoards();
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    // getBoards();
    setAllBoards(boards);
  }, [boards]);

  console.log(allBoards);

  return (
    <>
      <div className={`max-h-screen fill-all flex flex-col ${theme.glass.bg}`}>
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Boards</h1>
          <button
            className={`${theme.global.textPrimary} ${theme.hoverEffects.btnHover} border ${theme.global.border} transition-colors px-4 py-2 rounded-lg`}
            onClick={() => {
              setModal(!modal);
            }}
          >
            Add Board
          </button>
        </div>

        {/* Project Grid */}
        <div className="flex px-4 pb-4 h-full overflow-auto">
          <div
            className={`fill-all flex items-center justify-center border-t ${theme.global.border} `}
          >
            {isLoading ? (
              <div className="fill-all flex items-center justify-center">
                <div
                  className={`transform animate-ping rounded-full h-16 w-16 border-2`}
                  style={{ borderColor: theme.global.brand }}
                ></div>
              </div>
            ) : boards.length > 0 ? (
              <div className="fill-all p-2">
                <div
                  className={
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  }
                >
                  {allBoards.map((board) => (
                    <Link
                      to={`/app/b/${board.slug}`}
                      key={board.id}
                      className={`flex flex-col justify-between rounded-lg shadow hover:shadow-xl transition p-4 ${theme.global.textPrimary} border ${theme.global.border} ${theme.sidenav.bg}`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center justify-start space-x-2">
                            {board.color && (
                              <div
                                className={`w-3 h-3 rounded-full`}
                                style={{ backgroundColor: board.color }}
                              ></div>
                            )}
                            <h2 className="text-lg font-semibold">
                              {board.name}
                            </h2>
                          </div>
                          <Select
                            options={testOptions}
                            onSelect={(value) => console.log(value)}
                            theme={theme}
                            className="w-fit"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event propagation
                              e.preventDefault(); // Prevent default behavior
                            }}
                          >
                            <HiEllipsisHorizontal size={20} />
                          </Select>
                        </div>
                        <p
                          className={`w-full text-left text-sm mb-4 ${theme.global.textSecondary}`}
                        >
                          {board.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`text-center ${theme.sidenav.bg} p-8 rounded-lg`}>
                <p>No Boards Found</p>
                <p>Click Add Board to create a new board.</p>
                <p>Boards are used to track projects and tasks.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={modal}
        onClose={() => {
          setModal(!modal);
        }}
        position="center"
        theme={theme}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Add New Board</h2>
          <form>
            <div className="mb-4">
              <label
                className={`block ${theme.global.textSecondary} text-sm mb-2`}
              >
                Board Name
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

            <div className="flex items-center justify-between">
              <button
                className={`${theme.hoverEffects.btnHover} ${theme.global.textPrimary} ${theme.global.border} transition border py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
                type="button"
                onClick={() => addBoards()}
              >
                Add Board
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default BoardList;
