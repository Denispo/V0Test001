import { Brain, Code, Cog, Lightbulb, BarChart3, Bot, Workflow } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Analýza a konzultace",
    description: "Komplexní analýza vašich procesů a identifikace příležitostí pro implementaci AI.",
    icon: Lightbulb,
  },
  {
    title: "Vývoj AI řešení na míru",
    description: "Vytváříme AI řešení přesně podle vašich potřeb a požadavků.",
    icon: Brain,
  },
  {
    title: "Integrace AI do stávajících systémů",
    description: "Bezproblémová integrace AI technologií do vašich existujících systémů a procesů.",
    icon: Code,
  },
  {
    title: "Školení a podpora",
    description: "Komplexní školení vašich zaměstnanců a kontinuální podpora po implementaci.",
    icon: Cog,
  },
  {
    title: "Automatizace procesů",
    description: "Automatizace rutinních a opakujících se úkolů pomocí AI pro zvýšení efektivity.",
    icon: Workflow,
  },
  {
    title: "Prediktivní analýza",
    description: "Využití AI pro analýzu dat a predikci budoucích trendů a událostí.",
    icon: BarChart3,
  },
  {
    title: "Chatboti a virtuální asistenti",
    description: "Vývoj inteligentních chatbotů a virtuálních asistentů pro zlepšení zákaznické zkušenosti.",
    icon: Bot,
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Naše služby</h2>
          <p className="mt-4 text-xl text-blue-100">
            Komplexní portfolio služeb pro implementaci umělé inteligence do vaší firmy
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-0 bg-black/50 backdrop-blur-md text-white hover:bg-black/60 transition-all duration-300 glow-border"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 glow-bg transition-all duration-300">
                  <service.icon className="h-6 w-6 text-blue-400 glow-effect" />
                </div>
                <CardTitle className="text-xl text-blue-100 glow-text transition-all duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

