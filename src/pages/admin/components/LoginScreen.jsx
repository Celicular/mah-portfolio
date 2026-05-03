import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md bg-[#111113] p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center mb-6 border border-violet-500/30">
          <Lock className="text-violet-500" size={24} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
        <p className="text-white/50 text-sm mb-8">Enter your password to manage portfolio content.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password..."
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
