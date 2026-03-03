function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 py-8 px-10 mt-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] tracking-widest uppercase font-bold">
      <div className="flex items-center gap-4">
        <span>© {new Date().getFullYear()}</span>
        <span className="text-slate-700">|</span>
        <p>Created by <span className="text-blue-500">Daniele Lopes</span> & <span className="text-slate-400">Gemini</span></p>
      </div>

      <div className="flex gap-8">
        {/* Substitua o '#' pelo seu link real entre as aspas quando quiser */}
        <a 
          href="https://github.com/danikleven" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Github
        </a>
        <a 
          href="https://www.linkedin.com/in/daniele-lopes-453379123/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          LinkedIn
        </a>
        {/*<a 
          href="#" 
          className="hover:text-white transition-colors"
        >
          Portfolio
        </a> */}
      </div>
    </footer>
  );
}

export default Footer;