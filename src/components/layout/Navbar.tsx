import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection, type SectionID } from "@/lib/scrollToSection";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-200 to-blue-300 shadow-lg">
              <span className="text-3xl animate-pulse">🌞</span>
            </div>
            <span className="text-xl font-bold text-gradient-primary">
              SmileAtWork
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {["inicio", "talleres", "productos", "servicios", "contacto"].map(
              (id) => (
                <button
                  key={id}
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => scrollToSection(id as SectionID)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ),
            )}
          </nav>

          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
            <Gift className="mr-2 h-4 w-4" />
            <a
              href="https://api.whatsapp.com/send?phone=51971049107&text=Hola%2C%20mi%20nombre%20es%20%5BNombre%20del%20padre%2Fmadre%5D%20y%20estoy%20interesado(a)%20en%20inscribir%20a%20mi%20hijo(a)%20en%20SmileAtWork%20%F0%9F%8F%AB.%0A%0A%F0%9F%91%B6%20Edad%3A%20%5B3-5%20años%5D%0A%F0%9F%93%9A%20Curso%3A%20Educación%20con%20pedagogía%20Waldorf%0A%0APor%20favor%2C%20%C2%BFpodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%20sobre%20inscripci%C3%B3n%20y%20horarios%3F%0A%0A%C2%A1Muchas%20gracias!%20%F0%9F%99%8F"
              target="_blank"
            >
              Inscribirse
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
