import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Users, 
  MessageSquare, 
  ChevronRight,
  Play as PlayIcon,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Watch() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/ongoing-games/');
        const data = await response.json();
        setGames(data);
      } catch (e) {
        console.error("Failed to load ongoing games", e);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
    const interval = setInterval(fetchGames, 5000); // Polling every 5s for demo
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-[#0E1013] text-white font-sans min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,90,31,0.03)_0%,_transparent_50%)]">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-[#FF5A1F]/10 rounded-xl flex items-center justify-center text-[#FF5A1F] border border-[#FF5A1F]/20">
                  <Eye size={20} />
               </div>
               <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Spectator Mode</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter mb-4">Live <span className="text-[#FF5A1F]">Arenas</span></h1>
            <p className="text-gray-400 text-sm max-w-lg">Watch the grandmasters in real-time and join the global analysis.</p>
          </div>
          
          <div className="flex gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                   type="text" 
                   placeholder="Search player or game..." 
                   className="bg-[#121418] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#FF5A1F]/50 transition-all w-64"
                />
             </div>
          </div>
        </header>

        {/* Live Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
           {loading ? (
             <div className="col-span-full h-64 flex items-center justify-center text-gray-600 font-black italic uppercase text-xs">Scanning the global net...</div>
           ) : games.length === 0 ? (
             <div className="col-span-full h-64 flex flex-col items-center justify-center bg-[#121418] rounded-[40px] border border-dashed border-white/10 space-y-4">
                <PlayIcon size={48} className="text-gray-800" />
                <p className="text-gray-600 font-black italic uppercase text-xs text-center px-10">No live matches at this moment.<br/>Start a game to be the first!</p>
             </div>
           ) : games.map((game) => (
             <div 
               key={game.id} 
               onClick={() => navigate(`/watch/${game.id}`)}
               className="group bg-[#121418] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#FF5A1F]/30 transition-all hover:scale-[1.02] cursor-pointer shadow-2xl"
             >
                <div className="relative aspect-video bg-[#0A0C0F] p-4 flex items-center justify-center overflow-hidden">
                   {/* Mini Board Preview (Simple SVG) */}
                   <div className="w-32 h-32 grid grid-cols-8 rotate-3 opacity-20 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                      {[...Array(64)].map((_, i) => (
                        <div key={i} className={`w-full h-full ${(Math.floor(i/8) + i) % 2 === 0 ? 'bg-white/10' : 'bg-transparent'}`}></div>
                      ))}
                   </div>
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-transparent"></div>
                   
                   <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#FF5A1F] text-white text-[8px] font-black uppercase px-3 py-1 rounded-full animate-pulse">Live</span>
                      <span className="bg-black/50 text-gray-300 text-[8px] font-black uppercase px-3 py-1 rounded-full backdrop-blur-md">Blitz</span>
                   </div>
                   
                   <div className="absolute bottom-4 left-0 right-0 px-6 flex justify-between items-end">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Board #0{game.id}</span>
                         <h3 className="text-lg font-black">{game.white_username} vs {game.black_username}</h3>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex items-center gap-1.5 text-gray-500">
                            <Users size={14} />
                            <span className="text-[10px] font-black">124</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-gray-500">
                            <MessageSquare size={14} />
                            <span className="text-[10px] font-black">{game.comments?.length || 0}</span>
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="p-6 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Move 24 • White to move</span>
                   </div>
                   <ChevronRight className="text-gray-700 group-hover:text-[#FF5A1F] transition-colors" size={20} />
                </div>
             </div>
           ))}
        </div>

      </main>
    </div>
  );
}

export default Watch;
