import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trophy, 
  Play, 
  ChevronRight,
  Brain,
  Layers,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

function Puzzles() {
  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/puzzles/');
        const data = await response.json();
        setPuzzles(data);
      } catch (e) {
        console.error("Failed to load puzzles", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPuzzles();
  }, []);

  return (
    <div className="flex bg-[#0E1013] text-white font-sans min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,90,31,0.03)_0%,_transparent_50%)]">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-[#FF5A1F]/10 rounded-xl flex items-center justify-center text-[#FF5A1F] border border-[#FF5A1F]/20">
                  <Brain size={20} />
               </div>
               <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Training Ground</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter mb-4">Tactical <span className="text-[#FF5A1F]">Puzzles</span></h1>
            <p className="text-gray-400 text-sm max-w-lg">Sharpen your vision with real game scenarios. Each puzzle is a lesson from the masters.</p>
          </div>
          
          <div className="flex gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF5A1F] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by theme..." 
                  className="bg-[#121418] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold focus:outline-none focus:border-[#FF5A1F]/30 w-64 transition-all"
                />
             </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Solved', value: '124', icon: Trophy, color: 'text-green-500' },
              { label: 'Average Rating', value: '1850', icon: Layers, color: 'text-[#FF5A1F]' },
              { label: 'Success Rate', value: '72%', icon: Play, color: 'text-blue-500' },
              { label: 'Training Time', value: '14h', icon: Clock, color: 'text-purple-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#121418] border border-white/5 p-6 rounded-3xl flex items-center gap-5 shadow-xl hover:translate-y-[-5px] transition-all">
                <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-xl font-black">{stat.value}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Puzzles Grid */}
        <div className="grid grid-cols-12 gap-8">
           <div className="col-span-12">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#FF5A1F] mb-8 flex items-center gap-3">
                 <div className="w-2 h-2 bg-[#FF5A1F] rounded-full animate-pulse"></div> Available Challenges
              </h3>
              
              <div className="space-y-4">
                 {loading ? (
                    <div className="p-12 text-center text-gray-600 font-black italic uppercase text-xs">Fetching lessons from the masters...</div>
                 ) : puzzles.map((puzzle) => (
                    <div key={puzzle.id} className="group bg-[#121418] border border-white/5 hover:border-[#FF5A1F]/30 p-6 rounded-[32px] flex items-center justify-between transition-all hover:bg-[#16181D] cursor-pointer shadow-lg active:scale-[0.99]">
                       <div className="flex items-center gap-8">
                          <div className="w-16 h-16 bg-[#0A0C0F] rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-[#FF5A1F]/20 transition-all overflow-hidden relative">
                             <img src="/puzzle-bg.png" className="opacity-20 absolute inset-0 object-cover" />
                             <span className="text-[10px] font-black text-white z-10">#{puzzle.id}</span>
                          </div>
                          <div>
                             <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                  puzzle.difficulty === 'easy' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
                                  puzzle.difficulty === 'hard' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                                  'bg-blue-500/10 border-blue-500/30 text-blue-500'
                                }`}>
                                   {puzzle.difficulty}
                                </span>
                                <span className="text-gray-600 text-[10px] font-black">•</span>
                                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{puzzle.elo_rating} ELO</span>
                             </div>
                             <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{puzzle.description || 'Find the tactical sequence'}</h4>
                          </div>
                       </div>
                       
                       <button 
                         onClick={() => navigate(`/play?fen=${encodeURIComponent(puzzle.fen)}&solution=${puzzle.solution}&id=${puzzle.id}`)}
                         className="flex items-center gap-3 bg-[#0A0C0F] group-hover:bg-[#FF5A1F] px-6 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all group-hover:text-white text-gray-600 shadow-xl">
                          Solve Challenge <ChevronRight size={14} strokeWidth={4} />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}

export default Puzzles;
