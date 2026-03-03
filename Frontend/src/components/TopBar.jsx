import { useState } from 'react';

function TopBar({ isAdmin, setIsAdmin }) {
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
    <>
      <div className="w-full bg-slate-900 border-b border-slate-800 py-2 px-6 md:px-10 flex justify-between items-center transition-all z-40">
        <div className="flex items-center gap-4 text-slate-500 text-[10px] tracking-[3px] uppercase font-bold">
          <span>Readly System v1.0</span>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-blue-400">Admin Active</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={toggleAdmin}
          className={`text-[10px] tracking-widest uppercase font-bold transition-all px-3 py-1 rounded border ${
            isAdmin 
              ? "border-blue-500 text-blue-500 hover:bg-blue-500/10" 
              : "border-slate-700 text-slate-500 hover:text-slate-300"
          } cursor-pointer`}
        >
          {isAdmin ? "Logout" : "Admin Login"}
        </button>
      </div>

      {/* ADMIN LOGIN MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-in zoom-in duration-200">
            <h2 className="text-white text-lg mb-6 tracking-widest uppercase font-special">Admin Authentication</h2>
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
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors cursor-pointer text-[10px] uppercase font-bold tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors cursor-pointer font-bold text-[10px] uppercase tracking-widest"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TopBar;