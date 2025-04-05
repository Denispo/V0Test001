"use client"

import { useEffect, useRef } from "react"

// Tato komponenta slouží pouze k jednorázovému oříznutí obrázku hlavy robota
// a není určena k použití v produkci
export default function RobotHeadCropper() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/robot-3310190_1280.jpg-UUDx6xGO6Hca4mf0SQ6fAOb0AigBYn.jpeg"

    img.onload = () => {
      // Nastavení velikosti plátna
      canvas.width = 300
      canvas.height = 300

      // Vykreslení pouze hlavy robota
      // Souřadnice jsou přibližné a mohou vyžadovat úpravu
      ctx.drawImage(
        img,
        // Zdrojové souřadnice (x, y, šířka, výška)
        img.width * 0.3,
        img.height * 0.05,
        img.width * 0.4,
        img.height * 0.25,
        // Cílové souřadnice (x, y, šířka, výška)
        0,
        0,
        canvas.width,
        canvas.height,
      )

      // Přidání modrého záření
      ctx.shadowColor = "rgba(59, 130, 246, 0.8)"
      ctx.shadowBlur = 20
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)"
      ctx.lineWidth = 5
      ctx.strokeRect(0, 0, canvas.width, canvas.height)

      // Zobrazení URL obrázku v konzoli pro možné stažení
      console.log(canvas.toDataURL("image/png"))
    }
  }, [])

  return (
    <div className="hidden">
      <canvas ref={canvasRef} />
    </div>
  )
}

