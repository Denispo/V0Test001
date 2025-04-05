import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamMembers = [
  {
    name: "Jan Novák",
    role: "CEO & Zakladatel",
    image: "/placeholder.svg?height=200&width=200",
    initials: "JN",
  },
  {
    name: "Petra Svobodová",
    role: "CTO",
    image: "/placeholder.svg?height=200&width=200",
    initials: "PS",
  },
  {
    name: "Martin Dvořák",
    role: "Vedoucí AI výzkumu",
    image: "/placeholder.svg?height=200&width=200",
    initials: "MD",
  },
  {
    name: "Lucie Černá",
    role: "Vedoucí implementací",
    image: "/placeholder.svg?height=200&width=200",
    initials: "LČ",
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">O nás</h2>
          <p className="mt-6 text-lg text-gray-300">
            Jsme tým odborníků s vášní pro umělou inteligenci. Pomáháme firmám z různých odvětví s implementací AI
            řešení na míru. Naším cílem je pomoci firmám využít potenciál umělé inteligence k dosažení lepších výsledků
            a konkurenční výhody.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-12 text-blue-100">Náš tým</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <Avatar className="w-32 h-32 mx-auto border-2 border-blue-400 glow-border transition-all duration-300">
                  <AvatarImage src={member.image} alt={member.name} className="glow-effect-strong" />
                  <AvatarFallback className="text-2xl bg-blue-900 text-blue-100 glow-effect">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h4 className="mt-4 text-xl font-semibold text-blue-100 glow-text transition-all duration-300">
                  {member.name}
                </h4>
                <p className="text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-black/60 backdrop-blur-md rounded-2xl p-8 md:p-12 glow-border transition-all duration-300">
          <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-blue-100 glow-text transition-all duration-300">Naše mise</h3>
              <p className="mt-4 text-gray-300">
                Naší misí je demokratizovat přístup k umělé inteligenci a pomoci firmám všech velikostí využít její
                potenciál. Věříme, že AI může transformovat podnikání a přinést významnou konkurenční výhodu těm, kteří
                ji dokáží efektivně implementovat.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <h3 className="text-2xl font-semibold text-blue-100 glow-text transition-all duration-300">
                Naše hodnoty
              </h3>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Inovace a neustálé zlepšování</li>
                <li>• Kvalita a spolehlivost</li>
                <li>• Transparentnost a etický přístup</li>
                <li>• Orientace na výsledky klientů</li>
                <li>• Spolupráce a sdílení znalostí</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

