import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Package,
  Calendar,
  Users,
  Plus,
  Edit,
  Trash2,
  X,
  Sparkles,
  Eye,
  Search,
  BarChart3,
  DollarSign,
  UserCheck,
  Clock,
  Star,
  LogOut,
  AlertCircle,
} from "lucide-react";
import {
  serviciosService,
  productosService,
  talleresService,
  authService,
  statsService,
  type Servicio,
  type Taller,
  type Producto,
  type ItemType,
} from "@/lib/firebase/services";
import { Link } from "react-router-dom";
import AdminForm from "@/components/AdminForm";
import type { User } from "firebase/auth";


type EditableBase =
  | Partial<Servicio>
  | Partial<Producto>
  | Partial<Taller>

type EditableItem = EditableBase & {
  type: ItemType
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<ItemType>("servicios");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para datos de Firebase
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [stats, setStats] = useState({
    servicios: 0,
    productos: 0,
    talleres: 0,
    ingresos: 0,
    reunionesPendientes: 0,
    totalStock: 0,
    productosWaldorf: 0,
  });

  // Cargar datos desde Firebase
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [serviciosData, productosData, talleresData, statsData] =
        await Promise.all([
          serviciosService.getAll(),
          productosService.getAll(),
          talleresService.getAll(),
          statsService.getDashboardStats(),
        ]);

      setServicios(serviciosData);
      setProductos(productosData);
      setTalleres(talleresData);
      setStats(statsData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setError("Error al cargar los datos. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Verificar autenticación al cargar
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Autenticación simple
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authService.loginWithGoogle();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error de autenticación:", error);
      setError("Acceso no autorizado");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Funciones de gestión con Firebase
  const handleDelete = async (id: string, type: string) => {
    if (confirm("¿Estás seguro de eliminar este elemento?")) {
      try {
        setLoading(true);
        switch (type) {
          case "servicios":
            await serviciosService.delete(id);
            break;
          case "productos":
            await productosService.delete(id);
            break;
          case "talleres":
            await talleresService.delete(id);
            break;
        }
        await loadData(); // Recargar datos
      } catch (error) {
        console.error("Error al eliminar:", error);
        setError("Error al eliminar el elemento");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (item: Servicio | Producto | Taller, type: ItemType) => {
    setEditingItem({ ...item, type });
    setShowForm(true);
  };

  const handleSave = async (formData: EditableItem) => {
    try {
      setLoading(true);
      const { type, ...data } = formData;

      if (!type) return;

      if (editingItem?.id) {
        // Editar existente
        switch (type) {
          case "servicios":
            await serviciosService.update(
              editingItem.id,
              data as Partial<Servicio>,
            );
            break;
          case "productos":
            await productosService.update(
              editingItem.id,
              data as Partial<Producto>,
            );
            break;
          case "talleres":
            await talleresService.update(
              editingItem.id,
              data as Partial<Taller>,
            );
            break;
        }
      } else {
        // Crear nuevo
        switch (type) {
          case "servicios":
            await serviciosService.create(data as Omit<Servicio, "id">);
            break;
          case "productos":
            await productosService.create(data as Omit<Producto, "id">);
            break;
          case "talleres":
            await talleresService.create(data as Omit<Taller, "id">);
            break;
        }
      }

      await loadData(); // Recargar datos
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error al guardar:", error);
      setError("Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar datos
  const filteredServicios = servicios.filter(
    (s) =>
      s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredProductos = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredTalleres = talleres.filter(
    (t) =>
      t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-playful">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl text-gradient-primary">
              Panel Admin
            </CardTitle>
            <CardDescription>
              KidVersePeru - Sistema de Administración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
  {error && (
    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
      {error}
    </div>
  )}

  <Button
    type="button"
    onClick={handleLogin} // tu método async loginWithGoogle
    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground flex items-center justify-center gap-2"
    disabled={loading}
  >
    {loading ? (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        Iniciando sesión...
      </>
    ) : (
      <>
        <img
          src="/google-icon.svg"
          alt="Google"
          className="h-4 w-4 mr-2"
        />
        Iniciar sesión con Google
      </>
    )}
  </Button>

  <p className="text-xs text-muted-foreground text-center">
    Solo el administrador puede ingresar.
  </p>
</div>

          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold text-gradient-primary">
                  KidVersePeru Admin
                </span>
              </div>
              {user && (
                <Badge variant="outline" className="text-xs">
                  {user.email}
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Sitio
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-playful">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Servicios Activos
                    </p>
                    <p className="text-2xl font-bold">{stats.servicios}</p>
                  </div>
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Settings className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-playful">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Productos
                    </p>
                    <p className="text-2xl font-bold">{stats.productos}</p>
                  </div>
                  <div className="h-8 w-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-playful">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Talleres
                    </p>
                    <p className="text-2xl font-bold">{stats.talleres}</p>
                  </div>
                  <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-playful">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Ingresos
                    </p>
                    <p className="text-2xl font-bold">S/. {stats.ingresos}</p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-muted focus:border-primary"
                disabled={loading}
              />
            </div>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingItem({ type: activeTab });
              }}
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
              disabled={loading}
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar {activeTab.slice(0, -1)}
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as ItemType)}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="servicios"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Servicios
              </TabsTrigger>
              <TabsTrigger
                value="productos"
                className="flex items-center gap-2"
              >
                <Package className="h-4 w-4" />
                Productos
              </TabsTrigger>
              <TabsTrigger value="talleres" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Talleres
              </TabsTrigger>
            </TabsList>

            {/* Servicios Tab */}
            <TabsContent value="servicios" className="space-y-4">
              <div className="grid gap-4">
                {filteredServicios.map((servicio) => (
                  <Card key={servicio.id} className="shadow-playful">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{servicio.imagen}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">
                                {servicio.nombre}
                              </h3>
                              <Badge
                                className={
                                  servicio.estado === "activo"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {servicio.estado}
                              </Badge>
                              <Badge variant="outline">{servicio.tipo}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">
                              {servicio.descripcion}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                S/. {servicio.precio}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {servicio.duracion}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {servicio.edad}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(servicio, "servicios")}
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (!servicio.id) return;
                              handleDelete(servicio.id, "servicios");
                            }}
                            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Productos Tab */}
            <TabsContent value="productos" className="space-y-4">
              <div className="grid gap-4">
                {filteredProductos.map((producto) => (
                  <Card key={producto.id} className="shadow-playful">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{producto.imagen}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">
                                {producto.nombre}
                              </h3>
                              <Badge
                                className={
                                  producto.estado === "activo"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {producto.estado}
                              </Badge>
                              {producto.waldorf && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Star className="h-3 w-3 mr-1" />
                                  Waldorf
                                </Badge>
                              )}
                              <Badge variant="outline">
                                {producto.categoria}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">
                              {producto.descripcion}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                S/. {producto.precio}
                              </span>
                              <span className="flex items-center gap-1">
                                <Package className="h-3 w-3" />
                                Stock: {producto.stock}
                              </span>
                              <span className="flex items-center gap-1">
                                <BarChart3 className="h-3 w-3" />
                                {producto.materiales.join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(producto, "productos")}
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleDelete(producto.id!, "productos")
                            }
                            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Talleres Tab */}
            <TabsContent value="talleres" className="space-y-4">
              <div className="grid gap-4">
                {filteredTalleres.map((taller) => (
                  <Card key={taller.id} className="shadow-playful">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">
                              {taller.nombre}
                            </h3>
                            <Badge
                              className={
                                taller.estado === "activo"
                                  ? "bg-green-100 text-green-800"
                                  : taller.estado === "lleno"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {taller.estado}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {taller.descripcion}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Instructor: {taller.instructor}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {taller.horario}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {taller.dias.join(", ")}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <span className="flex items-center gap-1">
                                <UserCheck className="h-3 w-3" />
                                Cupo: {taller.cupoActual}/{taller.cupoMaximo}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                S/. {taller.precio}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {taller.edad}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(taller, "talleres")}
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(taller.id!, "talleres")}
                            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingItem?.id ? "Editar" : "Agregar"} {editingItem?.type}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AdminForm
                item={editingItem}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                loading={loading}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
