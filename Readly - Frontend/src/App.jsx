import { useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { booksMock } from './data/books'
import BookDetails from './pages/BookDetails'
import AddBook from './pages/AddBook'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks, setAllBooks] = useState(booksMock);
  const location = useLocation();

  const handleAddBook = (newBook) => {
    if (allBooks.some(b => b.isbn === newBook.isbn)) {
      alert("This ISBN already exists in your library!");
      return null;
    }
    const updatedBooks = [newBook, ...allBooks];
    setAllBooks(updatedBooks);
    return newBook;
  };

  const filteredBooks = allBooks.filter(book => {
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) || 
      book.author.toLowerCase().includes(term)
    );
  });

  return (
    <div className='min-h-screen bg-slate-950 text-white p-4 md:p-10 flex flex-col items-center'>
      
      {/* HEADER DINÂMICO */}
      {location.pathname === '/' ? (
        <Header onSearch={setSearchTerm} />
      ) : (
        <div className="w-full max-w-6xl flex justify-start mb-8">
          <Link 
            to="/" 
            className="text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2 font-bold uppercase text-xs tracking-widest"
          >
            ← Back to Gallery
          </Link>
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<Body books={filteredBooks} isSearching={searchTerm.length > 0} />} />
        <Route path="/book/:id" element={<BookDetails books={allBooks} />} />
        <Route path="/add-book" element={<AddBook onAddBook={handleAddBook} />} />
      </Routes>
    </div>
  )
}

export default App