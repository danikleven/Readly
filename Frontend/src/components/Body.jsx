import { useRef, useState } from "react";
import BookCard from "./BookCard";

function Body({ books, isSearching }) {
  const scrollRef = useRef(null);
  
  // PAGINAÇÃO LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 30; // Altere para 30 quando tiver muitos livros

  if (isSearching) {
    return (
      <main className="w-full pt-8 px-4 md:px-8 max-w-7xl mx-auto">
        <h3 className="text-white font-special text-xl mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-widest">
          Search Results ({books.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 justify-items-center">
          {books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </main>
    );
  }

  // Separar Top 10 e Resto (Paginado)
  const top10Books = [...books].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const remainingBooks = [...books].filter(book => !top10Books.find(top => top.id === book.id));

  // Cálculo da Paginação
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = remainingBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(remainingBooks.length / booksPerPage);

  // Função para gerar números de página (lógica de janela)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <main className="w-full pt-8 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-20">
      {/* SECTION TOP 10 (Carrossel Horizontal) */}
      <section className="relative group"> 
        <h3 className="text-white font-special text-xl mb-6 border-l-4 border-blue-500 pl-4 uppercase tracking-widest">Top 10 Books</h3>
        <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-6 scroll-smooth scrollbar-hide items-stretch">
          {top10Books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      {/* SECTION ALL BOOKS (Grid Paginada) */}
      <section>
        <h3 className="text-white font-special text-xl mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-widest">Library Collection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 justify-items-center">
          {currentBooks.map((book) => <BookCard key={book.id} book={book} />)}
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-20 font-special">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-slate-500 hover:text-white disabled:opacity-30 cursor-pointer"
            > PREV </button>

            {getPageNumbers().map((num, idx) => (
              <button
                key={idx}
                onClick={() => typeof num === 'number' && setCurrentPage(num)}
                className={`w-10 h-10 rounded-lg border transition-all cursor-pointer ${
                  currentPage === num 
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20" 
                    : "border-slate-800 text-slate-500 hover:border-slate-600"
                } ${num === '...' ? 'cursor-default border-none' : ''}`}
              >
                {num}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-slate-500 hover:text-white disabled:opacity-30 cursor-pointer"
            > NEXT </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Body;