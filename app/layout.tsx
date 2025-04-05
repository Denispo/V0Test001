import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import RobotHeadSimple from "@/components/robot-head-simple"

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "AI Solutions - Implementace umělé inteligence do firem",
  description: "Pomáháme firmám implementovat umělou inteligenci a transformovat jejich podnikání.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body className={`${inter.className} relative`}>
        {/* Pozadí s obrázkem */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-20"
          style={{ backgroundImage: "url(/images/blockchain-background.png)" }}
        />

        {/* Překrytí pro lepší čitelnost */}
        <div className="fixed inset-0 w-full h-full bg-black/50 -z-10" />

        {/* Jednoduchá hlava robota bez animovaných očí */}
        <RobotHeadSimple />

        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <div className="relative z-0">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'