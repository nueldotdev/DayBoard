// import React, { useEffect, useState } from "react";
// import { mainTheme, Boards } from "../../../../utils/interfaces";
// import { Link } from "react-router-dom";
// import { Modal } from "../../objects/ui/Modal";
// import useBoardStore from "../../../../store/boardStore";

// interface ComponentProps {
//   theme: mainTheme;
//   // boards: Boards[];
// }

// const BlocksPage: React.FC<ComponentProps> = ({ theme }) => {
//   const { createBoard, boards } = useBoardStore();

//   // console.log("Boards Length: ", boards.length)

//   const currentTheme = theme;
//   const [allBoards, setAllBoards] = useState<Boards[]>([]);

//   const [newBoards, setNewBoards] = useState({
//     id: boards.length + 1,
//     name: "",
//     description: "",
//   });
//   const [modal, setModal] = useState(false);

//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;

//     // Update the state with the new value.
//     setNewBoards((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     console.log(newBoards);
//   };

//   const addBoards = () => {
//     createBoard(newBoards.id, newBoards.name, newBoards.description);
//     setModal(false);
//   };

//   useEffect(() => {
//     setAllBoards(boards);
//   }, [boards]);

//   console.log(allBoards);

//   return (
//     <>
//       <div className="max-h-screen fill-all flex flex-col">
//         {/* Header */}
//         <div className="p-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Boards</h1>
//           <button
//             className={`${currentTheme.global.textPrimary} ${currentTheme.hoverEffects.btnHover} border ${currentTheme.global.border} transition-colors px-4 py-2 rounded-lg`}
//             onClick={() => {
//               setModal(!modal);
//             }}
//           >
//             Add Board
//           </button>
//         </div>

//         {/* Project Grid */}
//         <div className="flex px-4 pb-4 h-full overflow-auto">
//           <div
//             className={`fill-all flex items-center rounded-lg justify-center border border-dashed ${currentTheme.global.border}`}
//           >
//             {boards.length > 0 ? (
//               <div className="fill-all p-2">
//                 <div
//                 className={
//                   "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//                 }
//               >
//                 {allBoards.map((board) => (
//                   <Link
//                     to={`/app/b/${board.id}`}
//                     key={board.id}
//                     className={`flex flex-col justify-between rounded-lg shadow hover:shadow-xl transition p-4 ${currentTheme.global.textPrimary} border ${currentTheme.global.border} ${currentTheme.sidenav.bg} hover:scale-105`}
//                   >
//                     <div>
//                       <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-semibold">{board.name}</h2>
//                         {/* {board.daysLeft && (
//                   <span className="text-sm px-2 py-1 rounded-lg">
//                     {board.daysLeft}
//                   </span>
//                 )} */}
//                       </div>
//                       <p
//                         className={`w-full text-left text-sm mb-4 ${currentTheme.global.textSecondary}`}
//                       >
//                         {board.description}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//               </div>
//             ) : (
//               <div className={`text-center ${currentTheme.sidenav.bg} p-8 rounded-lg`}>
//                 <p>No Boards Found</p>
//                 <p>Click Add Board to create a new board.</p>
//                 <p>Boards are used to track projects and tasks.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Modal
//         open={modal}
//         onClose={() => {
//           setModal(!modal);
//         }}
//         position="center"
//         theme={currentTheme}
//       >
//         <div className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Add New Board</h2>
//           <form>
//             <div className="mb-4">
//               <label
//                 className={`block ${currentTheme.global.textSecondary} text-sm mb-2`}
//               >
//                 Board Name
//               </label>
//               <input
//                 type="text"
//                 className={`${currentTheme.sidenav.bg} input-field`}
//                 // use this for newProjectName
//                 onChange={(e) => handleInputChange(e)}
//                 name="name"
//                 value={newBoards.name}
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 className={`block ${currentTheme.global.textSecondary} text-sm mb-2`}
//               >
//                 Board Description
//               </label>
//               <textarea
//                 className={`${currentTheme.sidenav.bg} input-field resize-none h-[150px]`}
//                 onChange={(e) => handleInputChange(e)}
//                 name="description"
//               ></textarea>
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 className={`${currentTheme.hoverEffects.btnHover} ${currentTheme.global.textPrimary} ${currentTheme.global.border} transition border py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
//                 type="button"
//                 onClick={() => addBoards()}
//               >
//                 Add Board
//               </button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default BlocksPage;
