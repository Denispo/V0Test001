"use client"

import { useEffect, useState } from "react"

export default function FloatingAiImage() {
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
          {/* Použití obrázku hlavy robota */}
          <img
            src="/images/ai-robot-head.png"
            alt="AI Robot Head"
            className="w-full h-auto object-contain rounded-full"
            style={{
              objectPosition: "top",
              objectFit: "cover",
              background: "rgba(0,0,0,0.2)",
              backdropFilter: "blur(5px)",
              padding: "2px",
            }}
          />
        </div>
      </div>
    </div>
  )
}

