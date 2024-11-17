export const themes = {
  light: {
    bg: "bg-white",
    text: "text-black",
    textSecondary: "text-black/30",
    primary: "text-green-500",
    border: "border-zinc-300",
    secondary: "text-gray-500",

    // Hovers
    btnHover: "hover:bg-zinc-200",
    textHover: "hover:bg-[#35aa7931]",
    textBg: "bg-[#35aa7931]",

    priority: {
      low: "bg-blue-200/60 text-blue-800",     // Softer blue with reduced opacity
      medium: "bg-yellow-200/60 text-yellow-800", // Light yellow with reduced opacity
      high: "bg-red-200/60 text-red-800",       // Lighter red, semi-transparent
      completed: "bg-green-200/60 text-green-800"  // Light green, transparent
    }
  },
  dark: {
    bg: "bg-zinc-900",
    text: "text-white",
    textSecondary: "text-white/30",
    primary: "text-green-400",
    border: "border-zinc-700",
    secondary: "text-gray-400",

    // Hovers
    btnHover: "hover:bg-zinc-800",
    textHover: "hover:bg-[#35aa7931]",
    textBg: "bg-[#35aa7931]",

    priority: {
      low: "bg-blue-400/30 text-blue-300",      // Darker blue, semi-transparent
      medium: "bg-yellow-400/30 text-yellow-300", // Muted yellow, reduced opacity
      high: "bg-red-400/30 text-red-300",       // Muted red for dark theme
      completed: "bg-green-400/30 text-green-300" // Softer green for completed
    }
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
      low: "bg-blue-300/50 text-blue-600",      // Muted blue for solarized
      medium: "bg-yellow-300/50 text-yellow-700", // Softer yellow
      high: "bg-red-300/50 text-red-700",       // Slightly transparent red
      completed: "bg-green-300/50 text-green-700" // Softer green
    }
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
      low: "bg-blue-500/30 text-blue-300",      // Deeper blue for low priority
      medium: "bg-yellow-500/30 text-yellow-300", // Softer yellow
      high: "bg-red-500/30 text-red-400",       // Transparent red
      completed: "bg-green-500/30 text-green-300" // Muted green
    }
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
      low: "bg-blue-300/40 text-blue-200",      // Softened blue for low
      medium: "bg-yellow-300/40 text-yellow-200", // Softer yellow
      high: "bg-red-300/40 text-red-200",       // Transparent red
      completed: "bg-green-300/40 text-green-200" // Transparent green
    }
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
      low: "bg-blue-200/60 text-blue-700",      // Light pastel blue for low
      medium: "bg-yellow-200/60 text-yellow-700", // Soft yellow for medium
      high: "bg-red-200/60 text-red-700",       // Light red for high
      completed: "bg-green-200/60 text-green-700" // Soft green for completed
    }
  },

  blackWhite: {
    // bg: "bg-[#fdf4e0]",             // Pure white background
    bg: "bg-[#ebebeb]",
    text: "text-black",         // Pure black text
    textSecondary: "text-black/30",         // Pure black text
    primary: "black",      // Black for primary emphasis
    secondary: "text-zinc-900", // Dark gray for secondary, minimal contrast
    border: "border-black",     // Black border for clear contrast

    // Hovers
    btnHover: "hover:bg-zinc-200", // Dark gray hover for buttons
    textHover: "hover:bg-gray-200", // Light gray for text hover
    textBg: "bg-black text-white",         // Subtle light gray background for selected text

    priority: {
      low: "bg-white text-black border border-black",   // White background with black text and border
      medium: "bg-gray-200 text-black border border-black", // Light gray background for moderate emphasis
      high: "bg-gray-700 text-white border border-black",   // Dark gray with white text for high emphasis
      completed: "bg-black text-white border border-black"  // Black background with white text for completed tasks
    }
  },

};
