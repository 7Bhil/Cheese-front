import React, { useState } from 'react';
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
  Target
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

function Profile() {
  const achievements = [
    { icon: Sun, label: 'Savannah Sun', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { icon: Zap, label: 'Speed Demon', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Shield, label: 'The Wall', color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { icon: MousePointer2, label: 'Tactician', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: Trophy, label: 'Benin Cup', color: 'text-yellow-600', bg: 'bg-yellow-600/10' },
    { icon: Users, label: 'Club Mentor', color: 'text-gray-400', bg: 'bg-gray-400/10' },
  ];

  const recentGames = [
    { result: 'W', opponent: 'Grandmaster_Saliu', opening: 'Sicilian Defense, Najdorf Variation', date: '2 days ago', accuracy: '92.4%', class: 'bg-green-500/20 text-green-500' },
    { result: 'L', opponent: 'Iron_Pawn88', opening: 'French Defense, Advance Variation', date: '3 days ago', accuracy: '78.1%', class: 'bg-red-500/20 text-red-500' },
    { result: 'D', opponent: 'Knight_Rider_NG', opening: 'Caro-Kann Defense', date: '5 days ago', accuracy: '84.0%', class: 'bg-gray-500/20 text-gray-400' },
    { result: 'W', opponent: 'Blitz_Queen_22', opening: "Queen's Gambit Declined", date: '1 week ago', accuracy: '95.2%', class: 'bg-green-500/20 text-green-500' },
  ];

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
                       <h2 className="text-4xl font-black tracking-tight">Koffi_Grandmaster</h2>
                       <span className="text-2xl">🇧🇯</span>
                    </div>
                    <div className="flex gap-8">
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Global ELO</p>
                          <p className="text-2xl font-black text-[#FF5A1F]">1850</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Global Rank</p>
                          <p className="text-2xl font-black text-white">#1,402</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Peak Rating</p>
                          <p className="text-2xl font-black text-gray-400">1920</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 relative z-10">
                 <button className="flex items-center gap-2 px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold text-sm">
                    <Share2 size={18} /> Share
                 </button>
                 <button className="px-8 py-3 bg-[#FF5A1F] hover:bg-[#ff6c35] text-white rounded-xl shadow-lg shadow-[#FF5A1F]/30 transition-all font-bold text-sm active:scale-95">
                    Challenge
                 </button>
              </div>

              {/* Decorative Chess Background */}
              <div className="absolute right-[-5%] top-[-10%] opacity-[0.03] rotate-12 pointer-events-none">
                 <Trophy size={300} />
              </div>
           </div>

           {/* Progression Bar */}
           <div className="bg-[#121418] border border-white/5 p-6 rounded-3xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold">Title Progression</h3>
                 <span className="text-[11px] font-bold text-[#FF5A1F] uppercase tracking-widest">150 ELO to Candidate Master</span>
              </div>
              
              <div className="relative h-14 bg-[#0A0C0F] rounded-2xl flex p-1.5 gap-2">
                 <div className="flex-1 bg-white/5 rounded-xl flex items-center justify-center gap-2 border border-white/5 grayscale opacity-40">
                    <span className="text-xs font-bold uppercase tracking-widest">Pawn</span>
                 </div>
                 <div className="flex-1 bg-white/5 rounded-xl flex items-center justify-center gap-2 border border-white/5 grayscale opacity-40">
                    <span className="text-xs font-bold uppercase tracking-widest">Knight</span>
                 </div>
                 <div className="flex-1 bg-white/5 rounded-xl flex items-center justify-center gap-2 border border-white/5 grayscale opacity-40">
                    <span className="text-xs font-bold uppercase tracking-widest">Rook</span>
                 </div>
                 <div className="flex-1 bg-[#FF5A1F] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FF5A1F]/20">
                    <Target size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">CM</span>
                 </div>
                 <div className="flex-1 border border-dashed border-white/10 rounded-xl flex items-center justify-center grayscale opacity-20">
                    <span className="text-xs font-bold uppercase tracking-widest">Grandmaster</span>
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

                 <div className="mt-auto pt-10 w-full">
                    <div className="w-full h-px bg-white/5 mb-6"></div>
                    <button className="w-full text-[11px] font-bold text-[#FF5A1F] uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all flex items-center justify-center gap-2 group">
                       View All 24 Badges <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>

              {/* Recent Games Column */}
              <div className="col-span-9 space-y-8">
                 
                 <div className="bg-[#121418] border border-white/5 rounded-[40px] p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-xl font-bold">Recent Games</h3>
                       <span className="text-[10px] font-bold text-[#FF5A1F] uppercase tracking-widest cursor-pointer hover:underline">Full History</span>
                    </div>

                    <div className="space-y-4">
                       {recentGames.map((game, idx) => (
                          <div key={idx} className="bg-[#0A0C0F] border border-white/5 p-5 rounded-3xl flex items-center justify-between group hover:border-[#FF5A1F]/30 transition-all cursor-pointer">
                             <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 ${game.class} rounded-2xl flex items-center justify-center font-black text-xl shadow-inner`}>
                                   {game.result}
                                </div>
                                <div>
                                   <div className="flex items-center gap-3">
                                      <span className="text-sm text-gray-500">vs</span>
                                      <span className="font-bold text-base">{game.opponent}</span>
                                      <span className="text-[10px] text-gray-600 font-bold uppercase ml-2">{game.date}</span>
                                   </div>
                                   <p className="text-xs text-gray-500 italic mt-0.5">{game.opening}</p>
                                </div>
                             </div>

                             <div className="flex items-center gap-10">
                                <div className="text-right">
                                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Accuracy</p>
                                   <p className="text-xl font-black text-green-400">{game.accuracy}</p>
                                </div>
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-[#FF5A1F] group-hover:text-white transition-all">
                                   <LineChart size={18} />
                                </div>
                             </div>
                          </div>
                       ))}
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
