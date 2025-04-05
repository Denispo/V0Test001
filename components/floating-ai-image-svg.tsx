"use client"

import { useEffect, useState } from "react"

export default function FloatingAiImageSvg() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    // Výpočet maximální hodnoty scrollu (výška dokumentu - výška okna)
    const calculateMaxScroll = () => {
      const docHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      setMaxScroll(docHeight - windowHeight)
    }

    // Aktualizace pozice scrollu
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    // Přidání event listenerů
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", calculateMaxScroll)

    // Inicializace
    calculateMaxScroll()
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", calculateMaxScroll)
    }
  }, [])

  // Výpočet pozice obrázku v závislosti na scrollu
  const calculatePosition = () => {
    if (maxScroll <= 0) return 0

    // Rozsah pohybu (v procentech výšky viewportu)
    const movementRange = 60

    // Převod scrollPosition na procenta (0-100)
    const scrollPercentage = (scrollPosition / maxScroll) * 100

    // Mapování scrollPercentage na pozici v rámci movementRange
    return (scrollPercentage * movementRange) / 100
  }

  const imagePosition = calculatePosition()

  return (
    <div className="fixed right-0 top-0 h-full w-16 md:w-24 z-40 pointer-events-none hidden md:block">
      <div
        className="absolute transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(${imagePosition}vh)`,
          top: "20vh", // Počáteční pozice
        }}
      >
        <div className="relative w-16 md:w-24 h-16 md:h-24 glow-effect-strong floating-pulse">
          {/* SVG obrázek přímo v komponentě */}
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <circle cx="50" cy="50" r="40" fill="#0f172a" />
            <path
              d="M50 10 C70 20, 80 40, 70 60 C60 80, 40 80, 30 60 C20 40, 30 20, 50 10"
              fill="#3b82f6"
              opacity="0.7"
            />
            <circle cx="40" cy="40" r="5" fill="#60a5fa" />
            <circle cx="60" cy="40" r="5" fill="#60a5fa" />
            <path d="M35 60 Q50 70, 65 60" stroke="#60a5fa" strokeWidth="2" fill="transparent" />
            <path d="M25 30 L35 35 M75 30 L65 35" stroke="#60a5fa" strokeWidth="2" />
            <path
              d="M30 20 Q50 10, 70 20 Q80 40, 70 60 Q50 80, 30 60 Q20 40, 30 20"
              stroke="#93c5fd"
              strokeWidth="1"
              fill="transparent"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

