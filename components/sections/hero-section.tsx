import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-[10%] right-[20%] w-[35%] h-[35%] rounded-full bg-purple-200/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Snadno implementujte <span className="text-primary">umělou inteligenci</span> do vaší firmy
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Zvyšte efektivitu, inovujte a získejte konkurenční výhodu s našimi řešeními na míru.
          </p>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Nabízíme komplexní služby od analýzy potřeb až po implementaci a správu AI řešení. Pomůžeme vám
            transformovat vaše podnikání s pomocí nejmodernějších technologií.
          </p>

          <div className="mt-10">
            <Button size="lg" className="text-lg px-8 py-6">
              Zjistit více <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/placeholder.svg?height=720&width=1280"
              alt="AI implementace vizualizace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

