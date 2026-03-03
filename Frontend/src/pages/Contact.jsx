import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui no futuro integraremos com um serviço de e-mail ou seu Backend Java
    console.log("Contact Data:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl w-full mt-20 p-10 bg-slate-900 rounded-2xl border border-slate-800 text-center shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-500 mb-4 uppercase tracking-tighter">Message Sent!</h2>
        <p className="text-slate-400 font-special italic mb-8">Thank you for reaching out. We will get back to you soon.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-lg transition-all uppercase text-[10px] tracking-widest font-bold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full mt-10 p-8 md:p-12 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl text-left">
      <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Contact Us</h2>
      <p className="text-slate-500 font-special text-sm mb-8 tracking-wide">Have a suggestion or found a bug? Send us a message.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Full Name</label>
          <input 
            type="text" required
            className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-all"
            placeholder="How should we call you?"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Email Address</label>
          <input 
            type="email" required
            className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-all"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Message</label>
          <textarea 
            required rows="5"
            className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-all resize-none"
            placeholder="Type your message here..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all uppercase text-xs tracking-[4px] shadow-lg mt-4 cursor-pointer active:scale-95"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;