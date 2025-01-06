import { Link, useParams } from "react-router-dom";
import KanbanContainer from "../../../components/app/objects/project-components/KanbanContainer";
import usePageTitle from "../../../hooks/usePageTitle";
import { getTheme } from "../../../utils/getTheme";
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
// import { VscPaintcan } from "react-icons/vsc";
import useBoardStore from "../../../store/boardStore";
// import { HiX } from "react-icons/hi";
import { SideBar } from "../../../components/app/objects/ui/SideBar";
import { motion } from "framer-motion";

const BackgroundSelector: React.FC<{
  handleBackgroundChange: (url: string) => void;
  currentImg: string;
  saveBoardDetails: () => void;
}> = ({ handleBackgroundChange, currentImg, saveBoardDetails }) => {

  const { currentTheme } = getTheme();
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  const [unsplashImgs, setUnsplashImgs] = useState<any[]>([]);
  const [query, setQuery] = useState(""); // Empty query for random images initially
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchedImageIds = useRef(new Set<string>());

  const fetchImages = async (pageNum: number, searchQuery: string) => {
    setLoading(true);
    try {
      const endpoint = searchQuery
        ? `https://api.unsplash.com/search/photos?page=${pageNum}&query=${searchQuery}&client_id=${API_KEY}`
        : `https://api.unsplash.com/photos?page=${pageNum}&client_id=${API_KEY}`;

      const response = await fetch(endpoint);
      const data = await response.json();
      const newImages = searchQuery ? data.results : data;

      // Filter out duplicates before appending
      const filteredImages = newImages.filter((img: any) => {
        if (fetchedImageIds.current.has(img.id)) {
          return false;
        }
        fetchedImageIds.current.add(img.id);
        return true;
      });

      setUnsplashImgs((prevImgs) => [...prevImgs, ...filteredImages]);
    } catch (error) {
      console.error("Error fetching Unsplash images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch images initially and when query or page changes
  useEffect(() => {
    fetchImages(page, query);
  }, [page, query]);

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  

  return (
    <div className="h-full">
      <div className="flex fill-all flex-col gap-2">
        {/* Search Bar */}
        <div className="h-fit">
          <input
            type="text"
            placeholder="Search photos..."
            className="w-full p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value); // Update query
              setUnsplashImgs([]); // Reset images for new search
              setPage(1); // Reset page for new query
            }}
          />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 overflow-auto h-full gap-2">
          {unsplashImgs.map((img) => (
            <button
              key={img.id}
              onClick={() => handleBackgroundChange(img.urls.regular)}
              className={`h-20 w-full rounded-lg shadow-md bg-cover bg-center ${
                img.urls.regular === currentImg
                  ? "border-2 border-[#4AFD3A]"
                  : ""
              }`}
              style={{ backgroundImage: `url(${img.urls.thumb})` }}
            />
          ))}
          {/* Loading Spinner */}
          {loading && (
            <div className="text-center animate-pulse mt-4">Loading...</div>
          )}
          {/* Infinite Scroll Trigger */}
          <button onClick={handleSeeMore} className="w-full p-2 bg-green-800 text-white rounded-lg" >
            <p>Load More...</p>
          </button>
        </div>

        {/* Default Background Button */}
        <div className="h-fit flex items-center space-x-2 justify-evenly">
          <button
            onClick={() => saveBoardDetails()}
            className={`${currentTheme.hoverEffects.textBg} py-2 px-4 rounded-lg w-full`}
          >
            Save
          </button>
          <button
            onClick={() => {
              handleBackgroundChange("")
              saveBoardDetails()
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 w-full px-4 rounded-lg"
          >
            Default
          </button>
        </div>
      </div>
    </div>
  );
};

// EditBoardComponent
const EditBoardComponent: React.FC<{
  editName: string;
  setEditName: (name: string) => void;
  editDescription: string;
  setEditDescription: (desc: string) => void;
  saveBoardDetails: () => void;
}> = ({
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  saveBoardDetails,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4"
    >
      <label className="block text-sm font-medium text-gray-700">
        Board Name
      </label>
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">
        Description
      </label>
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <button
        onClick={saveBoardDetails}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Save
      </button>
    </motion.div>
  );
};

// Main ProjectDetail Component
const ProjectDetail: React.FC = () => {
  const { currentTheme } = getTheme();
  const { boards, updateBoard } = useBoardStore(); // Assume `updateBoard` is a method to update boards
  const { boardId } = useParams<{ boardId: string }>();
  const board = boards.find((p) => p.id === Number(boardId));

  const [imageUrl, setImageUrl] = useState("");
  const [withImg, setWithImg] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editName, setEditName] = useState(board?.name || "");
  const [editDescription, setEditDescription] = useState(
    board?.description || ""
  );
  const [sidebarPage, setSidebarPage] = useState("Menu");
  const [sideContent, setSideContent] = useState(false);

  // Set page title
  usePageTitle("Boards - " + board?.name);


  // Upon load, check if board has image 
  useEffect(() => {
    if (board?.image && board?.image != "") {
      setWithImg(true)
      setImageUrl(board.image)
    }
  }, [])

  // Handle background selection
  const handleBackgroundChange = (newImageUrl: string) => {
    setWithImg(!!newImageUrl);
    setImageUrl(newImageUrl);
  };

  const handleImgUrlStyle = () =>
    withImg
      ? {
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }
      : {};

  // Save edited details
  const saveBoardDetails = () => {
    if (board) {      
      updateBoard(board.id, { name: editName, description: editDescription, image: imageUrl });
      setSidebarOpen(false);
    }
  };

  const sidebarPages = [
    {
      name: "Edit Board",
      content: (
        <EditBoardComponent
          editName={editName}
          setEditName={setEditName}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          saveBoardDetails={saveBoardDetails}
        />
      ),
    },
    {
      name: "Edit Background",
      content: (
        <div className="h-full">
          <BackgroundSelector
            handleBackgroundChange={handleBackgroundChange}
            currentImg={imageUrl}
            saveBoardDetails={saveBoardDetails}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      className={`flex flex-col fill-all ${currentTheme.sidenav.bg}`}
      style={handleImgUrlStyle()}
    >
      <div
        className={`flex justify-between items-center p-2 transition-all`}
      >
        <div>
          <div
            className={`${currentTheme.global.textSecondary} flex flex-col gap-y-1 items-baseline`}
          >
            <Link to="/app/b">Boards /</Link>
            <div>
              <h1 className={`font-bold text-2xl ${currentTheme.global.textPrimary}`}>
                {board?.name}
              </h1>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setSidebarPage("Edit");
            setSidebarOpen(true);
          }}
          className={`p-2 rounded-md ${currentTheme.hoverEffects.textHover} ${currentTheme.global.text} cursor-pointer transition-colors`}
        >
          <HiOutlineEllipsisHorizontal className="text-2xl" />
        </button>
      </div>

      <div className="h-full w-full overflow-auto" style={{ cursor: "grab" }} onMouseDown={(e) => {
        const target = e.currentTarget;
        let startX = e.pageX - target.offsetLeft;
        let scrollLeft = target.scrollLeft;

        const onMouseMove = (e: MouseEvent) => {
          const x = e.pageX - target.offsetLeft;
          const walk = (x - startX) * 2; // Scroll-fast
          target.scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => {
          target.style.cursor = "grab";
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };

        target.style.cursor = "grabbing";
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }}>
        <KanbanContainer theme={currentTheme} board={board!} />
      </div>

      {/* Sidebar */}
      <SideBar
        open={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
          setSideContent(false);
        }}
        theme={currentTheme}
        exitButton={true}
        title={sidebarPage} // Show current sidebar page title
      >
        {/* Sidebar Buttons */}
        <div className="flex flex-col gap-4 fill-all">
          {sideContent
            ? sidebarPages.find((p) => p.name === sidebarPage)?.content
            : sidebarPages.map((page) => (
                <button
                  key={page.name}
                  onClick={() => {
                    setSidebarPage(page.name);
                    setSideContent(true);
                  }}
                  className={`p-2 rounded-md ${currentTheme.global.text} ${currentTheme.hoverEffects.textHover} transition-colors`}
                >
                  {page.name}
                </button>
              ))}
        </div>
      </SideBar>
    </div>
  );
};

export default ProjectDetail;