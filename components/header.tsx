"use client"

import { useState } from "react"
import Link from "next/link"
import { Brain, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Naše služby", href: "#services" },
  { name: "Implementace AI do firem", href: "#implementation" },
  { name: "O nás", href: "#about" },
  { name: "Reference", href: "#testimonials" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-black/50 backdrop-blur-md z-50 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-400 glow-effect" />
            <span className="text-xl font-bold text-white glow-text transition-all duration-300">AI Solutions</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 glow-effect"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Otevřít hlavní menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-300 hover:text-blue-300 transition-colors glow-text"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            className="bg-blue-600 hover:bg-blue-700 glow-effect-strong transition-all duration-300"
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Kontaktujte nás
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/70" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black/90 backdrop-blur-md px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-400 glow-effect" />
              <span className="text-xl font-bold text-white glow-text transition-all duration-300">AI Solutions</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-300 glow-effect"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Zavřít menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-blue-900/20 glow-text"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 glow-effect-strong transition-all duration-300"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Kontaktujte nás
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

