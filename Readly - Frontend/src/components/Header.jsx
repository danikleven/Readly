// src/components/Header.jsx
import { useState } from 'react'; 

// Recebemos onSearch como propriedade
function Header({ onSearch }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Função que lida com a digitação
  const handleInputChange = (e) => {
    onSearch(e.target.value); // Envia o texto para o App.jsx
  };

  return (
    <header className="w-full md:w-2/3 lg:w-1/2 p-6 flex flex-col items-center">
      {/* Título */}
      <h1 className="text-4xl md:text-7xl font-bold text-center font-special text-white">
        Readly
      </h1>

      {/* Navegação */}
      <nav className="flex items-center gap-6 mt-8 font-special text-sm md:text-base">
        <a href="/" className="hover:text-blue-400 transition-colors uppercase tracking-widest text-white">Home</a>
        
        {/* Botão de Pesquisa */}
        <button 
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            if (isSearchOpen) onSearch(""); // Limpa a busca ao fechar a barra
          }} 
          className="flex items-center gap-2 py-2 px-1 hover:bg-slate-800 rounded-lg transition-all cursor-pointer focus:outline-none text-white"
        >
          <span className="uppercase tracking-widest text-sm md:text-base">Search</span>
          <span role="img" aria-label="search" className="text-xl">🔍</span>
        </button>
      </nav>

      {/* BARRA DE PESQUISA */}
      {isSearchOpen && ( 
        <div className="w-full mt-6 animate-in fade-in zoom-in duration-300">
          <input 
            type="text"
            placeholder="What book are you looking for?"
            onChange={handleInputChange} // Conectamos a função aqui
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 font-special text-white focus:outline-none focus:border-blue-500 transition-all shadow-lg"
            autoFocus 
          />
        </div>
      )}

      {/* Linha separadora */}
      <div className="w-full h-px bg-slate-800 mt-8"></div>
    </header>
  );
}

export default Header;