import { useParams, Link } from 'react-router-dom';
import { booksMock, getCoverUrl } from '../data/books';

function BookDetails() {
  const { id } = useParams();
  const book = booksMock.find(b => b.id === parseInt(id));

  if (!book) return <div className="text-center p-20">Livro não encontrado!</div>;

  return (
    <div className="max-w-4xl w-full mt-10 p-6 bg-slate-900 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-10 border border-slate-800">
      <img 
        src={getCoverUrl(book.isbn)} 
        alt={book.title} 
        className="w-64 h-96 object-cover rounded-lg shadow-2xl bg-slate-800" 
      />
      
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">{book.title}</h1>
          <p className="text-xl text-slate-400 mb-4">por {book.author}</p>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-white font-bold text-xl">{book.rating}</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg">
            <p className="text-slate-300">ISBN: {book.isbn}</p>
            <p className="text-slate-300 mt-2">Adicionado em: {book.addedDate}</p>
          </div>
        </div>
        
        <Link to="/" className="mt-8 text-blue-400 hover:underline flex items-center gap-2">
          ← Voltar para a Galeria
        </Link>
      </div>
    </div>
  );
}

export default BookDetails;