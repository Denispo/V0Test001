import Link from "next/link"
import { Brain, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-400 glow-effect" />
              <span className="text-xl font-bold glow-text transition-all duration-300">AI Solutions</span>
            </div>
            <p className="text-gray-400">
              Pomáháme firmám implementovat umělou inteligenci a transformovat jejich podnikání.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-blue-300">Navigace</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-blue-300 transition-colors glow-text">
                  Naše služby
                </a>
              </li>
              <li>
                <a href="#implementation" className="text-gray-400 hover:text-blue-300 transition-colors glow-text">
                  Implementace AI
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-blue-300 transition-colors glow-text">
                  O nás
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-blue-300 transition-colors glow-text">
                  Reference
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-blue-300 transition-colors glow-text">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-blue-300">Kontakt</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>AI Solutions s.r.o.</p>
              <p>Technologická 1, 150 00 Praha 5</p>
              <p>+420 123 456 789</p>
              <p>info@aisolutions.cz</p>
            </address>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-blue-300">Sledujte nás</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6 glow-effect" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6 glow-effect" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6 glow-effect" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6 glow-effect" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} AI Solutions s.r.o. Všechna práva vyhrazena.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-blue-300 transition-colors glow-text">
              Ochrana osobních údajů
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-300 transition-colors glow-text">
              Podmínky použití
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

