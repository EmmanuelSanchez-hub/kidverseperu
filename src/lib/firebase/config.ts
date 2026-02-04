import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kidverseperu-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kidverseperu-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456789"
}


// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar servicios
export const auth = getAuth(app)
export const db = getFirestore(app)

// Exportar la app para uso en otros archivos
export default app