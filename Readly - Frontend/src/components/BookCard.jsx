import { Link } from 'react-router-dom';
import { getCoverUrl } from '../data/books';

function BookCard({ book }) {
  return (
    <Link 
      to={`/book/${book.id}`} 
      // Alterado para w-56 (224px) e adicionado flex-none para manter a estrutura
      className="bg-slate-900 p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer border border-slate-800 flex flex-col items-center w-56 flex-none no-underline shadow-md"
    >
      <img 
        src={getCoverUrl(book.isbn)} 
        alt={book.title} 
        // Aumentei h-64 para h-80 para manter a proporção com a largura nova
        className="w-full h-80 object-cover rounded-md shadow-lg bg-slate-800" 
        onError={(e) => { e.target.src = 'https://via.placeholder.com/150x225?text=No+Cover'; }}
      />
      <div className="mt-4 text-center w-full">
        <h3 className="font-bold text-sm truncate text-white w-full">{book.title}</h3>
        <p className="text-slate-400 text-xs mt-1">{book.author}</p>
      </div>
    </Link>
  );
}

export default BookCard;