import React from 'react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Extension, 
  Trophy, 
  User, 
  Settings, 
  HelpCircle, 
  Zap, 
  Timer, 
  Activity,
  Globe,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Gamepad2, label: 'Play', active: false },
    { icon: Trophy, label: 'Puzzles', active: false },
    { icon: Activity, label: 'Rankings', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

  const rankings = [
    { rank: '01', name: 'Kofi_Annan', region: 'Ghana', elo: 2842, avatar: 'KA' },
    { rank: '02', name: 'Olu_Blitz', region: 'Nigeria', elo: 2815, avatar: 'OB' },
    { rank: '42', name: 'You (You)', region: 'Lagos, NG', elo: 2148, avatar: 'ME', highlight: true },
    { rank: '04', name: 'Sene_Tactics', region: 'Senegal', elo: 2790, avatar: 'ST' },
  ];

  return (
    <div className="flex h-screen bg-[#0E1013] text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0C0F] border-r border-white/5 flex flex-col p-6">
        <div className="mb-10">
           <h2 className="text-xl font-black tracking-wider">Knight<span className="text-[#FF5A1F]">Link</span></h2>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Grandmaster Tier</p>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                item.active ? 'bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
           <button className="w-full bg-[#FF5A1F] hover:bg-[#ff6c35] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FF5A1F]/20 transition-all active:scale-95 text-sm">
             Quick Match
           </button>
           
           <div className="space-y-2 pt-4 border-t border-white/5">
              <div className="flex items-center gap-4 px-4 py-2 text-gray-400 hover:text-white cursor-pointer text-sm font-medium">
                <Settings size={18} />
                <span>Settings</span>
              </div>
              <div className="flex items-center gap-4 px-4 py-2 text-gray-400 hover:text-white cursor-pointer text-sm font-medium">
                <HelpCircle size={18} />
                <span>Help</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,90,31,0.03)_0%,_transparent_50%)]">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black mb-2">Sawubona, Grandmaster</h1>
            <p className="text-gray-400 text-sm max-w-md">Strategy is the bridge between heritage and future. Your next move awaits on the board.</p>
          </div>
          
          <div className="bg-[#16181D] border border-white/5 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
             <div className="w-12 h-12 bg-[#FF5A1F]/20 rounded-xl flex items-center justify-center text-[#FF5A1F]">
                <User size={24} />
             </div>
             <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Current ELO</p>
                <p className="text-2xl font-black text-[#FF5A1F]">2148</p>
             </div>
          </div>
        </header>

        {/* Top Grid */}
        <div className="grid grid-cols-12 gap-8 mb-8">
           
           {/* Quick Play Options */}
           <div className="col-span-8 bg-[#121418] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-2xl font-bold flex items-center gap-3 mb-8">
                    <Zap className="text-[#FF5A1F]" fill="#FF5A1F" /> Quick Play
                 </h3>
                 
                 <div className="grid grid-cols-3 gap-6">
                    <div className="bg-[#0A0C0F] border border-white/5 p-6 rounded-2xl text-center group hover:border-[#FF5A1F]/50 transition-all cursor-pointer">
                       <Timer className="mx-auto mb-4 text-gray-500 group-hover:text-white" />
                       <p className="text-xl font-bold">Bullet</p>
                       <p className="text-[10px] text-gray-500 mt-1">1 + 0</p>
                    </div>
                    <div className="bg-[#0A0C0F] border-2 border-[#FF5A1F] p-6 rounded-2xl text-center cursor-pointer shadow-[0_0_20px_rgba(255,90,31,0.1)]">
                       <Zap className="mx-auto mb-4 text-[#FF5A1F]" fill="#FF5A1F" />
                       <p className="text-xl font-bold">Blitz</p>
                       <p className="text-[10px] text-[#FF5A1F] mt-1 font-bold">3 + 2</p>
                    </div>
                    <div className="bg-[#0A0C0F] border border-white/5 p-6 rounded-2xl text-center group hover:border-[#FF5A1F]/50 transition-all cursor-pointer">
                       <Timer className="mx-auto mb-4 text-gray-500 group-hover:text-white" />
                       <p className="text-xl font-bold">Rapid</p>
                       <p className="text-[10px] text-gray-500 mt-1">10 + 5</p>
                    </div>
                 </div>
              </div>
              {/* Decoration */}
              <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.05]">
                 <LayoutDashboard size={150} />
              </div>
           </div>

           {/* Mini Stats */}
           <div className="col-span-4 bg-[#121418] border border-white/5 p-8 rounded-3xl">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Mini Stats</h4>
              
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Win Rate</p>
                    <p className="text-green-400 font-bold">64.2%</p>
                 </div>
                 <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Total Games</p>
                    <p className="font-bold">1,204</p>
                 </div>
                 <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Rank</p>
                    <p className="text-[#FF5A1F] font-bold">#42 (NG)</p>
                 </div>
              </div>

              <div className="mt-8">
                 <div className="w-full bg-[#0A0C0F] h-2 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full w-[64%]"></div>
                 </div>
              </div>
           </div>

        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-12 gap-8">
           
           {/* Puzzle of the Day */}
           <div className="col-span-5 bg-[#121418] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              <div className="p-6 flex justify-between items-center bg-[#16181D]/50 border-b border-white/5">
                 <h3 className="text-lg font-bold flex items-center gap-3">
                    <Settings size={18} className="text-[#FF5A1F]" /> Puzzle of the Day
                 </h3>
                 <span className="px-2 py-1 bg-[#241B18] border border-[#FF5A1F]/30 rounded text-[#FF5A1F] text-[9px] font-bold uppercase">Hard • 2200</span>
              </div>
              
              <div className="relative flex-1 group">
                 <img 
                   src="/puzzle-bg.png" 
                   alt="Chess Puzzle" 
                   className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-[#FF5A1F] hover:bg-[#ff6c35] text-white font-bold py-3 px-8 rounded-xl shadow-xl flex items-center gap-3 transition-all active:scale-95">
                       <Plus size={20} /> Solve Puzzle
                    </button>
                 </div>
              </div>

              <div className="p-6 bg-[#0A0C0F]">
                 <p className="text-gray-500 italic text-xs text-center">"White to move and deliver mate in 3."</p>
              </div>
           </div>

           {/* Regional Rankings */}
           <div className="col-span-7 bg-[#121418] border border-white/5 rounded-3xl p-8 shadow-2xl relative">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-xl font-bold flex items-center gap-3">
                    <Globe size={22} className="text-[#FF5A1F]" /> Regional Rankings
                 </h3>
                 <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest leading-none">West Africa</span>
              </div>

              <table className="w-full text-sm">
                 <thead>
                    <tr className="text-gray-500 text-[11px] font-bold uppercase tracking-widest border-b border-white/5">
                       <th className="text-left pb-4 font-bold">#</th>
                       <th className="text-left pb-4 font-bold">Grandmaster</th>
                       <th className="text-left pb-4 font-bold">Region</th>
                       <th className="text-right pb-4 font-bold">ELO</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {rankings.map((item, idx) => (
                       <tr key={idx} className={`group hover:bg-white/5 transition-colors ${item.highlight ? 'text-[#FF5A1F]' : ''}`}>
                          <td className="py-4 font-bold opacity-60">{item.rank}</td>
                          <td className="py-4 flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${item.highlight ? 'bg-[#FF5A1F] text-white' : 'bg-[#16181D] text-gray-400'}`}>
                                {item.avatar}
                             </div>
                             <span className="font-bold">{item.name}</span>
                          </td>
                          <td className="py-4 text-gray-400 text-xs">{item.region}</td>
                          <td className="py-4 text-right font-black tracking-wider text-base">{item.elo}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>


           </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;
