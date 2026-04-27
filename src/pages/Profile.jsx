import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Trophy, 
  Share2, 
  ChevronRight, 
  Sun, 
  Zap, 
  Shield, 
  MousePointer2, 
  Users,
  LineChart,
  Target,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/profile/');
        const data = await response.json();
        setProfileData(data);
      } catch (e) {
        console.error("Failed to load profile", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const stats = profileData?.user || localUser || { elo: 800, wins: 0, losses: 0, draws: 0 };
  const history = profileData?.recent_games || [];
  
  const getRank = (elo) => {
    if (elo < 1000) return { title: 'Pawn', color: 'bg-gray-500', next: 1000 - elo, progress: (elo/1000)*100 };
    if (elo < 1400) return { title: 'Knight', color: 'bg-blue-500', next: 1400 - elo, progress: ((elo-1000)/400)*100 };
    if (elo < 1800) return { title: 'Rook', color: 'bg-purple-500', next: 1800 - elo, progress: ((elo-1400)/400)*100 };
    if (elo < 2200) return { title: 'CM', color: 'bg-orange-500', next: 2200 - elo, progress: ((elo-1800)/400)*100 };
    return { title: 'GM', color: 'bg-yellow-500', next: 0, progress: 100 };
  };

  const rankInfo = getRank(stats.elo);

  const achievements = [
    { icon: Sun, label: 'Savannah Sun', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { icon: Zap, label: 'Speed Demon', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Shield, label: 'The Wall', color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { icon: MousePointer2, label: 'Tactician', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: Trophy, label: 'Benin Cup', color: 'text-yellow-600', bg: 'bg-yellow-600/10' },
    { icon: Users, label: 'Club Mentor', color: 'text-gray-400', bg: 'bg-gray-400/10' },
  ];

  if (loading && !localUser) {
    return <div className="bg-[#0E1013] min-h-screen flex items-center justify-center text-white">Summoning your legacy...</div>
  }

  return (
    <div className="flex bg-[#0E1013] text-white font-sans min-h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <nav className="h-16 border-b border-white/5 flex items-center justify-between px-10 bg-[#0A0C0F]/50 backdrop-blur-md sticky top-0 z-50">
           <div className="flex gap-8 text-sm font-bold tracking-wide text-gray-500">
              <span className="hover:text-white cursor-pointer transition-colors">Live Games</span>
              <span className="hover:text-white cursor-pointer transition-colors">Learn</span>
              <span className="hover:text-white cursor-pointer transition-colors text-white border-b-2 border-[#FF5A1F] pb-5 translate-y-2">Community</span>
           </div>
           
           <div className="flex items-center gap-6">
              <Bell size={20} className="text-gray-500 hover:text-white cursor-pointer" />
              <Trophy size={20} className="text-gray-500 hover:text-white cursor-pointer" />
              <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden cursor-pointer">
                 <img src="/koffi-avatar.png" alt="Profile" />
              </div>
           </div>
        </nav>

        {/* Profile Content */}
        <div className="p-10 space-y-8 overflow-y-auto">
           
           {/* Hero Section */}
           <div className="flex items-center justify-between bg-[#121418] border border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-8 relative z-10">
                 <div className="relative group">
                    <div className="w-32 h-32 rounded-[32px] border-4 border-[#FF5A1F] overflow-hidden shadow-[0_0_30px_rgba(255,90,31,0.2)]">
                       <img src="/koffi-avatar.png" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0E1013] border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Online</span>
                    </div>
                 </div>

                  <div>
                    <div className="flex items-center gap-4 mb-2">
                       <h2 className="text-4xl font-black tracking-tight">{stats.username}</h2>
                       <span className="text-2xl">{stats.country || '🌍'}</span>
                    </div>
                    <div className="flex gap-8">
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Global ELO</p>
                          <p className="text-2xl font-black text-[#FF5A1F]">{stats.elo}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Status</p>
                          <p className="text-2xl font-black text-white">{rankInfo.title}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Games Played</p>
                          <p className="text-2xl font-black text-gray-400">{stats.wins + stats.losses + stats.draws}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 relative z-10">
                 <button className="flex items-center gap-2 px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold text-sm">
                    <Share2 size={18} /> Share
                 </button>
              </div>
           </div>

           {/* Progression Bar */}
           <div className="bg-[#121418] border border-white/5 p-6 rounded-3xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold">Title Progression: <span className="text-[#FF5A1F]">{rankInfo.title}</span></h3>
                 <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                   {rankInfo.next > 0 ? `${rankInfo.next} ELO to next rank` : 'Ultimate Achievement Reached'}
                 </span>
              </div>
              
              <div className="relative h-14 bg-[#0A0C0F] rounded-2xl flex p-1.5 gap-2 overflow-hidden">
                 <div 
                   className="absolute left-0 top-0 bottom-0 bg-[#FF5A1F]/20 border-r-2 border-[#FF5A1F] transition-all duration-1000"
                   style={{ width: `${rankInfo.progress}%` }}
                 ></div>
                 <div className="flex-1 z-10 flex items-center justify-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${rankInfo.title === 'Pawn' ? 'text-white' : 'text-gray-700'}`}>Pawn</span>
                 </div>
                 <div className="flex-1 z-10 flex items-center justify-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${rankInfo.title === 'Knight' ? 'text-white' : 'text-gray-700'}`}>Knight</span>
                 </div>
                 <div className="flex-1 z-10 flex items-center justify-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${rankInfo.title === 'Rook' ? 'text-white' : 'text-gray-700'}`}>Rook</span>
                 </div>
                 <div className="flex-1 z-10 flex items-center justify-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${rankInfo.title === 'CM' ? 'text-white' : 'text-gray-700'}`}>CM</span>
                 </div>
                 <div className="flex-1 z-10 flex items-center justify-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${rankInfo.title === 'GM' ? 'text-white' : 'text-gray-700'}`}>GM</span>
                 </div>
              </div>
           </div>

           {/* Main Grid */}
           <div className="grid grid-cols-12 gap-8">
              
              {/* Achievements Column */}
              <div className="col-span-3 bg-[#121418] border border-white/5 p-8 rounded-[40px] flex flex-col items-center">
                 <div className="flex justify-between w-full items-center mb-8">
                    <h3 className="text-lg font-bold">Achievements</h3>
                    <Trophy className="text-[#FF5A1F]" size={18} />
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4 w-full">
                    {achievements.map((item, idx) => (
                       <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                          <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center transition-all group-hover:scale-110`}>
                             <item.icon className={item.color} size={22} />
                          </div>
                          <span className="text-[9px] text-gray-500 font-bold uppercase text-center">{item.label}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Recent Games Column */}
              <div className="col-span-9 space-y-8">
                 
                 <div className="bg-[#121418] border border-white/5 rounded-[40px] p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-xl font-bold">Match History</h3>
                       <span className="text-[10px] font-bold text-[#FF5A1F] uppercase tracking-widest cursor-pointer hover:underline">View All</span>
                    </div>

                    <div className="space-y-4">
                       {history.length === 0 && <p className="text-gray-600 italic text-sm text-center py-10 uppercase font-black">No matches recorded yet. Conquer the board!</p>}
                       {history.map((g, idx) => {
                          const isWhite = g.white_player === stats.id;
                          const outcome = g.winner === stats.id ? 'W' : (g.winner === null ? 'D' : 'L');
                          const resultColor = outcome === 'W' ? 'bg-green-500/20 text-green-500' : (outcome === 'D' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-500');
                          
                          return (
                            <div key={idx} className="bg-[#0A0C0F] border border-white/5 p-5 rounded-3xl flex items-center justify-between group hover:border-[#FF5A1F]/30 transition-all cursor-pointer">
                               <div className="flex items-center gap-6">
                                  <div className={`w-12 h-12 ${resultColor} rounded-2xl flex items-center justify-center font-black text-xl shadow-inner`}>
                                     {outcome}
                                  </div>
                                  <div>
                                     <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-[#FF5A1F] uppercase tracking-widest">{isWhite ? 'White' : 'Black'}</span>
                                        <span className="text-sm text-gray-500">vs</span>
                                        <span className="font-bold text-base">Grandmaster_AI</span>
                                        <span className="text-[10px] text-gray-600 font-bold uppercase ml-2 italic">
                                          {new Date(g.created_at).toLocaleDateString()}
                                        </span>
                                     </div>
                                     <p className="text-xs text-gray-500 italic mt-0.5">Custom Match • {g.status}</p>
                                  </div>
                               </div>

                               <div className="flex items-center gap-10">
                                  <div className="text-right">
                                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Match ID</p>
                                     <p className="text-xl font-black text-white">#{g.id}</p>
                                  </div>
                                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-[#FF5A1F] group-hover:text-white transition-all">
                                     <LineChart size={18} />
                                  </div>
                               </div>
                            </div>
                          );
                       })}
                    </div>
                 </div>

                 {/* Bottom Grid: Openings & Graph */}
                 <div className="grid grid-cols-12 gap-8">
                    
                    <div className="col-span-4 bg-[#121418] border border-white/5 rounded-[40px] p-8">
                       <h3 className="text-lg font-bold mb-8">Openings</h3>
                       <div className="space-y-8">
                          <div>
                             <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2">
                                <span>Sicilian Defense</span>
                                <span className="text-green-400">64% Win Rate</span>
                             </div>
                             <div className="w-full bg-[#0A0C0F] h-2 rounded-full overflow-hidden">
                                <div className="bg-green-400 h-full w-[64%] shadow-[0_0_10px_rgba(74,222,128,0.3)]"></div>
                             </div>
                          </div>
                          <div>
                             <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2 text-gray-400">
                                <span>Queen's Gambit</span>
                                <span>58% Win Rate</span>
                             </div>
                             <div className="w-full bg-[#0A0C0F] h-2 rounded-full overflow-hidden">
                                <div className="bg-green-400 h-full w-[58%] opacity-60"></div>
                             </div>
                          </div>
                          <div>
                             <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2 text-gray-400">
                                <span>Ruy Lopez</span>
                                <span>42% Win Rate</span>
                             </div>
                             <div className="w-full bg-[#0A0C0F] h-2 rounded-full overflow-hidden">
                                <div className="bg-[#FF5A1F] h-full w-[42%] opacity-40"></div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="col-span-8 bg-[#121418] border border-white/5 rounded-[40px] p-8 relative overflow-hidden">
                       <div className="flex justify-between items-center mb-8 relative z-10">
                          <h3 className="text-xl font-bold">ELO History</h3>
                          <div className="flex bg-[#0A0C0F] rounded-full p-1 border border-white/5">
                             <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer text-[#FF5A1F]">30D</span>
                             <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer text-gray-600 hover:text-white transition-colors">90D</span>
                             <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer text-gray-600 hover:text-white transition-colors">1Y</span>
                          </div>
                       </div>

                       {/* Fake Line Chart with SVG */}
                       <div className="h-40 w-full relative z-10 mt-10">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                             <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.4" />
                                   <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
                                </linearGradient>
                             </defs>
                             <path 
                                d="M0,35 Q10,32 20,34 T40,30 T60,25 T80,28 T100,20 L100,40 L0,40 Z" 
                                fill="url(#lineGrad)" 
                             />
                             <path 
                                d="M0,35 Q10,32 20,34 T40,30 T60,25 T80,28 T100,20" 
                                fill="none" 
                                stroke="#FF5A1F" 
                                strokeWidth="1" 
                                strokeLinecap="round"
                                className="drop-shadow-[0_0_5px_rgba(255,90,31,0.5)]"
                             />
                          </svg>
                          <div className="flex justify-between mt-4 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                             <span>Oct 01</span>
                             <span>Oct 15</span>
                             <span>Oct 30</span>
                          </div>
                       </div>
                    </div>

                 </div>

              </div>

           </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;
