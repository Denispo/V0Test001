import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Implementace AI řešení od této společnosti výrazně zlepšila efektivitu našich procesů a pomohla nám lépe porozumět našim zákazníkům.",
    author: "Jana Nováková",
    position: "CEO, TechCorp s.r.o.",
    company: "/placeholder.svg?height=60&width=180",
  },
  {
    quote:
      "Profesionální přístup a expertíza v oblasti umělé inteligence nám pomohly transformovat náš zákaznický servis a zvýšit spokojenost klientů.",
    author: "Petr Svoboda",
    position: "CTO, DataSolutions a.s.",
    company: "/placeholder.svg?height=60&width=180",
  },
  {
    quote:
      "Díky implementaci AI řešení jsme dokázali automatizovat 70 % rutinních úkolů a naši zaměstnanci se nyní mohou věnovat kreativnějším činnostem.",
    author: "Martina Dvořáková",
    position: "COO, InnoTech s.r.o.",
    company: "/placeholder.svg?height=60&width=180",
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-blue-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Reference</h2>
          <p className="mt-4 text-lg text-blue-100">Co o nás říkají naši klienti</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 bg-black/50 backdrop-blur-md shadow-lg glow-border transition-all duration-300"
            >
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-blue-400/60 mb-4 glow-effect" />
                <p className="text-gray-200 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="font-semibold text-blue-100 glow-text transition-all duration-300">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                  </div>
                  <img
                    src={testimonial.company || "/placeholder.svg"}
                    alt="Logo společnosti"
                    className="h-8 w-auto grayscale opacity-70 glow-effect transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-center mb-12 text-blue-100">Důvěřují nám</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[...Array(6)].map((_, index) => (
              <img
                key={index}
                src={`/placeholder.svg?height=60&width=180`}
                alt={`Logo klienta ${index + 1}`}
                className="h-12 max-w-full grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 glow-effect-strong"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

