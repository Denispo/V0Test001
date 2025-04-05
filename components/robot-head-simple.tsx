"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import AiChatInterface from "./ai-chat-interface"

export default function RobotHeadSimple() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0, scrollY: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const robotFaceRef = useRef<HTMLDivElement>(null)

  // Detekce mobilního zařízení
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Inicializace pozice
  useEffect(() => {
    // Výchozí pozice na desktopu - vpravo uprostřed
    if (!isMobile) {
      setPosition({
        x: window.innerWidth - 100,
        y: window.innerHeight / 2,
      })
    } else {
      // Výchozí pozice na mobilu - dole uprostřed
      setPosition({
        x: window.innerWidth / 2 - 25,
        y: window.innerHeight - 100,
      })
    }
  }, [isMobile])

  // Funkce pro zahájení přetahování
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX: number, clientY: number

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    setIsDragging(true)
    setStartPosition({
      x: clientX - position.x,
      y: clientY - position.y,
      scrollY: window.scrollY,
    })
  }

  // Funkce pro přetahování
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    let clientX: number, clientY: number

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const newX = clientX - startPosition.x
    const newY = clientY - startPosition.y

    // Omezení pohybu v rámci okna
    const maxX = window.innerWidth - 60
    const maxY = window.innerHeight - 60
    const boundedX = Math.max(10, Math.min(newX, maxX))
    const boundedY = Math.max(10, Math.min(newY, maxY))

    setPosition({ x: boundedX, y: boundedY })

    // Posunování stránky při přetahování nahoru/dolů
    const scrollThreshold = 100 // Oblast u horního/dolního okraje pro aktivaci scrollu

    if (clientY < scrollThreshold) {
      // Scroll nahoru když je blízko horního okraje
      window.scrollBy(0, -10)
    } else if (clientY > window.innerHeight - scrollThreshold) {
      // Scroll dolů když je blízko dolního okraje
      window.scrollBy(0, 10)
    }

    // Posunování stránky na základě vertikálního pohybu
    const verticalDelta = newY - position.y
    if (Math.abs(verticalDelta) > 5) {
      // Minimální práh pro aktivaci scrollu
      window.scrollBy(0, verticalDelta)
    }
  }

  // Funkce pro ukončení přetahování
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Přidání a odebrání event listenerů pro přetahování
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchmove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchend", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, position])

  // Funkce pro skrytí/zobrazení AI Brain
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
    if (!isVisible) {
      setIsChatOpen(false)
    }
  }

  // Funkce pro otevření/zavření chatu
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <>
      {/* Chatovací rozhraní */}
      <AiChatInterface isVisible={isChatOpen && isVisible} position={position} onClose={() => setIsChatOpen(false)} />

      {/* Hlavní přetažitelný prvek */}
      <div
        ref={containerRef}
        className={`fixed z-50 transition-transform ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `scale(${isDragging ? 1.1 : 1})`,
          opacity: isVisible ? 1 : 0.3,
          transition: isDragging ? "none" : "all 0.3s ease",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div
          ref={robotFaceRef}
          className={`relative ${isMobile ? "w-16 h-16" : "w-20 h-20"} glow-effect-strong floating-pulse rounded-full overflow-hidden`}
          style={{
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            boxShadow: isDragging ? "0 0 25px rgba(59, 130, 246, 0.9)" : "0 0 15px rgba(59, 130, 246, 0.7)",
          }}
          onClick={toggleChat}
        >
          {/* Obrázek hlavy robota - pouze původní obrázek bez přidaných očí */}
          <div className="w-full h-full relative">
            <img
              src="/images/ai-robot-head.png"
              alt="AI Robot Head"
              className="absolute top-0 left-0 w-full object-cover select-none"
              style={{
                objectPosition: "center top",
                height: "150%",
                transform: "scale(1.2)",
              }}
              draggable="false"
            />
          </div>

          {/* Indikátor přetažitelnosti */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-500 rounded-full opacity-70 animate-pulse" />

          {/* Indikátor chatu */}
          {isChatOpen && <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse" />}
        </div>
      </div>

      {/* Tlačítko pro skrytí/zobrazení */}
      <button
        className="fixed bottom-4 right-4 z-50 bg-black/50 text-blue-400 p-2 rounded-full backdrop-blur-sm border border-blue-500/30 hover:bg-black/70"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Skrýt AI asistenta" : "Zobrazit AI asistenta"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isVisible ? (
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24m-4.24-4.24a3 3 0 0 1 4.24 4.24m-4.24-4.24 4.24 4.24M3 3l18 18M10.93 6.93A6 6 0 0 1 12 6c3.31 0 6 2.69 6 6 0 .34-.03.67-.09 1m-3.6-3.6A3 3 0 0 0 9.6 14.4" />
          ) : (
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          )}
        </svg>
      </button>
    </>
  )
}

