// src/components/Body.jsx
import { useRef } from "react";
import BookCard from "./BookCard";

function Body({ books, isSearching }) {
  const scrollRef = useRef(null);

  if (isSearching) {
    return (
      <main className="w-full pt-8 px-4 md:px-8 max-w-7xl mx-auto">
        <h3 className="text-white font-special text-xl mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-widest">
          Search Results ({books.length})
        </h3>
        {books.length > 0 ? (
          // Ajustado gap e colunas para cards maiores
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 justify-items-center">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 font-special italic text-center mt-10">No books found starting with that...</p>
        )}
      </main>
    );
  }

  const top10Books = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const recentlyAdded = [...books]
    .filter(book => !top10Books.find(top => top.id === book.id))
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Ajustado para 250 para compensar a largura maior do card
      const scrollAmount = 250; 
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full pt-8 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-20">
      <section className="relative group"> 
        <h3 className="text-white font-special text-xl mb-6 border-l-4 border-blue-500 pl-4 uppercase tracking-widest">
          Top 10 Books
        </h3>
        <button onClick={() => scroll('left')} className="hidden md:flex items-center justify-center absolute left-0 top-[55%] -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-6 cursor-pointer">❮</button>
        
        {/* Adicionado items-stretch para garantir a altura correta */}
        <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-6 scroll-smooth scrollbar-hide items-stretch">
          {top10Books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>

        <button onClick={() => scroll('right')} className="hidden md:flex items-center justify-center absolute right-0 top-[55%] -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -mr-6 cursor-pointer">❯</button>
      </section>

      <section>
        <h3 className="text-white font-special text-xl mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-widest">
          Recently Added
        </h3>
        {/* Ajustado colunas da grade para os novos cards de w-56 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 justify-items-center">
          {recentlyAdded.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>
    </main>
  );
}

export default Body;