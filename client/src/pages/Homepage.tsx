"use client"

import { useState } from "react"
import { Theme, themes } from "../types/theme"
import { Navbar } from "../components/Navbar"

export default function StudyPlayground() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[1])

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""} ${currentTheme.background} ${currentTheme.text}`}>
      <div className="flex flex-col h-screen">
        <Navbar 
          currentTheme={currentTheme} 
          setCurrentTheme={setCurrentTheme}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        </div>
    </div>
  )
}

