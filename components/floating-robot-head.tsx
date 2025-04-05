"use client"

import { useEffect, useState } from "react"

export default function FloatingRobotHead() {
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
        <div
          className="relative w-16 md:w-24 h-16 md:h-24 glow-effect-strong floating-pulse rounded-full overflow-hidden"
          style={{
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
          }}
        >
          {/* Použití obrázku hlavy robota s oříznutím na hlavu */}
          <div className="w-full h-full relative">
            <img
              src="/images/ai-robot-head.png"
              alt="AI Robot Head"
              className="absolute top-0 left-0 w-full object-cover"
              style={{
                objectPosition: "center top",
                height: "150%",
                transform: "scale(1.2)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

