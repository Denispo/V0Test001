"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, Minimize2 } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

type ChatInterfaceProps = {
  isVisible: boolean
  position: { x: number; y: number }
  onClose: () => void
}

export default function AiChatInterface({ isVisible, position, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Dobrý den, jak vám mohu pomoci s implementací AI do vaší firmy?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Automatické scrollování na konec chatu při nové zprávě
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Funkce pro odeslání zprávy
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Přidání zprávy uživatele
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulace odpovědi AI
    setIsTyping(true)
    setTimeout(
      () => {
        const aiResponses = [
          "Děkuji za váš dotaz. Naše AI řešení mohou výrazně zvýšit efektivitu vašich procesů.",
          "To je zajímavá otázka. Implementace AI do vašeho podnikání může přinést mnoho výhod.",
          "Rozumím vašemu požadavku. Rádi vám pomůžeme s analýzou a implementací vhodného AI řešení.",
          "Výborná otázka! Naši experti mají zkušenosti přesně s tímto typem implementace.",
          "Ano, to je možné. Naše AI řešení jsou navržena tak, aby se přizpůsobila vašim specifickým potřebám.",
        ]

        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          sender: "ai",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    ) // Náhodné zpoždění mezi 1-3 sekundami
  }

  if (!isVisible) return null

  // Výpočet pozice chatu relativně k pozici robota
  const chatPosition = {
    left: position.x - (isMinimized ? 0 : 320),
    top: position.y - 30,
  }

  return (
    <div
      className="fixed z-40 transition-all duration-300"
      style={{
        left: `${chatPosition.left}px`,
        top: `${chatPosition.top}px`,
        width: isMinimized ? "auto" : "300px",
        opacity: 0.95,
      }}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Otevřít chat"
        >
          <MessageSquare size={18} />
        </button>
      ) : (
        <div className="bg-black/70 backdrop-blur-md border border-blue-500/30 rounded-lg shadow-lg overflow-hidden flex flex-col glow-border">
          {/* Hlavička chatu */}
          <div className="bg-blue-900/50 px-3 py-2 flex justify-between items-center border-b border-blue-500/30">
            <h3 className="text-sm font-medium text-blue-100">AI Asistent</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-blue-300 hover:text-blue-100 transition-colors"
                aria-label="Minimalizovat chat"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={onClose}
                className="text-blue-300 hover:text-blue-100 transition-colors"
                aria-label="Zavřít chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Zprávy */}
          <div className="flex-1 overflow-y-auto p-3 max-h-[250px] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-lg ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-blue-900/40 text-blue-100"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-2">
                <div className="bg-blue-900/40 text-blue-100 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Vstupní pole */}
          <form onSubmit={handleSendMessage} className="p-2 border-t border-blue-500/30 flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Napište zprávu..."
              className="flex-1 bg-blue-900/20 text-white text-sm rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md px-3 py-1.5 transition-colors"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

