import {initializeApp} from 'firebase/app'
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
  } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBSklDbe-Ew-escoTY3s9jlkvggvGLOdms",
  authDomain: "fir-9-demo-c8d59.firebaseapp.com",
  projectId: "fir-9-demo-c8d59",
  storageBucket: "fir-9-demo-c8d59.appspot.com",
  messagingSenderId: "46930440223",
  appId: "1:46930440223:web:d8e5947d849da9ec05252a"
  };

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books') 

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})
  .catch(err => {
    console.log(err.message)
  })

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
    .then(() => {
      addBookForm.reset()
    })
})


// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(() => {
    deleteBookForm.reset()
  })
})