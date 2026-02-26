import { useState } from 'react'
import { Routes, Route } from 'react-router-dom' // Importe as rotas
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { booksMock } from './data/books'
import BookDetails from './pages/BookDetails'; 

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = booksMock.filter(book => {
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().startsWith(term) || 
      book.author.toLowerCase().startsWith(term)
    );
  });

  return (
    <div className='min-h-screen bg-slate-950 text-white p-4 md:p-10 flex flex-col items-center'>
      <Header onSearch={setSearchTerm} />
      
      <Routes>
        <Route path="/" element={<Body books={filteredBooks} isSearching={searchTerm.length > 0} />} />
        {/* Rota de teste simples */}
        <Route path="/test" element={<h1 className="text-4xl mt-10">It works!</h1>} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </div>
  )
}

export default App


