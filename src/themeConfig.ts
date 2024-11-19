export const themes = {
  light: {
    bg: "bg-white",
    text: "text-black",
    textSecondary: "text-black/30",
    primary: "green-500",
    border: "border-zinc-300",
    secondary: "text-gray-500",

    // Hovers
    btnHover: "hover:bg-zinc-200",
    textHover: "hover:bg-[#35aa7931]",
    textBg: "bg-[#35aa7931]",

    priority: {
      low: "bg-blue-200/60 text-blue-800",
      medium: "bg-yellow-200/60 text-yellow-800",
      high: "bg-red-200/60 text-red-800",
      completed: "bg-green-200/60 text-green-800",
    },

    sidenav: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      hover: "hover:bg-gray-200",
      border: "border-gray-300",
    },
  },

  dark: {
    bg: "bg-zinc-900",
    text: "text-white",
    textSecondary: "text-white/30",
    primary: "green-400",
    border: "border-zinc-700",
    secondary: "text-gray-400",

    // Hovers
    btnHover: "hover:bg-zinc-800",
    textHover: "hover:bg-[#35aa7931]",
    textBg: "bg-[#35aa7931]",

    priority: {
      low: "bg-blue-400/30 text-blue-300",
      medium: "bg-yellow-400/30 text-yellow-300",
      high: "bg-red-400/30 text-red-300",
      completed: "bg-green-400/30 text-green-300",
    },

    sidenav: {
      bg: "bg-zinc-800",
      text: "text-gray-200",
      hover: "hover:bg-zinc-700",
      border: "border-zinc-700",
    },
  },

  solarized: {
    bg: "bg-[#fdf6e3]",
    text: "text-[#657b83]",
    textSecondary: "text-[#657b8360]",
    primary: "#b58900",
    secondary: "text-[#268bd2]",
    border: "border-[#657b83]",

    // Hovers
    btnHover: "hover:bg-[#657b8321]",
    textHover: "hover:bg-[#35aa7931]",
    textBg: "bg-[#35aa7931]",

    priority: {
      low: "bg-blue-300/50 text-blue-600",
      medium: "bg-yellow-300/50 text-yellow-700",
      high: "bg-red-300/50 text-red-700",
      completed: "bg-green-300/50 text-green-700",
    },

    sidenav: {
      bg: "bg-[#eee8d5]",
      text: "text-[#657b83]",
      hover: "hover:bg-[#fdf6e3]",
      border: "border-[#93a1a1]",
    },
  },

  dracula: {
    bg: "bg-[#282a36]",
    text: "text-[#f8f8f2]",
    textSecondary: "text-[#f8f8f260]",
    primary: "#bd93f9",
    secondary: "text-[#ff79c6]",
    border: "border-[#44475a]",

    // Hovers
    btnHover: "hover:bg-[#44475a]",
    textHover: "hover:bg-[#6272a421]",
    textBg: "bg-[#6272a4]",

    priority: {
      low: "bg-blue-500/30 text-blue-300",
      medium: "bg-yellow-500/30 text-yellow-300",
      high: "bg-red-500/30 text-red-400",
      completed: "bg-green-500/30 text-green-300",
    },

    sidenav: {
      bg: "bg-[#44475a]",
      text: "text-[#f8f8f2]",
      hover: "hover:bg-[#282a36]",
      border: "border-[#bd93f9]",
    },
  },

  monokai: {
    bg: "bg-[#272822]",
    text: "text-[#f8f8f2]",
    textSecondary: "text-[#f8f8f260]",
    primary: "#f92672",
    secondary: "text-[#a6e22e]",
    border: "border-[#75715e]",

    // Hovers
    btnHover: "hover:bg-[#3e3d32]",
    textHover: "hover:bg-[#49483e]",
    textBg: "bg-[#49483e]",

    priority: {
      low: "bg-blue-300/40 text-blue-200",
      medium: "bg-yellow-300/40 text-yellow-200",
      high: "bg-red-300/40 text-red-200",
      completed: "bg-green-300/40 text-green-200",
    },

    sidenav: {
      bg: "bg-[#49483e]",
      text: "text-[#f8f8f2]",
      hover: "hover:bg-[#3e3d32]",
      border: "border-[#a59f85]",
    },
  },

  pastel: {
    bg: "bg-[#fef3e3]",
    text: "text-[#4b4b4b]",
    textSecondary: "text-[#4b4b4b60]",
    primary: "#ffadad",
    secondary: "text-[#ffd6a5]",
    border: "border-[#ffd1dc]",

    // Hovers
    btnHover: "hover:bg-[#fff0e1]",
    textHover: "hover:bg-[#ffcad4]",
    textBg: "bg-[#ffcad4]",

    priority: {
      low: "bg-blue-200/60 text-blue-700",
      medium: "bg-yellow-200/60 text-yellow-700",
      high: "bg-red-200/60 text-red-700",
      completed: "bg-green-200/60 text-green-700",
    },

    sidenav: {
      bg: "bg-[#fff0e1]",
      text: "text-[#4b4b4b]",
      hover: "hover:bg-[#fef3e3]",
      border: "border-[#ffd1dc]",
    },
  },

  blackWhite: {
    bg: "bg-[#ebebeb]",
    text: "text-black",
    textSecondary: "text-black/30",
    primary: "black",
    secondary: "text-zinc-900",
    border: "border-black",

    // Hovers
    btnHover: "hover:bg-zinc-200",
    textHover: "hover:bg-gray-200",
    textBg: "bg-black text-white",

    priority: {
      low: "bg-white text-black border border-black",
      medium: "bg-gray-200 text-black border border-black",
      high: "bg-gray-700 text-white border border-black",
      completed: "bg-black text-white border border-black",
    },

    sidenav: {
      bg: "bg-white",
      text: "text-black",
      hover: "hover:bg-gray-200",
      border: "border-black",
    },
  },
};
