import React, { useState, useEffect, useMemo } from 'react';
import { Chess } from 'chess.js';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Clock, 
  Monitor,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// Reuse Piece component (In real app, move to a shared folder)
const PieceSpectator = ({ type, color }) => {
  const isWhite = color === 'w';
  const fill = isWhite ? '#FF5A1F' : '#111827';
  const stroke = isWhite ? '#FFFFFF' : '#4B5563';
  const pieces = {
    p: <path fill={fill} stroke={stroke} strokeWidth="1.5" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />,
    r: <g fill={fill} stroke={stroke} strokeWidth="1.5"><path d="M9 39h27v-3H9zm3-3v-4h21v4zm-1-22V9h4v2h5V9h5v2h5V9h4v5"/><path d="m34 14-3 3H14l-3-3"/><path d="M31 17v12.5H14V17"/><path d="m31 29.5 1.5 2.5h-20l1.5-2.5"/></g>,
    n: <g fill="none" stroke={stroke} strokeWidth="1.5"><path fill={fill} d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path fill={fill} d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/></g>,
    b: <g fill="none" stroke={stroke} strokeWidth="1.5"><g fill={fill}><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><circle cx="22.5" cy="8" r="2.5"/></g></g>,
    q: <g fill={fill} stroke={stroke} strokeWidth="1.5"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0m16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0M41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0M16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0M33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/></g>,
    k: <g fill="none" stroke={stroke} strokeWidth="1.5"><path d="M22.5 11.63V6M20 8h5"/><path fill={fill} d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path fill={fill} d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10z"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/></g>
  };
  return <svg viewBox="0 0 45 45" className="w-[85%] h-[85%] drop-shadow-md">{pieces[type]}</svg>;
};

function WatchGame() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [game, setGame] = useState(new Chess());
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Initial fetch
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/game/${id}/`);
        const data = await response.json();
        setGameData(data);
        if (data.current_fen) setGame(new Chess(data.current_fen));
      } catch (e) {
        console.error("Failed to load game", e);
      }
    };
    fetchGame();

    // Setup WebSocket
    const socket = new WebSocket(`ws://localhost:8000/ws/game/${id}/`);

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'game_move') {
        setGame(new Chess(data.fen));
      } else if (data.type === 'game_comment') {
        const newComment = {
          username: data.username,
          content: data.comment,
          created_at: new Date().toISOString()
        };
        setGameData(prev => ({
          ...prev,
          comments: [newComment, ...(prev?.comments || [])]
        }));
      }
    };

    return () => socket.close();
  }, [id]);

  const sendComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { navigate('/login'); return; }

    try {
      // 1. Post to DB (persistance)
      await fetch(`http://localhost:8000/api/game/${id}/comment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment })
      });

      // 2. Broadcast via WebSocket (real-time)
      const socket = new WebSocket(`ws://localhost:8000/ws/game/${id}/`);
      socket.onopen = () => {
        socket.send(JSON.stringify({
          type: 'game_comment',
          comment: comment,
          username: user.username
        }));
        socket.close();
      };
      
      setComment("");
    } catch (e) {
      console.error("Failed to send comment", e);
    }
  };

  const boardTiles = useMemo(() => {
    const tiles = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    for (let r of ranks) {
      for (let f of files) {
        const square = `${f}${r}`;
        const piece = game.get(square);
        const isDark = (files.indexOf(f) + ranks.indexOf(r)) % 2 !== 0;
        tiles.push(
          <div key={square} className={`relative w-full aspect-square flex items-center justify-center ${isDark ? 'bg-[#24262E]' : 'bg-[#E3DFD5]'}`}>
            {piece && <PieceSpectator type={piece.type} color={piece.color} />}
          </div>
        );
      }
    }
    return tiles;
  }, [game]);

  if (!gameData) return <div className="bg-[#0E1013] min-h-screen"></div>;

  return (
    <div className="flex bg-[#0E1013] text-white font-sans min-h-screen h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <nav className="h-16 border-b border-white/5 flex items-center justify-between px-10 bg-[#0A0C0F]">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#FF5A1F]/10 px-3 py-1 rounded-full border border-[#FF5A1F]/20">
                 <div className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full animate-pulse"></div>
                 <span className="text-[9px] font-black uppercase text-[#FF5A1F]">Spectating Live</span>
              </div>
              <h2 className="text-sm font-black uppercase tracking-widest">{gameData.white_username} vs {gameData.black_username}</h2>
           </div>
           <button onClick={() => navigate('/watch')} className="text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors flex items-center gap-2">
              <ChevronRight size={14} className="rotate-180" /> Back to Arena
           </button>
        </nav>

        <div className="flex-1 flex p-8 gap-8 items-center justify-center overflow-hidden">
           {/* Board Section */}
           <div className="flex-[1.5] max-w-[600px] flex flex-col gap-6">
              <div className="flex items-center justify-between bg-[#121418] p-4 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-4">
                    <PieceSpectator type="k" color="b" />
                    <span className="font-bold">{gameData.black_username}</span>
                 </div>
                 <div className="bg-[#0A0C0F] px-4 py-2 rounded-xl text-2xl font-black digit-mono text-gray-600">14:02</div>
              </div>

              <div className="w-full aspect-square grid grid-cols-8 border-[10px] border-[#16181D] rounded-2xl overflow-hidden bg-[#16181D] shadow-2xl">
                 {boardTiles}
              </div>

              <div className="flex items-center justify-between bg-[#121418] p-4 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-4">
                    <PieceSpectator type="k" color="w" />
                    <span className="font-bold">{gameData.white_username}</span>
                 </div>
                 <div className="bg-[#FF5A1F] text-white px-4 py-2 rounded-xl text-2xl font-black digit-mono shadow-lg shadow-orange-500/20">09:54</div>
              </div>
           </div>

           {/* Live Chat Section */}
           <div className="flex-1 flex flex-col gap-6 max-w-[400px] h-full overflow-hidden">
              <div className="flex-1 bg-[#121418] border border-white/5 rounded-[40px] flex flex-col overflow-hidden shadow-2xl">
                 <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0A0C0F]/50">
                    <div className="flex items-center gap-3">
                       <MessageSquare className="text-[#FF5A1F]" size={18} />
                       <h3 className="font-black text-xs uppercase tracking-widest">Arena Chat</h3>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                       <Users size={14} />
                       <span className="text-[10px] font-black">124</span>
                    </div>
                 </div>

                 <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                    {gameData.comments?.map((c, idx) => (
                       <div key={idx} className="flex flex-col gap-1.5 animate-in slide-in-from-bottom-2 duration-300">
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black text-[#FF5A1F] uppercase">{c.username}</span>
                             <span className="text-[8px] text-gray-700">{new Date(c.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          <p className="text-xs text-gray-300 bg-white/5 p-3 rounded-2xl rounded-tl-none inline-block border border-white/5 leading-relaxed">
                            {c.content}
                          </p>
                       </div>
                    ))}
                    {(!gameData.comments || gameData.comments.length === 0) && (
                      <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-30 text-center gap-4">
                         <MessageSquare size={40} />
                         <p className="text-[10px] font-black uppercase tracking-widest">No comments yet<br/>Be the first to analyze!</p>
                      </div>
                    )}
                 </div>

                 <form onSubmit={sendComment} className="p-6 bg-[#0A0C0F]/50 border-t border-white/5 flex gap-3">
                    <input 
                       value={comment}
                       onChange={(e) => setComment(e.target.value)}
                       type="text" 
                       placeholder="Send a message..." 
                       className="flex-1 bg-[#121418] border border-white/5 rounded-2xl px-5 py-3 text-xs focus:outline-none focus:border-[#FF5A1F]/50 transition-all font-medium"
                    />
                    <button type="submit" className="w-10 h-10 bg-[#FF5A1F] rounded-2xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-orange-500/20 active:scale-95">
                       <Send size={16} />
                    </button>
                 </form>
              </div>

              {/* Analysis Card */}
              <div className="bg-gradient-to-br from-[#121418] to-[#1A1D21] border border-white/5 p-6 rounded-[32px] shadow-2xl relative overflow-hidden">
                 <div className="flex items-center gap-3 mb-6 relative z-10">
                    <ShieldCheck className="text-green-500" size={18} />
                    <h3 className="font-black text-xs uppercase tracking-widest">Engine Analysis</h3>
                 </div>
                 <div className="flex items-center justify-between mb-2 translate-y-1 relative z-10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Evaluation</span>
                    <span className="text-xl font-black text-green-500">+1.2</span>
                 </div>
                 <div className="w-full bg-[#0A0C0F] h-1.5 rounded-full overflow-hidden relative z-10">
                    <div className="bg-green-500 h-full w-[62%]"></div>
                 </div>
                 <p className="text-[9px] text-gray-600 mt-4 font-bold uppercase tracking-wider relative z-10">White has a slight advantage in development.</p>
                 <div className="absolute right-[-10%] bottom-[-10%] text-white/5 group-hover:scale-110 transition-transform">
                    <Monitor size={120} />
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

export default WatchGame;
