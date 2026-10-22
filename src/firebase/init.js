import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAH1JmurPKcvtmXJi-qlOeJuSYWRsgtMTI',
  authDomain: 'fit5032-67582.firebaseapp.com',
  projectId: 'fit5032-67582',
  storageBucket: 'fit5032-67582.firebasestorage.app',
  messagingSenderId: '578741266657',
  appId: '1:578741266657:web:4c0e028a2462a614f0afa0'
}

initializeApp(firebaseConfig)

const db = getFirestore()

export default db