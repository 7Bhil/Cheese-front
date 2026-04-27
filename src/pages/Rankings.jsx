import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Trophy, 
  TrendingUp, 
  Users,
  Search,
  Filter,
  Medal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Rankings() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChallenge = async (player) => {
    try {
       const response = await fetch('http://localhost:8000/api/create-duel/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ opponent_id: player.id })
       });
       const data = await response.json();
       if (data.game_id) {
          localStorage.setItem('knightlink_active_game_id', data.game_id);
          localStorage.removeItem('knightlink_active_game'); 
          navigate('/play');
       }
    } catch (e) {
       console.error("Challenge failed", e);
    }
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leaderboard/');
        const data = await response.json();
        setLeaderboard(data);
      } catch (e) {
        console.error("Failed to load rankings", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="flex bg-[#0E1013] text-white font-sans min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,90,31,0.03)_0%,_transparent_50%)]">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-[#FF5A1F]/10 rounded-xl flex items-center justify-center text-[#FF5A1F] border border-[#FF5A1F]/20">
                  <Globe size={20} />
               </div>
               <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Global Competition</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter mb-4">World <span className="text-[#FF5A1F]">Hall of Fame</span></h1>
            <p className="text-gray-400 text-sm max-w-lg">The elite arena where legends are forged. Only the sharpest minds ascend this throne.</p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-[#121418] border border-white/5 p-4 rounded-2xl flex items-center gap-6 shadow-2xl">
                <div className="text-center px-4 border-r border-white/5">
                   <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Active Players</p>
                   <p className="font-black text-white">4,281</p>
                </div>
                <div className="text-center px-4">
                   <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Live Games</p>
                   <p className="font-black text-[#FF5A1F] animate-pulse">892</p>
                </div>
             </div>
          </div>
        </header>

        {/* Podium Top 3 */}
        {!loading && leaderboard.length >= 3 && (
        <div className="grid grid-cols-3 gap-8 mb-16 items-end">
           {/* Rank 2 */}
           <div className="bg-[#121418] border border-white/5 p-8 rounded-[40px] text-center relative pt-16 shadow-2xl hover:scale-105 transition-all">
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-20 h-20 rounded-3xl bg-[#C0C0C0] p-1 shadow-2xl shadow-gray-500/20">
                 <div className="w-full h-full bg-[#0A0C0F] rounded-2xl flex items-center justify-center font-black text-2xl border border-white/10">
                    {leaderboard[1].username.substring(0, 2).toUpperCase()}
                 </div>
                 <div className="absolute bottom-[-10px] right-[-10px] w-10 h-10 bg-[#C0C0C0] rounded-full flex items-center justify-center text-[#121418]">
                    <Medal size={20} weight="fill" />
                 </div>
              </div>
              <h3 className="text-xl font-black mb-1">{leaderboard[1].username}</h3>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">{leaderboard[1].country || 'International'}</p>
              <div className="text-3xl font-black italic text-white tracking-tighter">{leaderboard[1].elo}</div>
              <p className="text-[9px] font-black text-[#C0C0C0] uppercase tracking-widest mt-1">Silver Tier</p>
           </div>

           {/* Rank 1 */}
           <div className="bg-[#16181D] border-2 border-[#FF5A1F]/30 p-10 rounded-[50px] text-center relative pt-20 shadow-[0_20px_50px_rgba(255,90,31,0.15)] hover:scale-105 transition-all">
              <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-32 h-32 rounded-[40px] bg-gradient-to-br from-yellow-400 to-orange-600 p-1 shadow-2xl shadow-yellow-500/30">
                 <div className="w-full h-full bg-[#0A0C0F] rounded-[36px] flex items-center justify-center font-black text-4xl border border-white/10">
                    {leaderboard[0].username.substring(0, 2).toUpperCase()}
                 </div>
                 <div className="absolute bottom-[-5px] right-[-5px] w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-[#121418] shadow-xl">
                    <Trophy size={28} fill="currentColor" />
                 </div>
              </div>
              <h3 className="text-2xl font-black mb-1 text-[#FF5A1F]">{leaderboard[0].username}</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{leaderboard[0].country || 'International'}</p>
              <div className="text-5xl font-black italic text-white tracking-tighter mb-2">{leaderboard[0].elo}</div>
              <p className="text-xs font-black text-yellow-500 uppercase tracking-[0.3em]">Grandmaster Elite</p>
           </div>

           {/* Rank 3 */}
           <div className="bg-[#121418] border border-white/5 p-8 rounded-[40px] text-center relative pt-16 shadow-2xl hover:scale-105 transition-all">
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-20 h-20 rounded-3xl bg-[#CD7F32] p-1 shadow-2xl shadow-orange-900/20">
                 <div className="w-full h-full bg-[#0A0C0F] rounded-2xl flex items-center justify-center font-black text-2xl border border-white/10">
                    {leaderboard[2].username.substring(0, 2).toUpperCase()}
                 </div>
                 <div className="absolute bottom-[-10px] right-[-10px] w-10 h-10 bg-[#CD7F32] rounded-full flex items-center justify-center text-[#121418]">
                    <Medal size={20} />
                 </div>
              </div>
              <h3 className="text-xl font-black mb-1">{leaderboard[2].username}</h3>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">{leaderboard[2].country || 'International'}</p>
              <div className="text-3xl font-black italic text-white tracking-tighter">{leaderboard[2].elo}</div>
              <p className="text-[9px] font-black text-[#CD7F32] uppercase tracking-widest mt-1">Bronze Tier</p>
           </div>
        </div>
        )}

        {/* Regular list */}
        <div className="bg-[#121418] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
           <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div className="flex gap-4">
                 <button className="bg-[#FF5A1F] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Global</button>
                 <button className="bg-white/5 text-gray-500 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">By Country</button>
                 <button className="bg-white/5 text-gray-500 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">By Club</button>
              </div>
              <div className="flex gap-2">
                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 hover:text-[#FF5A1F] cursor-pointer">
                    <Filter size={18} />
                 </div>
              </div>
           </div>
           
           <table className="w-full">
              <thead>
                 <tr className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="p-8 text-left"># Rank</th>
                    <th className="p-8 text-left">Grandmaster</th>
                    <th className="p-8 text-left text-center">Status</th>
                    <th className="p-8 text-center text-center">Win Rate</th>
                    <th className="p-8 text-right">ELO Score</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {loading ? (
                    <tr><td colSpan="5" className="p-12 text-center text-gray-600 font-black italic uppercase text-xs">Summoning the legends...</td></tr>
                 ) : leaderboard.map((player, idx) => (
                    <tr key={player.id} className="group hover:bg-white/5 transition-colors">
                       <td className="p-8 font-black text-2xl opacity-10">{idx + 1}</td>
                       <td className="p-8">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 bg-[#0A0C0F] rounded-2xl flex items-center justify-center text-[12px] font-black border border-white/5 group-hover:border-[#FF5A1F]/30 transition-all">
                                {player.username.substring(0, 2).toUpperCase()}
                             </div>
                             <div>
                                <h4 className="font-bold text-gray-200 group-hover:text-white transition-colors">{player.username}</h4>
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{player.country || 'International'}</p>
                             </div>
                          </div>
                       </td>
                       <td className="p-8 text-center">
                          <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[8px] font-black uppercase tracking-widest">Online</span>
                       </td>
                       <td className="p-8 text-center">
                          <div className="flex flex-col items-center gap-1">
                             <span className="font-black text-sm">74.2%</span>
                             <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[74%]"></div>
                             </div>
                          </div>
                       </td>
                       <td className="p-8 text-right">
                          <div className="flex items-center justify-end gap-4">
                             <div className="text-2xl font-black italic tracking-tighter text-white group-hover:text-[#FF5A1F] transition-colors">{player.elo}</div>
                             <button 
                               onClick={() => handleChallenge(player)}
                               className="bg-white/5 hover:bg-[#FF5A1F] text-[8px] font-black uppercase px-4 py-2 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                Challenge
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

      </main>
    </div>
  );
}

export default Rankings;
