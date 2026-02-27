import { useState } from 'react';

function Footer({ isAdmin, setIsAdmin }) {
  const [showModal, setShowModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const secret = import.meta.env.VITE_ADMIN_PASSWORD;

    if (passwordInput === secret) {
      setIsAdmin(true);
      setShowModal(false);
      setPasswordInput('');
      alert("Admin Access Granted!");
    } else {
      alert("Invalid Password!");
    }
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 py-6 px-10 mt-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] tracking-widest uppercase font-bold relative">
      <div className="flex items-center gap-4">
        <span>Version 1.0</span>
        <span className="text-slate-700">|</span>
        <p>Created by <span className="text-blue-500">Daniele Lopes</span> & <span className="text-slate-400">Gemini</span></p>
      </div>

      <button 
        onClick={toggleAdmin}
        className={`transition-all px-4 py-1 rounded border ${
          isAdmin 
            ? "border-blue-500 text-blue-500 hover:bg-blue-500/10" 
            : "border-slate-700 text-slate-700 hover:text-slate-400"
        }`}
      >
        {isAdmin ? "● Logout Admin" : "○ Admin Login"}
      </button>

      {/* ADMIN LOGIN MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
            <h2 className="text-white text-lg mb-6 tracking-widest uppercase">Admin Authentication</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input 
                type="password" 
                placeholder="Enter Security Code"
                autoFocus
                className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 text-center tracking-widest"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => { setShowModal(false); setPasswordInput(''); }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors cursor-pointer font-bold"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;