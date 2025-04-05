"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

export default function InteractiveRobotHead() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0, scrollY: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 })
  const [isBlinking, setIsBlinking] = useState(false)
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

  // Funkce pro sledování kurzoru myši očima
  const handleMouseMoveEyes = (e: MouseEvent) => {
    if (isDragging || !robotFaceRef.current) return

    const rect = robotFaceRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Výpočet úhlu mezi středem obličeje a kurzorem
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)

    // Omezení pohybu očí (max 20% od středu)
    const maxDistance = 20
    const distance = Math.min(
      Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)),
      rect.width,
    )
    const normalizedDistance = Math.min((distance / rect.width) * maxDistance, maxDistance)

    // Výpočet nové pozice očí
    const eyeX = 50 + Math.cos(angle) * normalizedDistance
    const eyeY = 50 + Math.sin(angle) * normalizedDistance

    setEyePosition({ x: eyeX, y: eyeY })
  }

  // Přidání event listeneru pro sledování kurzoru
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMoveEyes)

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveEyes)
    }
  }, [isDragging])

  // Funkce pro náhodné mrkání
  useEffect(() => {
    const blinkRandomly = () => {
      // Náhodný interval mezi mrknutími (2-8 sekund)
      const nextBlinkTime = 2000 + Math.random() * 6000

      setTimeout(() => {
        if (!isDragging) {
          setIsBlinking(true)

          // Doba trvání mrknutí (100-300ms)
          setTimeout(
            () => {
              setIsBlinking(false)
              blinkRandomly()
            },
            100 + Math.random() * 200,
          )
        } else {
          blinkRandomly()
        }
      }, nextBlinkTime)
    }

    blinkRandomly()

    return () => {
      // Cleanup
    }
  }, [isDragging])

  // Funkce pro skrytí/zobrazení AI Brain
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
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
        >
          {/* Obrázek hlavy robota s průhledností pro oči */}
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

            {/* Animované oči - přesně umístěné podle obrázku */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Levé oko */}
              <div
                className="absolute rounded-full"
                style={{
                  width: isMobile ? "14%" : "12%",
                  height: isMobile ? "14%" : "12%",
                  left: "35%",
                  top: "28%",
                  transform: `translate(${eyePosition.x - 50}%, ${eyePosition.y - 50}%)`,
                  transition: "transform 0.1s ease-out",
                  opacity: isBlinking ? 0.2 : 1,
                  background: "rgba(96, 165, 250, 0.9)",
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.8) inset, 0 0 5px rgba(59, 130, 246, 0.8)",
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "60%",
                    height: "60%",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(30, 64, 175, 0.9)",
                    boxShadow: "0 0 5px rgba(30, 64, 175, 0.8) inset",
                  }}
                />
              </div>

              {/* Pravé oko */}
              <div
                className="absolute rounded-full"
                style={{
                  width: isMobile ? "14%" : "12%",
                  height: isMobile ? "14%" : "12%",
                  right: "35%",
                  top: "28%",
                  transform: `translate(${-(eyePosition.x - 50)}%, ${eyePosition.y - 50}%)`,
                  transition: "transform 0.1s ease-out",
                  opacity: isBlinking ? 0.2 : 1,
                  background: "rgba(96, 165, 250, 0.9)",
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.8) inset, 0 0 5px rgba(59, 130, 246, 0.8)",
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "60%",
                    height: "60%",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(30, 64, 175, 0.9)",
                    boxShadow: "0 0 5px rgba(30, 64, 175, 0.8) inset",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Indikátor přetažitelnosti */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-500 rounded-full opacity-70 animate-pulse" />
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

