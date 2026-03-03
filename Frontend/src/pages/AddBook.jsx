import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBook({ onAddBook }) {
  const [formData, setFormData] = useState({ title: '', author: '', isbn: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.isbn) return;

    const newBook = {
      ...formData,
      id: Date.now(),
      addedDate: new Date().toISOString().split('T')[0],
      rating: 0
    };

    const savedBook = onAddBook(newBook);
    if (savedBook) navigate(`/book/${savedBook.id}`);
  };

  return (
    <div className="max-w-2xl w-full p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-widest text-left">
        New Library Entry
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="text-left">
          <label className="text-slate-400 text-xs font-bold uppercase mb-2 block">Book Title</label>
          <input 
            type="text" 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white outline-none focus:border-blue-500 transition-all"
            placeholder="e.g. The Hobbit"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="text-left">
          <label className="text-slate-400 text-xs font-bold uppercase mb-2 block">Author Name</label>
          <input 
            type="text" 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white outline-none focus:border-blue-500 transition-all"
            placeholder="e.g. J.R.R. Tolkien"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            required
          />
        </div>

        <div className="text-left">
          <label className="text-slate-400 text-xs font-bold uppercase mb-2 block">ISBN-13</label>
          <input 
            type="text" 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white outline-none focus:border-blue-500 transition-all font-mono"
            placeholder="978..."
            value={formData.isbn}
            onChange={(e) => setFormData({...formData, isbn: e.target.value})}
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-xl transition-all shadow-lg uppercase tracking-widest mt-4 cursor-pointer"
        >
          Confirm & Save
        </button>
      </form>
    </div>
  );
}

export default AddBook;