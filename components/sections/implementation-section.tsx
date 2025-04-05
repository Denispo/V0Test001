import { Users, TrendingUp, Factory, FileText } from "lucide-react"

const implementations = [
  {
    title: "Zákaznický servis",
    description: "Implementace chatbotů a virtuálních asistentů pro zlepšení zákaznické zkušenosti a snížení nákladů.",
    icon: Users,
  },
  {
    title: "Marketing a prodej",
    description:
      "Využití AI pro personalizaci marketingových kampaní, predikci chování zákazníků a optimalizaci prodejních procesů.",
    icon: TrendingUp,
  },
  {
    title: "Výroba a logistika",
    description:
      "Optimalizace výrobních procesů, prediktivní údržba a efektivní řízení dodavatelského řetězce pomocí AI.",
    icon: Factory,
  },
  {
    title: "HR a administrativa",
    description: "Automatizace administrativních úkolů, efektivnější nábor zaměstnanců a analýza výkonnosti pomocí AI.",
    icon: FileText,
  },
]

export default function ImplementationSection() {
  return (
    <section id="implementation" className="py-24 bg-blue-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Implementace AI do firem</h2>
            <p className="mt-4 text-lg text-blue-100">
              Ukážeme vám, jak AI může transformovat vaše podnikání. Od automatizace rutinních úkolů po sofistikovanou
              analýzu dat, pomůžeme vám využít potenciál umělé inteligence na maximum.
            </p>

            <div className="mt-12 space-y-10">
              {implementations.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center glow-bg transition-all duration-300">
                      <item.icon className="h-6 w-6 text-blue-400 glow-effect" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-100 glow-text transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-black/30 backdrop-blur-sm p-4 glow-border transition-all duration-300">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="AI implementace v praxi"
                  className="w-full h-full object-cover rounded-lg glow-effect-strong"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-blue-500/5 rounded-full -z-10"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-blue-300/5 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

