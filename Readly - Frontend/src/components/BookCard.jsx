// src/components/BookCard.jsx
import { getCoverUrl } from '../data/books';

function BookCard({ book }) {
  return (
    <div className="flex-shrink-0 w-40 md:w-48 flex flex-col items-center group cursor-pointer">
      {/* Capa */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/20 group-hover:shadow-2xl">
        <img 
          src={getCoverUrl(book.isbn)} 
          alt={book.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Textos */}
      <div className="mt-3 text-center w-full">
        <h3 className="font-special text-white text-sm font-bold leading-tight line-clamp-2">
          {book.title}
        </h3>
        <p className="font-special text-slate-400 text-xs mt-1">
          {book.author}
        </p>
      </div>
    </div>
  );
}

export default BookCard;