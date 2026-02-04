import {
  Calendar,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scrollToSection";

export default function Foooter() {
  return (
    <footer
      id="contacto"
      className="bg-gradient-to-r from-primary/10 to-accent/10 border-t"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-gradient-primary">
                SmileAtWork
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Educación inicial inspirada en la pedagogía Waldorf para
              desarrollar el potencial único de cada niño.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <a href="https://www.instagram.com/smile_atwork?igsh=dXRidnY2ODBheXlt" target="_blank" rel="noreferrer">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>
              <Button
                size="sm"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Servicios</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => scrollToSection("talleres")}
                  className="hover:text-primary transition-colors text-left"
                >
                  Talleres Educativos
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("productos")}
                  className="hover:text-primary transition-colors text-left"
                >
                  Materiales Waldorf
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="hover:text-primary transition-colors text-left"
                >
                  Planificación Curricular
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="hover:text-primary transition-colors text-left"
                >
                  Asesoramiento Parental
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Horarios</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Lunes a Viernes: 8:00 - 17:00
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Sábados: 9:00 - 12:00
              </li>
              <li className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Consultas previas
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +51 947841499
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                smileatworkcompany@gmail.com
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Nuevo Chimbote, Perú
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; 2026 SmileAtWork. Todos los derechos reservados. Hecho con ❤️
            para los niños del Perú.
          </p>
        </div>
      </div>
    </footer>
  );
}
