import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { booksMock } from './data/books'
import BookDetails from './pages/BookDetails'
import AddBook from './pages/AddBook'
import Footer from './components/Footer'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const [allBooks, setAllBooks] = useState(() => {
    const savedBooks = localStorage.getItem('library_books');
    return savedBooks ? JSON.parse(savedBooks) : booksMock;
  });

  useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(allBooks));
  }, [allBooks]);

  const handleAddBook = (newBook) => {
    if (allBooks.some(b => b.isbn === newBook.isbn)) {
      alert("This ISBN already exists in your library!");
      return null;
    }
    const updatedBooks = [newBook, ...allBooks];
    setAllBooks(updatedBooks);
    return newBook;
  };

  // --- NOVA FUNÇÃO DE EDITAR ---
  const handleUpdateBook = (id, updatedData) => {
    const updatedBooks = allBooks.map(book => 
      book.id === id ? { ...book, ...updatedData } : book
    );
    setAllBooks(updatedBooks);
    return true;
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to remove this book from your library?")) {
      const updatedBooks = allBooks.filter(book => book.id !== bookId);
      setAllBooks(updatedBooks);
      localStorage.removeItem(`comments_${bookId}`);
      return true;
    }
    return false;
  };

  const filteredBooks = allBooks.filter(book => {
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) || 
      book.author.toLowerCase().includes(term)
    );
  });

  return (
    <div className='min-h-screen bg-slate-950 text-white flex flex-col'>
      <div className="flex-1 w-full p-4 md:p-10 flex flex-col items-center">
        
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
          <Route 
            path="/book/:id" 
            element={
              <BookDetails 
                books={allBooks} 
                onDeleteBook={handleDeleteBook} 
                onUpdateBook={handleUpdateBook} // Passando a nova prop
                isAdmin={isAdmin} 
              />
            } 
          />
          <Route path="/add-book" element={<AddBook onAddBook={handleAddBook} />} />
        </Routes>
      </div>

      <Footer isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </div>
  )
}

export default App