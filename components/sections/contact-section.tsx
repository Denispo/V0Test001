"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Send } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulace odeslání formuláře
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      })

      // Reset formuláře po 5 sekundách
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-24 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Kontakt</h2>
          <p className="mt-4 text-lg text-blue-100">
            Máte zájem o implementaci AI do vaší firmy? Neváhejte nás kontaktovat.
          </p>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-8 glow-border transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-blue-100 glow-text transition-all duration-300">
                Kontaktní informace
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center glow-bg transition-all duration-300">
                      <MapPin className="h-5 w-5 text-blue-400 glow-effect" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-blue-100 glow-text transition-all duration-300">Adresa</h4>
                    <p className="mt-1 text-gray-300">
                      AI Solutions s.r.o.
                      <br />
                      Technologická 1<br />
                      150 00 Praha 5
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center glow-bg transition-all duration-300">
                      <Phone className="h-5 w-5 text-blue-400 glow-effect" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-blue-100 glow-text transition-all duration-300">Telefon</h4>
                    <p className="mt-1 text-gray-300">+420 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center glow-bg transition-all duration-300">
                      <Mail className="h-5 w-5 text-blue-400 glow-effect" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-blue-100 glow-text transition-all duration-300">E-mail</h4>
                    <p className="mt-1 text-gray-300">info@aisolutions.cz</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-blue-100 glow-text transition-all duration-300 mb-4">
                  Kde nás najdete
                </h4>
                <div className="aspect-[16/9] bg-black/30 rounded-lg overflow-hidden glow-border transition-all duration-300">
                  {/* Zde by byla mapa, pro ukázku používáme placeholder */}
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Mapa s polohou firmy"
                    className="w-full h-full object-cover glow-effect-strong"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-8 glow-border transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-blue-100 glow-text transition-all duration-300">
                Napište nám
              </h3>

              {isSubmitted ? (
                <div className="bg-green-900/50 border border-green-500/30 rounded-lg p-6 text-center glow-border">
                  <h4 className="text-xl font-medium text-green-300 mb-2 glow-text">Děkujeme za vaši zprávu!</h4>
                  <p className="text-green-200">Brzy se vám ozveme.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-blue-100 glow-text">
                        Jméno a příjmení
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-black/30 border-blue-900/50 text-white glow-border transition-all duration-300 focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-blue-100 glow-text">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-black/30 border-blue-900/50 text-white glow-border transition-all duration-300 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-blue-100 glow-text">
                      Společnost
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-black/30 border-blue-900/50 text-white glow-border transition-all duration-300 focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-blue-100 glow-text">
                      Zpráva
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-black/30 border-blue-900/50 text-white glow-border transition-all duration-300 focus:border-blue-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 glow-effect-strong transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Odesílání...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Odeslat zprávu <Send className="ml-2 h-4 w-4 glow-effect" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

