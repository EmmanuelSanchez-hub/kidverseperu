import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Users,
  CheckCircle,
  ArrowLeft,
  Heart,
  Star,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AgendarReunion() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    centroEducativo: "",
    tipoServicio: "",
    fechaPreferida: "",
    horaPreferida: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const servicios = [
    "Talleres Educativos",
    "Planificación Curricular Creativa",
    "Guardería a Domicilio",
    "Asesoramiento Parental",
    "Venta de Materiales",
    "Consultoría Integral",
  ];

  const horariosDisponibles = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        {/* Header */}
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

              <Link to="/">
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white mx-auto">
                <CheckCircle className="h-10 w-10" />
              </div>

              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                  ¡Reunión Agendada!
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold text-gradient-primary">
                  Gracias por contactarnos
                </h1>
                <p className="text-lg text-muted-foreground">
                  Hemos recibido tu solicitud de reunión. Nos comunicaremos
                  contigo pronto para confirmar los detalles.
                </p>
              </div>

              <Card className="shadow-playful">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Resumen de tu Solicitud
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nombre</p>
                      <p className="font-medium">{formData.nombre}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-medium">{formData.telefono}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Servicio de Interés
                      </p>
                      <p className="font-medium">{formData.tipoServicio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Fecha Preferida
                      </p>
                      <p className="font-medium">{formData.fechaPreferida}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Hora Preferida
                      </p>
                      <p className="font-medium">{formData.horaPreferida}</p>
                    </div>
                  </div>
                  {formData.mensaje && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Mensaje Adicional
                      </p>
                      <p className="font-medium">{formData.mensaje}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Mientras esperas, ¿quieres conocer más sobre nuestros
                  servicios?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/home">
                    <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      Ver Talleres
                    </Button>
                  </Link>
                  <Link to="/home">
                    <Button
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Ver Productos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
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

            <Link to="/">
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center space-y-4 mb-12">
              <Badge className="bg-accent text-accent-foreground">
                Agendar Reunión
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-bold text-gradient-primary">
                Conectemos por el Bienestar de los Niños
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Agenda una reunión personalizada con nuestros especialistas en
                educación Waldorf. Te ayudaremos a encontrar la mejor solución
                para tus necesidades educativas.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <Card className="shadow-playful">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Formulario de Reunión
                    </CardTitle>
                    <CardDescription>
                      Completa el formulario y nos contactaremos pronto para
                      confirmar tu reunión.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Información Personal */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <Users className="mr-2 h-4 w-4 text-primary" />
                          Información Personal
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre Completo *</Label>
                            <Input
                              id="nombre"
                              value={formData.nombre}
                              onChange={(e) =>
                                handleInputChange("nombre", e.target.value)
                              }
                              placeholder="Tu nombre completo"
                              required
                              className="border-2 border-muted focus:border-primary"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              placeholder="tu@email.com"
                              required
                              className="border-2 border-muted focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono *</Label>
                            <Input
                              id="telefono"
                              value={formData.telefono}
                              onChange={(e) =>
                                handleInputChange("telefono", e.target.value)
                              }
                              placeholder="+51 123 456 789"
                              required
                              className="border-2 border-muted focus:border-primary"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="centroEducativo">
                              Centro Educativo (opcional)
                            </Label>
                            <Input
                              id="centroEducativo"
                              value={formData.centroEducativo}
                              onChange={(e) =>
                                handleInputChange(
                                  "centroEducativo",
                                  e.target.value,
                                )
                              }
                              placeholder="Nombre de tu centro educativo"
                              className="border-2 border-muted focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Detalles de la Reunión */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-primary" />
                          Detalles de la Reunión
                        </h3>

                        <div className="space-y-2">
                          <Label htmlFor="tipoServicio">
                            Servicio de Interés *
                          </Label>
                          <Select
                            value={formData.tipoServicio}
                            onValueChange={(value) =>
                              handleInputChange("tipoServicio", value)
                            }
                          >
                            <SelectTrigger className="border-2 border-muted focus:border-primary">
                              <SelectValue placeholder="Selecciona un servicio" />
                            </SelectTrigger>
                            <SelectContent>
                              {servicios.map((servicio) => (
                                <SelectItem key={servicio} value={servicio}>
                                  {servicio}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fechaPreferida">
                              Fecha Preferida *
                            </Label>
                            <Input
                              id="fechaPreferida"
                              type="date"
                              value={formData.fechaPreferida}
                              onChange={(e) =>
                                handleInputChange(
                                  "fechaPreferida",
                                  e.target.value,
                                )
                              }
                              min={new Date().toISOString().split("T")[0]}
                              required
                              className="border-2 border-muted focus:border-primary"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="horaPreferida">
                              Hora Preferida *
                            </Label>
                            <Select
                              value={formData.horaPreferida}
                              onValueChange={(value) =>
                                handleInputChange("horaPreferida", value)
                              }
                            >
                              <SelectTrigger className="border-2 border-muted focus:border-primary">
                                <SelectValue placeholder="Selecciona una hora" />
                              </SelectTrigger>
                              <SelectContent>
                                {horariosDisponibles.map((hora) => (
                                  <SelectItem key={hora} value={hora}>
                                    {hora}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mensaje">
                            Mensaje Adicional (opcional)
                          </Label>
                          <Textarea
                            id="mensaje"
                            value={formData.mensaje}
                            onChange={(e) =>
                              handleInputChange("mensaje", e.target.value)
                            }
                            placeholder="Cuéntanos más sobre tus necesidades o preguntas..."
                            rows={4}
                            className="border-2 border-muted focus:border-primary resize-none"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-playful h-12 text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Agendando reunión...
                          </>
                        ) : (
                          <>
                            <Calendar className="mr-2 h-5 w-5" />
                            Agendar Reunión
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Info Sidebar */}
              <div className="space-y-6">
                {/* Contact Info Card */}
                <Card className="shadow-playful">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-primary" />
                      Información de Contacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Teléfono</p>
                        <p className="text-sm text-muted-foreground">
                          +51 123 456 789
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 mr-2 text-primary"/>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          smileatworkcompany@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Ubicación</p>
                        <p className="text-sm text-muted-foreground">
                          Lima, Perú
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Horarios Card */}
                <Card className="shadow-playful">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Horarios de Atención
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Lunes a Viernes</span>
                      <span className="text-sm font-medium">
                        8:00 AM - 5:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sábados</span>
                      <span className="text-sm font-medium">
                        09:00 AM - 12:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Domingos</span>
                      <span className="text-sm font-medium">Cerrado</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Us Card */}
                <Card className="shadow-playful">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="mr-2 h-5 w-5 text-primary" />
                      ¿Por qué elegirnos?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        Especialistas en pedagogía Waldorf
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Experimenta un nuevo enfoque de la educación infantil</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        Atención personalizada y cercana
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        Materiales educativos de calidad
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
