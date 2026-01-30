import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  BookOpen,
  Users,
  ChevronRight,
  Play,
  Heart,
  Sparkles,
  Gift,
  Calendar,
  Award,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Foooter from "@/components/layout/Footer";
import { scrollToSection } from "@/lib/scrollToSection";
import { Link } from "react-router-dom";

export default function SmileAtWorkLanding() {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Datos de productos Waldorf
  const productos = [
    {
      id: 1,
      nombre: "Set de Acuarelas Beeswax",
      categoria: "arte",
      precio: "S/. 89.90",
      descripcion: "Acuarelas naturales con cera de abejas, seguras para niños",
      imagen: "🎨",
      colores: ["bg-yellow-400", "bg-pink-400", "bg-blue-400", "bg-green-400"],
    },
    {
      id: 2,
      nombre: "Muñecos de Tela Orgánica",
      categoria: "juegos",
      precio: "S/. 120.00",
      descripcion:
        "Muñecos artesanales con materiales naturales y tinturas vegetales",
      imagen: "🧸",
      colores: ["bg-pink-300", "bg-blue-300"],
    },
    {
      id: 3,
      nombre: "Bloques de Madera Natural",
      categoria: "construccion",
      precio: "S/. 150.00",
      descripcion:
        "Set de 50 bloques de madera pulida para estimular la creatividad",
      imagen: "🧱",
      colores: ["bg-amber-600", "bg-amber-700"],
    },
    {
      id: 4,
      nombre: "Telar de Tejido Manual",
      categoria: "arte",
      precio: "S/. 95.00",
      descripcion:
        "Telar infantil con lana de colores naturales para desarrollar motricidad",
      imagen: "🧶",
      colores: ["bg-purple-400", "bg-pink-400", "bg-yellow-400"],
    },
    {
      id: 5,
      nombre: "Set de Crayones Naturales",
      categoria: "arte",
      precio: "S/. 45.00",
      descripcion:
        "Crayones elaborados con cera de abeja y pigmentos naturales",
      imagen: "🖍️",
      colores: ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400"],
    },
    {
      id: 6,
      nombre: "Casa de Muñecas Waldorf",
      categoria: "juegos",
      precio: "S/. 280.00",
      descripcion:
        "Casa de madera con muebles minimalistas para juego simbólico",
      imagen: "🏠",
      colores: ["bg-amber-700", "bg-green-600"],
    },
  ];

  const categorias = [
    { id: "todos", nombre: "Todos los productos", icono: "🌈" },
    { id: "arte", nombre: "Arte y Creatividad", icono: "🎨" },
    { id: "juegos", nombre: "Juegos Simbólicos", icono: "🧸" },
    { id: "construccion", nombre: "Construcción", iconio: "🏗️" },
  ];

  const productosFiltrados =
    selectedCategory === "todos"
      ? productos
      : productos.filter((p) => p.categoria === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden py-20 sm:py-25">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 w-fit">
                  <Star className="mr-1 h-3 w-3" />
                  Educación Inicial de Calidad
                </Badge>
                <h1 className="text-4xl sm:text-6xl font-bold text-gradient-rainbow">
                  Descubre el Mundo Mágico del Aprendizaje
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  En SmileAtWork creamos experiencias educativas únicas para
                  niños de 3 a 5 años, inspiradas en pedagogías innovadoras para
                  desarrollar el potencial integral.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-playful"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Conocer Talleres
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => scrollToSection("productos")}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Ver Catálogo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 border-2 border-background flex items-center justify-center text-white font-bold text-sm"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">+200 familias felices</p>
                  <p className="text-xs text-muted-foreground">
                    Confían en SmileAtWork
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-yellow-100 rounded-2xl p-6 shadow-playful float">
                      <div className="text-4xl mb-2">🌈</div>
                      <h3 className="font-bold text-yellow-900">Creatividad</h3>
                      <p className="text-sm text-yellow-700">
                        Desarrollamos la imaginación y el pensamiento creativo
                      </p>
                    </div>
                    <div className="bg-pink-100 rounded-2xl p-6 shadow-playful bounce-gentle">
                      <div className="text-4xl mb-2">🎨</div>
                      <h3 className="font-bold text-pink-900">Arte</h3>
                      <p className="text-sm text-pink-700">
                        Expresión artística con materiales naturales
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-blue-100 rounded-2xl p-6 shadow-playful float">
                      <div className="text-4xl mb-2">🧸</div>
                      <h3 className="font-bold text-blue-900">Juego</h3>
                      <p className="text-sm text-blue-700">
                        Aprendizaje através del juego libre
                      </p>
                    </div>
                    <div className="bg-green-100 rounded-2xl p-6 shadow-playful float">
                      <div className="text-4xl mb-2">🪑</div>
                      <h3 className="font-bold text-green-900">Ambiente Preparados</h3>
                      <p className="text-sm text-green-700">
                        Materiales accesibles que invitan a aprender haciendo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="talleres" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-accent text-accent-foreground">
              Nuestros Servicios
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient-primary">
              Talleres y Actividades Educativas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Diseñados para acompañar el desarrollo integral de tus hijos en
              una ambiente cálido y estimulante
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/20 shadow-playful hover:shadow-playful-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🎭
                </div>
                <CardTitle className="text-xl">
                  Taller de Arte Expresivo
                </CardTitle>
                <CardDescription>
                  Desarrollo creativo con técnicas Waldorf y Reggio Emilia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    Pintura con acuarelas naturales
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    Modelado con arcilla
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    Manualidades con materiales reutilizables
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    3-5 años
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Miercoles
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20 shadow-playful hover:shadow-playful-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🏃
                </div>
                <CardTitle className="text-xl">
                  Psicomotricidad Fina y Gruesa
                </CardTitle>
                <CardDescription>
                  Desarrollo de habilidades motoras
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-secondary" />
                    Actividades de manos y dedos
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-secondary" />
                    Caminos de equilibrio
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-secondary" />
                    Juegos con movimiento
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    3-5 años
                  </span>
                  <Badge className="bg-blue-100 text-blue-800">
                    Lunes
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 shadow-playful hover:shadow-playful-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🎵
                </div>
                <CardTitle className="text-xl">Música y Danza</CardTitle>
                <CardDescription>Desarrollo rítmico y corporal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-accent" />
                    Canciones infantiles
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-accent" />
                    Juegos de dedos
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-accent" />
                    Danza creativa
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    3-5 años
                  </span>
                  <Badge className="bg-purple-100 text-purple-800">
                    Jueves
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 shadow-playful hover:shadow-playful-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  📚
                </div>
                <CardTitle className="text-xl">
                  Plan Lector y Dramatización
                </CardTitle>
                <CardDescription>
                  Desarrollo del Lenguaje Con Técnicas Waldorf
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    Creación de Personajes
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    Juego de Palabras
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    Rimas con Movimiento
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    3-5 años
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Martes
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20 shadow-playful hover:shadow-playful-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  👣
                </div>
                <CardTitle className="text-xl">
                  Taller Sensorial Temprano
                </CardTitle>
                <CardDescription>
                  Exploración y descubrimiento a través de los sentidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-secondary" />
                    Bandejas sensoriales
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-secondary" />
                    Experiencia de causa - efecto
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-secondary" />
                    Materiales naturales y cotidianos
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    1-2 años
                  </span>
                  <Badge className="bg-blue-100 text-blue-800">
                    Viernes
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section id="productos" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-pink-100 text-pink-800">
              Catálogo de Productos
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient-primary">
              Materiales Didácticos Waldorf
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Productos artesanales elaborados con materiales naturales para
              estimular el desarrollo sensorial y creativo
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categorias.map((categoria) => (
              <Button
                key={categoria.id}
                variant={
                  selectedCategory === categoria.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(categoria.id)}
                className={`${
                  selectedCategory === categoria.id
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <span className="mr-2">{categoria.icono}</span>
                {categoria.nombre}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => (
              <Card
                key={producto.id}
                className="group hover:shadow-playful-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20"
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <div className="text-6xl p-8 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      {producto.imagen}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-yellow-400 text-yellow-900">
                        <Star className="h-3 w-3 mr-1" />
                        Waldorf
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{producto.nombre}</CardTitle>
                  <CardDescription className="text-sm">
                    {producto.descripcion}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 justify-center">
                    {producto.colores.map((color, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full ${color}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {producto.precio}
                    </span>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary-hover text-primary-foreground"
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="servicios" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-accent text-accent-foreground">
              Servicios Educativos
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient-primary">
              Planificación Curricular Creativa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Diseño y venta de planificaciones educativas inspiradas en pedagogía Reggio Emilia y Waldorf
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Proyecto de Aprendizaje
                  </h3>
                  <p className="text-muted-foreground">
                    Planificaciones integrales basadas en intereses del niño, con experiencias significativas y sentido pedagógico.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Actividades de Aprendizaje
                  </h3>
                  <p className="text-muted-foreground">
                    Secuencias creativas que integran juego, exploración 
                    sensorial, expresión artística y movimiento.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Talleres de Aprendizaje
                  </h3>
                  <p className="text-muted-foreground">
                    Propuestas practicas organizadas por experiencias 
                    (grafico plastico, plan lector, música, psicomotricidad, dramatización y danza).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 shadow-playful">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-white text-3xl mx-auto">
                  📚
                </div>
                <h3 className="text-2xl font-bold">
                  ¿Interesado en nuestros servicios?
                </h3>
                <p className="text-muted-foreground">
                  Contáctanos para una consulta gratuita y descubre cómo podemos
                  ayudar a tu centro educativo o familia.
                </p>
                <Link to="/agendar-reunion">
                  <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-playful">
                    <Calendar className="mr-2 h-5 w-5" />
                    Agendar Reunión
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-100 text-green-800">
              ¿Por qué elegirnos?
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient-primary">
              Beneficios de SmileAtWork
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
                <Heart />
              </div>
              <h3 className="text-lg font-bold">Enfoque Humanista</h3>
              <p className="text-sm text-muted-foreground">
                Respetamos el ritmo individual de cada niño y niña
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
                <Sparkles />
              </div>
              <h3 className="text-lg font-bold">Materiales Naturales</h3>
              <p className="text-sm text-muted-foreground">
                Productos seguros y ecológicos para el desarrollo
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
                <Users />
              </div>
              <h3 className="text-lg font-bold">Equipo Especializado</h3>
              <p className="text-sm text-muted-foreground">
                Educadores con formación en pedagogía Waldorf
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
                <Award />
              </div>
              <h3 className="text-lg font-bold">Calidad Certificada</h3>
              <p className="text-sm text-muted-foreground">
                Estándares internacionales en educación inicial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Foooter/>
    </div>
  );
}
