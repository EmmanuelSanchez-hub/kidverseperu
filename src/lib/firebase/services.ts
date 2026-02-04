import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'

// Tipos de datos
export interface Servicio {
  id?: string
  nombre: string
  descripcion: string
  tipo: 'taller' | 'planificacion' | 'asesoramiento'
  precio: number
  duracion: string
  edad: string
  estado: 'activo' | 'inactivo'
  imagen: string
  createdAt?: unknown
  updatedAt?: unknown
}

export interface Producto {
  id?: string
  nombre: string
  descripcion: string
  categoria: string
  precio: number
  stock: number
  materiales: string[]
  waldorf: boolean
  estado: 'activo' | 'inactivo'
  imagen: string
  createdAt?: unknown
  updatedAt?: unknown
}

export interface Taller {
  id?: string
  nombre: string
  descripcion: string
  instructor: string
  cupoMaximo: number
  cupoActual: number
  horario: string
  dias: string[]
  edad: string
  precio: number
  estado: 'activo' | 'inactivo' | 'lleno'
  createdAt?: unknown
  updatedAt?: unknown
}

export interface Reunion {
  id?: string
  nombre: string
  email: string
  telefono: string
  centroEducativo?: string
  tipoServicio: string
  fechaPreferida: string
  horaPreferida: string
  mensaje?: string
  estado: 'pendiente' | 'confirmada' | 'cancelada'
  createdAt?: unknown
  updatedAt?: unknown
}

export type ItemType = "servicios" | "productos" | "talleres"

// Colecciones Firestore
const SERVICIOS_COLLECTION = 'servicios'
const PRODUCTOS_COLLECTION = 'productos'
const TALLERES_COLLECTION = 'talleres'
const REUNIONES_COLLECTION = 'reuniones'

const googleProvider = new GoogleAuthProvider()
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL


// Servicios CRUD - SERVICIOS
export const serviciosService = {
  // Obtener todos los servicios
  async getAll(): Promise<Servicio[]> {
    try {
      const querySnapshot = await getDocs(collection(db, SERVICIOS_COLLECTION))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Servicio[]
    } catch (error) {
      console.error('Error al obtener servicios:', error)
      throw error
    }
  },

  // Obtener servicio por ID
  async getById(id: string): Promise<Servicio | null> {
    try {
      const docRef = doc(db, SERVICIOS_COLLECTION, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Servicio
      }
      return null
    } catch (error) {
      console.error('Error al obtener servicio:', error)
      throw error
    }
  },

  // Crear nuevo servicio
  async create(servicio: Omit<Servicio, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, SERVICIOS_COLLECTION), {
        ...servicio,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Error al crear servicio:', error)
      throw error
    }
  },

  // Actualizar servicio
  async update(id: string, servicio: Partial<Servicio>): Promise<void> {
    try {
      const docRef = doc(db, SERVICIOS_COLLECTION, id)
      await updateDoc(docRef, {
        ...servicio,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error al actualizar servicio:', error)
      throw error
    }
  },

  // Eliminar servicio
  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, SERVICIOS_COLLECTION, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error al eliminar servicio:', error)
      throw error
    }
  },

  // Buscar servicios
  async search(searchTerm: string): Promise<Servicio[]> {
    try {
      const q = query(
        collection(db, SERVICIOS_COLLECTION),
        where('estado', '==', 'activo')
      )
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }) as Servicio)
        .filter(servicio =>
          servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        )
    } catch (error) {
      console.error('Error al buscar servicios:', error)
      throw error
    }
  }
}

// Servicios CRUD - PRODUCTOS
export const productosService = {
  async getAll(): Promise<Producto[]> {
    try {
      const querySnapshot = await getDocs(collection(db, PRODUCTOS_COLLECTION))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Producto[]
    } catch (error) {
      console.error('Error al obtener productos:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Producto | null> {
    try {
      const docRef = doc(db, PRODUCTOS_COLLECTION, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Producto
      }
      return null
    } catch (error) {
      console.error('Error al obtener producto:', error)
      throw error
    }
  },

  async create(producto: Omit<Producto, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, PRODUCTOS_COLLECTION), {
        ...producto,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Error al crear producto:', error)
      throw error
    }
  },

  async update(id: string, producto: Partial<Producto>): Promise<void> {
    try {
      const docRef = doc(db, PRODUCTOS_COLLECTION, id)
      await updateDoc(docRef, {
        ...producto,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error al actualizar producto:', error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, PRODUCTOS_COLLECTION, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      throw error
    }
  },

  async search(searchTerm: string): Promise<Producto[]> {
    try {
      const q = query(
        collection(db, PRODUCTOS_COLLECTION),
        where('estado', '==', 'activo')
      )
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }) as Producto)
        .filter(producto =>
          producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        )
    } catch (error) {
      console.error('Error al buscar productos:', error)
      throw error
    }
  }
}

// Servicios CRUD - TALLERES
export const talleresService = {
  async getAll(): Promise<Taller[]> {
    try {
      const querySnapshot = await getDocs(collection(db, TALLERES_COLLECTION))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Taller[]
    } catch (error) {
      console.error('Error al obtener talleres:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Taller | null> {
    try {
      const docRef = doc(db, TALLERES_COLLECTION, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Taller
      }
      return null
    } catch (error) {
      console.error('Error al obtener taller:', error)
      throw error
    }
  },

  async create(taller: Omit<Taller, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, TALLERES_COLLECTION), {
        ...taller,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Error al crear taller:', error)
      throw error
    }
  },

  async update(id: string, taller: Partial<Taller>): Promise<void> {
    try {
      const docRef = doc(db, TALLERES_COLLECTION, id)
      await updateDoc(docRef, {
        ...taller,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error al actualizar taller:', error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, TALLERES_COLLECTION, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error al eliminar taller:', error)
      throw error
    }
  },

  async search(searchTerm: string): Promise<Taller[]> {
    try {
      const q = query(
        collection(db, TALLERES_COLLECTION),
        where('estado', '==', 'activo')
      )
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }) as Taller)
        .filter(taller =>
          taller.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          taller.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        )
    } catch (error) {
      console.error('Error al buscar talleres:', error)
      throw error
    }
  }
}

// Servicios CRUD - REUNIONES
export const reunionesService = {
  async getAll(): Promise<Reunion[]> {
    try {
      const querySnapshot = await getDocs(collection(db, REUNIONES_COLLECTION))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Reunion[]
    } catch (error) {
      console.error('Error al obtener reuniones:', error)
      throw error
    }
  },

  async create(reunion: Omit<Reunion, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, REUNIONES_COLLECTION), {
        ...reunion,
        estado: 'pendiente',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Error al crear reunión:', error)
      throw error
    }
  },

  async update(id: string, reunion: Partial<Reunion>): Promise<void> {
    try {
      const docRef = doc(db, REUNIONES_COLLECTION, id)
      await updateDoc(docRef, {
        ...reunion,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error al actualizar reunión:', error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, REUNIONES_COLLECTION, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error al eliminar reunión:', error)
      throw error
    }
  }
}

// Servicios de Autenticación
export const authService = {
  async loginWithGoogle() {
    try {

      const result = await signInWithPopup(auth, googleProvider)

      const user = result.user

      if (user.email !== ADMIN_EMAIL) {
        await signOut(auth)
        throw new Error("Acceso no autorizado")
      }

      return user

    } catch (error) {
      console.error("Error Google Login:", error)
      throw error
    }
  },

  async logout() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback)
  }
}

// Funciones de estadísticas
export const statsService = {
  async getDashboardStats() {
    try {
      const [servicios, productos, talleres, reuniones] = await Promise.all([
        serviciosService.getAll(),
        productosService.getAll(),
        talleresService.getAll(),
        reunionesService.getAll()
      ])

      return {
        servicios: servicios.filter(s => s.estado === 'activo').length,
        productos: productos.filter(p => p.estado === 'activo').length,
        talleres: talleres.filter(t => t.estado === 'activo').length,
        ingresos: talleres.reduce((sum, t) => sum + (t.cupoActual * t.precio), 0),
        reunionesPendientes: reuniones.filter(r => r.estado === 'pendiente').length,
        totalStock: productos.reduce((sum, p) => sum + p.stock, 0),
        productosWaldorf: productos.filter(p => p.waldorf).length
      }
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      throw error
    }
  }
}