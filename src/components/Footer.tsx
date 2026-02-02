export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gold-gradient rounded-sm flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">M</span>
              </div>
              <div>
                <span className="text-white font-heading text-xl tracking-wide">MIGRONIS</span>
                <span className="block text-gold-400 text-[10px] tracking-[0.3em] uppercase">
                  Real Estate Brazil
                </span>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mt-4">
              Premium real estate solutions for international investors seeking
              opportunities in Brazil&apos;s most exclusive coastal destinations.
            </p>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wider uppercase text-sm">
              Properties
            </h4>
            <ul className="space-y-3">
              {["For Sale", "For Rent", "Investment", "New Developments", "Luxury Villas"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-white/30 hover:text-gold-400 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wider uppercase text-sm">
              Regions
            </h4>
            <ul className="space-y-3">
              {[
                "Florianópolis",
                "Balneário Camboriú",
                "Itapema",
                "Porto Belo",
                "Bombinhas",
                "Imbituba",
                "Rancho Queimado",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/30 hover:text-gold-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-4 tracking-wider uppercase text-sm">
              Company
            </h4>
            <ul className="space-y-3">
              {["About Migronis", "Our Team", "Investment Guide", "Blog", "Privacy Policy", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-white/30 hover:text-gold-400 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © 2026 Migronis Real Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Social icons */}
            {["Instagram", "LinkedIn", "YouTube", "Telegram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/20 hover:text-gold-400 text-xs tracking-wider uppercase transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
