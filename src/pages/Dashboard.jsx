import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Timer, 
  Settings,
  Globe,
  Plus,
  User,
  LayoutDashboard,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [dailyPuzzle, setDailyPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Profile
        if (user) {
          const profResp = await fetch('http://localhost:8000/api/profile/');
          const profData = await profResp.json();
          setProfileData(profData);
        }

        // Fetch Leaderboard
        const leadResp = await fetch('http://localhost:8000/api/leaderboard/');
        const leadData = await leadResp.json();
        setLeaderboard(leadData);

        // Fetch Puzzles
        const puzResp = await fetch('http://localhost:8000/api/puzzles/');
        const puzData = await puzResp.json();
        if (puzData && puzData.length > 0) {
          setDailyPuzzle(puzData[0]);
        }
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = profileData?.user || user || { elo: 800, wins: 0, losses: 0, draws: 0 };
  const wins = Number(stats.wins || 0);
  const losses = Number(stats.losses || 0);
  const draws = Number(stats.draws || 0);
  const totalGames = wins + losses + draws;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : "0.0";

  const rankings = leaderboard.length > 0 ? leaderboard.map((p, idx) => ({
    rank: String(idx + 1).padStart(2, '0'),
    name: p.username,
    region: p.country || 'International',
    elo: p.elo,
    avatar: p.username.substring(0, 2).toUpperCase(),
    highlight: p.id === stats.id
  })) : [
    { rank: '01', name: 'Loading...', region: '...', elo: 0, avatar: '..' },
  ];

  const startQuickPlay = (type) => {
    navigate('/play');
  };

  return (
    <div className="flex bg-[#0E1013] text-white font-sans min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,90,31,0.03)_0%,_transparent_50%)]">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-4xl font-black mb-2 italic tracking-tighter">Sawubona, {stats.username || 'Grandmaster'}</h1>
            <p className="text-gray-400 text-sm max-w-md">Strategy is the bridge between heritage and future. Your next move awaits on the board.</p>
          </div>
          
          <div className="bg-[#16181D] border border-white/5 p-4 rounded-3xl flex items-center gap-4 shadow-2xl group hover:border-[#FF5A1F]/30 transition-all">
             <div className="w-12 h-12 bg-[#FF5A1F]/10 rounded-2xl flex items-center justify-center text-[#FF5A1F] border border-[#FF5A1F]/20">
                <User size={24} />
             </div>
             <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global ELO</p>
                <p className="text-2xl font-black text-[#FF5A1F] tracking-tighter">{stats.elo}</p>
             </div>
          </div>
        </header>

        {/* Top Grid */}
        <div className="grid grid-cols-12 gap-8 mb-8">
           
           {/* Quick Play Options */}
           <div className="col-span-8 bg-[#121418] border border-white/5 p-8 rounded--[40px] relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                 <h3 className="text-xl font-black flex items-center gap-3 mb-8 uppercase tracking-widest">
                    <Zap className="text-[#FF5A1F]" fill="#FF5A1F" size={20} /> Combat Modes
                 </h3>
                 
                 <div className="grid grid-cols-3 gap-6">
                    <div 
                      onClick={() => startQuickPlay('bullet')}
                      className="bg-[#0A0C0F] border border-white/5 p-8 rounded-3xl text-center group hover:border-[#FF5A1F]/50 transition-all cursor-pointer hover:scale-[1.02]">
                       <Timer className="mx-auto mb-4 text-gray-700 group-hover:text-white transition-colors" />
                       <p className="text-xl font-black italic">Bullet</p>
                       <p className="text-[10px] text-gray-600 mt-1 font-bold uppercase tracking-widest">1 + 0</p>
                    </div>
                    <div 
                      onClick={() => startQuickPlay('blitz')}
                      className="bg-[#0A0C0F] border-2 border-[#FF5A1F] p-8 rounded-3xl text-center cursor-pointer shadow-[0_15px_30px_rgba(255,90,31,0.15)] hover:scale-[1.05] transition-all">
                       <Zap className="mx-auto mb-4 text-[#FF5A1F]" fill="#FF5A1F" />
                       <p className="text-xl font-black italic text-white">Blitz</p>
                       <p className="text-[10px] text-[#FF5A1F] mt-1 font-black uppercase tracking-widest">3 + 2</p>
                    </div>
                    <div 
                      onClick={() => startQuickPlay('rapid')}
                      className="bg-[#0A0C0F] border border-white/5 p-8 rounded-3xl text-center group hover:border-[#FF5A1F]/50 transition-all cursor-pointer hover:scale-[1.02]">
                       <Timer className="mx-auto mb-4 text-gray-700 group-hover:text-white transition-colors" />
                       <p className="text-xl font-black italic">Rapid</p>
                       <p className="text-[10px] text-gray-600 mt-1 font-bold uppercase tracking-widest">10 + 5</p>
                    </div>
                 </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] rotate-12">
                 <LayoutDashboard size={200} />
              </div>
           </div>

           {/* Mini Stats */}
           <div className="col-span-4 bg-[#121418] border border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <h4 className="text-[10px] font-black text-[#FF5A1F] uppercase tracking-[0.3em] mb-8">Performance</h4>
              
              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Win Rate</p>
                    <p className="text-green-500 font-black text-lg">{winRate}%</p>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Total Games</p>
                    <p className="font-black text-lg">{totalGames}</p>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Profile Status</p>
                    <p className="text-[#FF5A1F] font-black text-xs uppercase tracking-widest">{stats.rank || 'Active'}</p>
                 </div>
              </div>

              <div className="mt-8 relative z-10">
                 <div className="w-full bg-[#0A0C0F] h-3 rounded-full overflow-hidden p-1">
                    <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: `${winRate}%` }}></div>
                 </div>
              </div>
           </div>

        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-12 gap-8">
           
           {/* Puzzle of the Day */}
           <div className="col-span-5 bg-[#121418] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl flex flex-col group">
              <div className="p-6 flex justify-between items-center bg-[#16181D]/50 border-b border-white/5">
                 <h3 className="text-sm font-black flex items-center gap-3 uppercase tracking-widest">
                    <Settings size={18} className="text-[#FF5A1F]" /> Daily Challenge
                 </h3>
                 <span className="px-3 py-1 bg-[#241B18] border border-[#FF5A1F]/20 rounded-full text-[#FF5A1F] text-[9px] font-black uppercase tracking-widest">
                   {dailyPuzzle?.difficulty || 'Medium'} • {dailyPuzzle?.elo_rating || 1200}
                 </span>
              </div>
              
              <div className="relative flex-1 overflow-hidden">
                 <img 
                   src="/puzzle-bg.png" 
                   alt="Chess Puzzle" 
                   className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#121418] to-transparent"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => navigate('/puzzles')}
                      className="bg-[#FF5A1F] hover:shadow-[0_0_30px_rgba(255,90,31,0.4)] text-white font-black uppercase text-xs tracking-widest py-4 px-8 rounded-2xl shadow-xl flex items-center gap-3 transition-all active:scale-95">
                       <Plus size={20} strokeWidth={3} /> Solve Now
                    </button>
                 </div>
              </div>

              <div className="p-6 bg-[#0A0C0F]/50">
                 <p className="text-gray-500 italic text-xs text-center font-medium opacity-80 line-clamp-1">
                   "{dailyPuzzle?.description || 'Find the best move for White.'}"
                 </p>
              </div>
           </div>

           {/* Active Matches & History */}
           <div className="col-span-12 bg-[#121418] border border-white/5 rounded-[40px] p-8 shadow-2xl relative">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-sm font-black flex items-center gap-3 uppercase tracking-widest">
                    <Activity size={18} className="text-[#FF5A1F]" /> Your ongoing matches
                 </h3>
                 <button onClick={() => navigate('/watch')} className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">View All Arenas</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {profileData?.recent_games?.filter(g => g.status === 'ongoing').map((game) => (
                    <div 
                      key={game.id} 
                      onClick={() => {
                        localStorage.setItem('knightlink_active_game_id', game.id);
                        navigate('/play');
                      }}
                      className="group bg-[#0A0C0F] border border-white/5 p-6 rounded-3xl hover:border-[#FF5A1F]/30 transition-all cursor-pointer">
                       <div className="flex justify-between items-start mb-6">
                          <div className="flex flex-col">
                             <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Room #0{game.id}</span>
                             <h4 className="font-bold">{game.white_username} vs {game.black_username}</h4>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       </div>
                       <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                             <div className="w-8 h-8 bg-[#FF5A1F] rounded-lg border-2 border-[#0A0C0F] flex items-center justify-center font-black text-[10px]">{game.white_username[0]}</div>
                             <div className="w-8 h-8 bg-gray-800 rounded-lg border-2 border-[#0A0C0F] flex items-center justify-center font-black text-[10px]">{game.black_username[0]}</div>
                          </div>
                          <button className="text-[9px] font-black uppercase text-[#FF5A1F] group-hover:underline">Rejoin Match</button>
                       </div>
                    </div>
                 ))}
                 {(!profileData?.recent_games?.some(g => g.status === 'ongoing')) && (
                    <div className="col-span-full py-12 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                       <p className="text-gray-600 font-black italic uppercase text-xs">No active matches. Start a new duel from the Rankings!</p>
                    </div>
                 )}
              </div>
           </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;
