export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Snadno implementujte <span className="text-blue-400">umělou inteligenci</span> do vaší firmy
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Zvyšte efektivitu, inovujte a získejte konkurenční výhodu s našimi řešeními na míru.
          </p>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Nabízíme komplexní služby od analýzy potřeb až po implementaci a správu AI řešení. Pomůžeme vám
            transformovat vaše podnikání s pomocí nejmodernějších technologií.
          </p>
        </div>

        {/* Hero image */}
        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-black/30 backdrop-blur-sm p-4">
            <img
              src="/placeholder.svg?height=720&width=1280"
              alt="AI implementace vizualizace"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

