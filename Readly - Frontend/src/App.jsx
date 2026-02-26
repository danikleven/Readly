// src/App.jsx
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { booksMock } from './data/books'

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica corrigida: usa startsWith e verifica título ou autor
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
      
      {/* Aqui passamos os livros já filtrados para o Body */}
      <Body 
        books={filteredBooks} 
        isSearching={searchTerm.length > 0} 
      />
    </div>
  )
}

export default App