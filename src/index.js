import {initializeApp} from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, 
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
  } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBSklDbe-Ew-escoTY3s9jlkvggvGLOdms",
  authDomain: "fir-9-demo-c8d59.firebaseapp.com",
  projectId: "fir-9-demo-c8d59",
  storageBucket: "fir-9-demo-c8d59.appspot.com",
  messagingSenderId: "46930440223",
  appId: "1:46930440223:web:d8e5947d849da9ec05252a"
  };

// -------- init firebase app
initializeApp(firebaseConfig);

// -------- init services
const db = getFirestore();
const auth = getAuth()

// ------- collection ref
const colRef = collection(db, 'books') 

// ------- queries
const q = query(colRef, where("author", "==", "cardo"), orderBy('createdAt'))

// ------- real time collection data
  onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })

// ------- adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      addBookForm.reset()
    })
})

// ------- deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(() => {
    deleteBookForm.reset()
  })
})

// get single document
const docRef = doc(db, 'books', 'PNuBVRDQ2MEmRKsc6bR1')

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
    .then(() => {
      updateForm.reset()
    })
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// const myData = document.querySelector('data')
// const dataValue = myData.innerHTML
// console.log(dataValue)