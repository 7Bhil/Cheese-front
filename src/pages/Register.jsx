import React from 'react';
import { User, Mail, AtSign, Lock, ShieldCheck, HelpCircle, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../App.css';

function Register() {
  const [startingRank, setStartingRank] = React.useState('pawn');

  const ranks = [
    { id: 'pawn', name: 'Pawn', level: 'Beginner', icon: '♟️' },
    { id: 'knight', name: 'Knight', level: 'Intermediate', icon: '♞' },
    { id: 'rook', name: 'Rook', level: 'Advanced', icon: '♜' },
    { id: 'king', name: 'King', level: 'Master', icon: '♚' },
  ];

  return (
    <div className="min-h-screen bg-[#0E1013] text-white flex items-center justify-center font-sans tracking-wide py-12">
      <div className="max-w-[1100px] w-full flex flex-col md:flex-row items-center justify-center p-6 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Side - Legacy/Brand */}
        <div className="hidden md:flex flex-col items-start max-w-[450px] w-full">
           <div className="relative w-full aspect-square bg-[#121418] rounded-3xl flex items-center justify-center overflow-hidden group shadow-2xl border border-white/5">
             {/* Dynamic Glowing effect */}
             <div className="absolute inset-0 bg-[#FF5A1F] opacity-[0.1] blur-[80px] group-hover:opacity-25 transition-opacity duration-1000"></div>
             
             {/* The King Image */}
             <img 
               src="/hero-king.png" 
               alt="Knight Link Legacy" 
               className="relative z-10 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
             />
           </div>
           
           <div className="mt-10 inline-block px-3 py-1 bg-[#241B18] border border-[#FF5A1F]/30 rounded text-[#FF5A1F] text-[10px] font-bold tracking-[0.1em] uppercase mb-4">
               The African Grandmaster Path
           </div>

           <h1 className="text-5xl font-black text-white mb-4 leading-tight tracking-tight">
             Forge Your <span className="text-[#FF5A1F]">Legacy</span>
           </h1>
           <p className="text-gray-400 italic text-[17px] leading-relaxed mb-8 font-serif">
             "The strategic elder knows that every pawn carries the potential of a queen. Start your ascent today."
           </p>
           
           <div className="flex items-center gap-4">
             <div className="w-16 h-[2px] bg-[#FF5A1F]"></div>
             <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.25em] uppercase">Grandmaster Destiny</span>
           </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-lg bg-[#0E1013]">
           <div className="flex items-center gap-3 mb-10">
             <div className="text-[#FF5A1F]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF5A1F" className="drop-shadow-[0_0_8px_rgba(255,90,31,0.6)]">
                 <path d="M4 22h16v-2H4v2zm2-4h12v-2H6v2zm1-4h10v-2H7v2zm1.5-4h7v-2h-7v2zm-2-4h11V4h-11v2z"/>
               </svg>
             </div>
             <h2 className="text-3xl font-black text-white tracking-wide">Knight<span className="text-[#FF5A1F]">Link</span></h2>
           </div>

           <h3 className="text-2xl font-bold text-white mb-2">Create Account</h3>
           <p className="text-gray-400 text-sm mb-10">Welcome, Strategist. Fill in your details below.</p>

           <form className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-500 group-focus-within:text-[#FF5A1F] transition-colors" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Kwame Mensah"
                      className="w-full bg-[#14161A] border-t-0 border-x-0 border-b-2 border-gray-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF5A1F] transition-all placeholder-gray-600 text-[14px] hover:bg-[#181a1f]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Username</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <AtSign className="h-4 w-4 text-gray-500 group-focus-within:text-[#FF5A1F] transition-colors" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="savannah_king"
                      className="w-full bg-[#14161A] border-t-0 border-x-0 border-b-2 border-gray-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF5A1F] transition-all placeholder-gray-600 text-[14px] hover:bg-[#181a1f]"
                    />
                  </div>
                </div>
             </div>

             <div className="space-y-2">
               <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Mail className="h-4 w-4 text-gray-500 group-focus-within:text-[#FF5A1F] transition-colors" />
                 </div>
                 <input 
                   type="email" 
                   placeholder="kwame@knightlink.com"
                   className="w-full bg-[#14161A] border-t-0 border-x-0 border-b-2 border-gray-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF5A1F] transition-all placeholder-gray-600 text-[14px] hover:bg-[#181a1f]"
                 />
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-[#FF5A1F] transition-colors" />
                    </div>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-[#14161A] border-t-0 border-x-0 border-b-2 border-gray-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF5A1F] transition-all placeholder-gray-600 text-[14px] hover:bg-[#181a1f]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Confirm</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <ShieldCheck className="h-4 w-4 text-gray-500 group-focus-within:text-[#FF5A1F] transition-colors" />
                    </div>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-[#14161A] border-t-0 border-x-0 border-b-2 border-gray-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF5A1F] transition-all placeholder-gray-600 text-[14px] hover:bg-[#181a1f]"
                    />
                  </div>
                </div>
             </div>

             <div className="pt-4">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Select Starting Rank</label>
                <div className="grid grid-cols-4 gap-3">
                   {ranks.map((rank) => (
                     <button
                       key={rank.id}
                       type="button"
                       onClick={() => setStartingRank(rank.id)}
                       className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                         startingRank === rank.id 
                         ? 'bg-[#FF5A1F]/10 border-[#FF5A1F] shadow-[0_0_15px_rgba(255,90,31,0.1)]' 
                         : 'bg-[#14161A] border-gray-800 hover:border-gray-600'
                       }`}
                     >
                       <span className={`text-xl mb-1 ${startingRank === rank.id ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                         {rank.icon}
                       </span>
                       <span className={`text-[10px] font-bold uppercase tracking-tighter ${startingRank === rank.id ? 'text-[#FF5A1F]' : 'text-gray-500'}`}>
                         {rank.name}
                       </span>
                     </button>
                   ))}
                </div>
             </div>

             <button type="button" className="w-full bg-[#FF5A1F] hover:bg-[#ff6c35] text-white font-bold rounded-lg py-4 mt-6 shadow-[0_4px_14px_rgba(255,90,31,0.25)] hover:shadow-[0_6px_20px_rgba(255,90,31,0.4)] transition-all transform hover:-translate-y-[1px] tracking-wide text-[15px] flex items-center justify-center gap-2">
               Create Account <span>→</span>
             </button>
           </form>
           
           <div className="mt-10 text-center">
             <p className="text-gray-400 text-sm">
                Already have an account? <Link to="/login" className="text-[#FF5A1F] font-bold hover:underline transition-all">Login</Link>
             </p>
           </div>
        </div>
        
      </div>

      {/* Decorative background elements matching the image edge */}
      <div className="fixed bottom-0 right-0 opacity-20 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="#FF5A1F">
           <rect x="60" y="80" width="10" height="10" />
           <rect x="80" y="80" width="10" height="10" />
           <rect x="70" y="70" width="10" height="10" />
           <rect x="90" y="70" width="10" height="10" />
           <rect x="80" y="60" width="10" height="10" />
        </svg>
      </div>
    </div>
  );
}

export default Register;
