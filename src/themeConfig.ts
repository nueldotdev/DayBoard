export const themes = {
  light: {
    global: {
      bg: "bg-white",
      text: "text-black",
      textSecondary: "text-black/60",
      textPrimary: "text-black",
      brand: "#4CAF50",
      border: "border-zinc-300",
      secondary: "text-gray-500",
    },
    hoverEffects: {
      btnHover: "hover:bg-zinc-300",
      textHover: "hover:bg-[#35aa7931]",
      textBg: "bg-[#4AFD3A] bg-opacity-50",
    },
    priority: {
      low: "bg-blue-200/60 text-blue-800",
      medium: "bg-yellow-200/60 text-yellow-800",
      high: "bg-red-200/60 text-red-800",
      completed: "bg-green-200/60 text-green-800",
    },
    sidenav: {
      bg: "bg-gray-200",
      text: "text-gray-800",
      hover: "hover:bg-gray-200",
      border: "border-gray-300",
    },
    kanban: {
      bg: "bg-zinc-200",
      text: "text-black",
      hover: "hover:bg-zinc-300",
    },
    kbHead: {
      bg: "bg-zinc-200/20",
      text: "text-black",
    },
    glass: {
      bg: "bg-white/50 backdrop-blur-md",   // Semi-transparent white
      border: "border-gray-200/50",         // Subtle border for light mode
      text: "text-gray-800",                // Dark text for visibility
      shadow: "shadow-lg",                  // Shadow to add depth
      highlight: "bg-gradient-to-br from-zinc-200 to-zinc-100", // Noticeable light
    },
    chart: {
      tooltip: 'rgba(244, 244, 244, 1)',
      cursorFill: 'rgba(60, 60, 60, 0.03)'
    }
  },

  dark: {
    global: {
      bg: "bg-zinc-950",
      text: "text-zinc-100",
      textSecondary: "text-zinc-500",
      textPrimary: "text-zinc-200",
      brand: "#388E3C",
      border: "border-zinc-800",
      secondary: "text-zinc-500",
    },
    hoverEffects: {
      btnHover: "hover:bg-zinc-800",
      textHover: "hover:bg-[#2a805f31]",
      textBg: "bg-[#4AFD3A] bg-opacity-50",
    },
    priority: {
      low: "bg-blue-500/20 text-blue-400",
      medium: "bg-yellow-500/20 text-yellow-400",
      high: "bg-red-500/20 text-red-400",
      completed: "bg-green-500/20 text-green-400",
    },
    sidenav: {
      bg: "bg-zinc-900",
      text: "text-zinc-300",
      hover: "hover:bg-zinc-800",
      border: "border-zinc-800",
    },
    kanban: {
      bg: "bg-zinc-900",
      text: "text-zinc-200",
      hover: "hover:bg-zinc-800",
    },
    kbHead: {
      bg: "bg-zinc-900/10",
      text: "text-zinc-200",
    },
    glass: {
      bg: "bg-zinc-900/50 backdrop-blur-md", // Frosty effect in dark mode
      border: "border-zinc-700/50",          // Blended border for dark themes
      text: "text-zinc-200",                // Light text for readability
      shadow: "shadow-md",                  // Softer shadow in dark mode
      highlight: "bg-gradient-to-br from-zinc-500/15 to-transparent", // Subtle glow
    },
    chart: {
      tooltip: 'rgba(60, 60, 60, 0.9)',
      cursorFill: 'rgba(255, 255, 255, 0.02)'
    }
  },
  // solarized: {
  //   global: {
  //     bg: "bg-[#fdf6e3]",
  //     text: "text-[#657b83]",
  //     textSecondary: "text-[#657b8360]",
  //     textPrimary: "text-[#657b83]",
  //     brand: "#268bd2",
  //     border: "border-[#657b83]",
  //     secondary: "text-[#268bd2]",
  //   },
  //   hoverEffects: {
  //     btnHover: "hover:bg-[#657b8321]",
  //     textHover: "hover:bg-[#35aa7931]",
  //     textBg: "bg-[#35aa7931]",
  //   },
  //   priority: {
  //     low: "bg-blue-300/50 text-blue-600",
  //     medium: "bg-yellow-300/50 text-yellow-700",
  //     high: "bg-red-300/50 text-red-700",
  //     completed: "bg-green-300/50 text-green-700",
  //   },
  //   sidenav: {
  //     bg: "bg-[#eee8d5]",
  //     text: "text-[#657b83]",
  //     hover: "hover:bg-[#fdf6e3]",
  //     border: "border-[#93a1a1]",
  //   },
  //   kanban: {
  //     bg: "bg-[#eee8d5]",
  //     text: "text-[#657b83]",
  //     hover: "hover:bg-[#657b8321]",
  //   },
  //   kbHead: {
  //     bg: "bg-[#eee8d521]",
  //     text: "text-[#657b83]",
  //   },
  //   glass: {
  //     bg: "bg-[#ffffff99] backdrop-blur-md", // Semi-transparent white with blur
  //     border: "border-[#93a1a155]",          // Soft border to blend with glass
  //     text: "text-[#586e75]",               // Text color to suit glassy theme
  //     shadow: "shadow-lg",                  // Adds depth
  //     highlight: "bg-gradient-to-br from-white/40 to-white/20", // Subtle light highlights
  //   },
  // },
  // dracula: {
  //   global: {
  //     bg: "bg-[#282a36]",
  //     text: "text-[#f8f8f2]",
  //     textSecondary: "text-[#f8f8f260]",
  //     textPrimary: "text-[#f8f8f2]",
  //     brand: "#bd93f9",
  //     border: "border-[#44475a]",
  //     secondary: "text-[#ff79c6]",
  //   },
  //   hoverEffects: {
  //     btnHover: "hover:bg-[#44475a]",
  //     textHover: "hover:bg-[#6272a421]",
  //     textBg: "bg-[#6272a431]",
  //   },
  //   priority: {
  //     low: "bg-blue-500/30 text-blue-300",
  //     medium: "bg-yellow-500/30 text-yellow-300",
  //     high: "bg-red-500/30 text-red-400",
  //     completed: "bg-green-500/30 text-green-300",
  //   },
  //   sidenav: {
  //     bg: "bg-[#44475a]",
  //     text: "text-[#f8f8f2]",
  //     hover: "hover:bg-[#282a36]",
  //     border: "border-[#bd93f9]",
  //   },
  //   kanban: {
  //     bg: "bg-[#282a36]",
  //     text: "text-[#f8f8f2]",
  //     hover: "hover:bg-[#44475a]",
  //   },
  //   kbHead: {
  //     bg: "bg-[#282a3621]",
  //     text: "text-[#f8f8f2]",
  //   },
  //   glass: {
  //     bg: "bg-[#44475a99] backdrop-blur-md", // Transparent dark color with blur
  //     border: "border-[#6272a455]",          // Border to match theme
  //     text: "text-[#f8f8f2]",               // Bright text on glass
  //     shadow: "shadow-md",                  // Slight shadow for depth
  //     highlight: "bg-gradient-to-br from-white/20 to-transparent", // Faint glow
  //   },
  // },
  // nord: {
  //   global: {
  //     bg: "bg-[#2e3440]",
  //     text: "text-[#d8dee9]",
  //     textSecondary: "text-[#d8dee960]",
  //     textPrimary: "text-[#d8dee9]",
  //     brand: "#88c0d0",
  //     border: "border-[#4c566a]",
  //     secondary: "text-[#81a1c1]",
  //   },
  //   hoverEffects: {
  //     btnHover: "hover:bg-[#4c566a]",
  //     textHover: "hover:bg-[#88c0d021]",
  //     textBg: "bg-[#88c0d031]",
  //   },
  //   priority: {
  //     low: "bg-blue-400/30 text-blue-200",
  //     medium: "bg-yellow-400/30 text-yellow-200",
  //     high: "bg-red-400/30 text-red-200",
  //     completed: "bg-green-400/30 text-green-200",
  //   },
  //   sidenav: {
  //     bg: "bg-[#3b4252]",
  //     text: "text-[#d8dee9]",
  //     hover: "hover:bg-[#2e3440]",
  //     border: "border-[#88c0d0]",
  //   },
  //   kanban: {
  //     bg: "bg-[#3b4252]",
  //     text: "text-[#d8dee9]",
  //     hover: "hover:bg-[#4c566a]",
  //   },
  //   kbHead: {
  //     bg: "bg-[#4c566a21]",
  //     text: "text-[#d8dee9]",
  //   },
  //   glass: {
  //     bg: "bg-[#eceff499] backdrop-blur-lg", // Frosty glass effect
  //     border: "border-[#4c566a55]",          // Border color in line with theme
  //     text: "text-[#d8dee9]",               // Light text
  //     shadow: "shadow-md",
  //     highlight: "bg-gradient-to-br from-white/30 to-white/10", // More noticeable highlight
  //   },
  // },
  // gruvbox: {
  //   global: {
  //     bg: "bg-[#282828]",
  //     text: "text-[#ebdbb2]",
  //     textSecondary: "text-[#ebdbb260]",
  //     textPrimary: "text-[#ebdbb2]",
  //     brand: "#fabd2f",
  //     border: "border-[#3c3836]",
  //     secondary: "text-[#fe8019]",
  //   },
  //   hoverEffects: {
  //     btnHover: "hover:bg-[#3c3836]",
  //     textHover: "hover:bg-[#fabd2f21]",
  //     textBg: "bg-[#fabd2f31]",
  //   },
  //   priority: {
  //     low: "bg-blue-500/30 text-blue-300",
  //     medium: "bg-yellow-500/30 text-yellow-300",
  //     high: "bg-red-500/30 text-red-300",
  //     completed: "bg-green-500/30 text-green-300",
  //   },
  //   sidenav: {
  //     bg: "bg-[#3c3836]",
  //     text: "text-[#ebdbb2]",
  //     hover: "hover:bg-[#282828]",
  //     border: "border-[#fabd2f]",
  //   },
  //   kanban: {
  //     bg: "bg-[#3c3836]",
  //     text: "text-[#ebdbb2]",
  //     hover: "hover:bg-[#504945]",
  //   },
  //   kbHead: {
  //     bg: "bg-[#50494521]",
  //     text: "text-[#ebdbb2]",
  //   },
  //   glass: {
  //     bg: "bg-[#92837455] backdrop-blur-sm", // Warm frosted effect
  //     border: "border-[#92837455]",
  //     text: "text-[#ebdbb2]",               // Gruvbox light text
  //     shadow: "shadow-lg",
  //     highlight: "bg-gradient-to-br from-[#bd9e6a24] to-transparent", // Subtle highlight
  //   },
  // },
};
