import { Link, useParams } from "react-router-dom";
import KanbanContainer from "../../../components/app/objects/project-components/KanbanContainer";
import usePageTitle from "../../../hooks/usePageTitle";
import { getTheme } from "../../../utils/getTheme";
import React, { useState, useEffect, useRef } from "react";
import { HiArrowLeft, HiOutlineEllipsisHorizontal } from "react-icons/hi2";
// import { VscPaintcan } from "react-icons/vsc";
import useBoardStore from "../../../store/boardStore";
// import { HiX } from "react-icons/hi";
import { SideBar } from "../../../components/app/objects/ui/SideBar";
import { motion } from "framer-motion";
import ColorPicker from "../../../components/app/objects/project-components/ColorPicker";
import toast, { Toaster } from "react-hot-toast";

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
          <button
            onClick={handleSeeMore}
            className="w-full p-2 bg-green-800 text-white rounded-lg"
          >
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
              handleBackgroundChange("");
              saveBoardDetails();
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
  editColor: string;
  setEditColor: (color: string) => void;
  saveBoardDetails: () => void;
}> = ({
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  editColor,
  setEditColor,
  saveBoardDetails,
}) => {
  const { currentTheme: theme } = getTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4"
    >
      <label className={`block text-sm font-medium text-gray-700 ${theme.global.textSecondary}`}>
        Board Name
      </label>
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm input-field focus:ring-indigo-500 sm:text-sm border ${theme.global.border} ${theme.global.text} ${theme.sidenav.bg}`}
      />

      <label className={`block text-sm font-medium text-gray-700 mt-4 ${theme.global.textSecondary}`}>
        Description
      </label>
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        rows={3}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm input-field focus:ring-indigo-500 sm:text-sm border ${theme.global.border} ${theme.global.text} ${theme.sidenav.bg} resize-none`}
      />

      <label className={`block text-sm font-medium text-gray-700 mt-4 ${theme.global.textSecondary}`}>
        Color
      </label>
      <ColorPicker color={editColor} onSelect={(color) => setEditColor(color)} />

      <div>
        <label></label>
      </div>
      <button
        onClick={saveBoardDetails}
        className={`mt-4 ${theme.hoverEffects.textBg} ${theme.hoverEffects.btnHover} transition duration-300 text-white py-2 px-4 rounded-md active:scale-95`}
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
  const { boardSlug } = useParams<{ boardSlug: string }>();
  const board = boards.find((p) => p.slug === boardSlug);

  const [imageUrl, setImageUrl] = useState("");
  const [withImg, setWithImg] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editName, setEditName] = useState(board?.name || "");
  const [editDescription, setEditDescription] = useState(
    board?.description || ""
  );
  const [editColor, setEditColor] = useState(board?.color || "");
  const [sidebarPage, setSidebarPage] = useState("Menu");
  const [sideContent, setSideContent] = useState(false);

  // Set page title
  usePageTitle("Boards - " + board?.name);

  // Upon load, check if board has image
  useEffect(() => {
    if (board?.image && board?.image != "") {
      setWithImg(true);
      setImageUrl(board.image);
    }
  }, []);

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
  const saveBoardDetails = async () => {
    if (board) {
      const response = await updateBoard(board.id, {
        name: editName,
        description: editDescription,
        image: imageUrl,
        color: editColor,
      });
      
      toast.success(`${response}`);
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
          editColor={editColor}
          setEditColor={setEditColor}
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
      <div className={`flex justify-between items-center p-2 transition-all`}>
        <div>
          <div
            className={`${currentTheme.global.textSecondary} flex flex-col gap-y-1 items-baseline`}
          >
            <Link to="/app/b" style={{ color: board?.color }} className="opacity-70">Boards /</Link>
            <div>
              <h1
                className={`font-bold text-2xl ${currentTheme.global.textPrimary}`}
              >
                {board?.name}
              </h1>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setSidebarOpen(true);
          }}
          className={`p-2 rounded-md ${currentTheme.hoverEffects.textHover} ${currentTheme.global.text} cursor-pointer transition-colors`}
        >
          <HiOutlineEllipsisHorizontal className="text-2xl" />
        </button>
      </div>

      <div className="h-full w-full overflow-auto">
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
        // title={sidebarPage} // Show current sidebar page title
        className="bg-zinc-900"
      >
        {/* Sidebar Buttons */}
        <div className="flex flex-col gap-4 fill-all">
          <div className="flex items-center justify-start space-x-2 text-lg">
            {sidebarPage !== "Menu" ? (
              <>
                <button
                  onClick={() => {
                    setSidebarPage("Menu");
                    setSideContent(false);
                  }}
                >
                  <HiArrowLeft />
                </button>
                <h1>{sidebarPage}</h1>
              </>
            ) : (
              <h1>{sidebarPage}</h1>
            )}
          </div>

          <div className="fill-all flex-col flex space-y-1">
            {sideContent
              ? sidebarPages.find((p) => p.name === sidebarPage)?.content
              : sidebarPages.map((page) => (
                  <button
                    key={page.name}
                    onClick={() => {
                      setSidebarPage(page.name);
                      setSideContent(true);
                    }}
                    className={`p-2 rounded-md text-left ${currentTheme.global.text} ${currentTheme.hoverEffects.btnHover} transition-colors`}
                  >
                    {page.name}
                  </button>
                ))}
          </div>
        </div>
      </SideBar>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#1a1a1a',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1a1a1a',
            },
          },
        }}
      />
    </div>
  );
};

export default ProjectDetail;
