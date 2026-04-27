import React, { useState, useEffect, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Bell, Trophy, Flag, Hand, Info, Clock } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getBestMove } from '../utils/engine';

const PieceStandard = ({ type, color }) => {
  const isWhite = color === 'w';
  const fill = isWhite ? '#FF5A1F' : '#111827';
  const stroke = isWhite ? '#FFFFFF' : '#4B5563';

  // Tracés OFFICIELS Lichess (Cburnett) - GARANTIS RECONNAISSABLES
  const pieces = {
    p: ( // Pawn
      <path fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
    ),
    r: ( // Rook
      <g fill={fill} fillRule="evenodd" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path strokeLinecap="butt" d="M9 39h27v-3H9zm3-3v-4h21v4zm-1-22V9h4v2h5V9h5v2h5V9h4v5" />
        <path d="m34 14-3 3H14l-3-3" />
        <path strokeLinecap="butt" d="M31 17v12.5H14V17" />
        <path d="m31 29.5 1.5 2.5h-20l1.5-2.5" />
        <path fill="none" d="M11 14h23" />
      </g>
    ),
    n: ( // Knight
      <g fill="none" fillRule="evenodd" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path fill={fill} d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
        <path fill={fill} d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" />
        <path fill={isWhite ? 'white' : 'black'} d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0" />
        <path fill={isWhite ? 'white' : 'black'} d="m14.933 15.75a.5 1.5 30 1 1-0.866-0.5 0.5 1.5 30 1 1 0.866 0.5" />
      </g>
    ),
    b: ( // Bishop
      <g fill="none" fillRule="evenodd" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <g fill={fill}>
          <path strokeLinecap="butt" d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2z" />
          <path strokeLinecap="butt" d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
          <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
        </g>
        <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" />
      </g>
    ),
    q: ( // Queen
      <g fill={fill} fillRule="evenodd" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0m16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0M41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0M16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0M33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0" />
        <path strokeLinecap="butt" d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14z" />
        <path strokeLinecap="butt" d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" />
        <path fill="none" d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" />
      </g>
    ),
    k: ( // King
      <g fill="none" fillRule="evenodd" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M22.5 11.63V6M20 8h5" />
        <path fill={fill} strokeLinecap="butt" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />
        <path fill={fill} d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10z" />
        <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" />
      </g>
    )
  };

  return (
    <svg viewBox="0 0 45 45" className="w-[85%] h-[85%] drop-shadow-md">
      {pieces[type]}
    </svg>
  );
};

function Play() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const puzzleFen = searchParams.get('fen');
  const puzzleSolution = searchParams.get('solution');
  const isPuzzleMode = !!puzzleFen;

  const [game, setGame] = useState(() => {
    if (isPuzzleMode) return new Chess(puzzleFen);
    const saved = localStorage.getItem('knightlink_active_game');
    return saved ? new Chess(saved) : new Chess();
  });

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveHistory, setMoveHistory] = useState(() => {
    return game.history({ verbose: true });
  });
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiCommentary, setAiCommentary] = useState(isPuzzleMode ? "🔍 Puzzle Mode: Trouvez le meilleur coup !" : "Sawubona! À vous de jouer.");

  const [isGameOver, setIsGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [activeGameId, setActiveGameId] = useState(() => {
    return localStorage.getItem('knightlink_active_game_id');
  });
  const [socket, setSocket] = useState(null);

  // Setup WebSocket connection
  useEffect(() => {
    if (activeGameId && !isPuzzleMode) {
      const ws = new WebSocket(`ws://localhost:8000/ws/game/${activeGameId}/`);
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'game_move' && data.sender !== 'player') {
          // If we receive a move from the other side (for future PvP)
          const newGame = new Chess(data.fen);
          setGame(newGame);
          setMoveHistory(newGame.history({ verbose: true }));
        }
      };
      setSocket(ws);
      return () => ws.close();
    }
  }, [activeGameId, isPuzzleMode]);

  // Sync with Backend (Start/Update)
  const syncGame = async (winnerId = null, statusStr = 'ongoing') => {
    if (isPuzzleMode) return;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      const response = await fetch('http://localhost:8000/api/record-game/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: activeGameId,
          white_player: user.id,
          black_player: 1, // AI
          winner: winnerId,
          status: statusStr,
          pgn: game.pgn(),
          fen: game.fen()
        })
      });
      const data = await response.json();
      
      let currentId = activeGameId;
      if (data.game_id && !activeGameId) {
        currentId = data.game_id;
        setActiveGameId(data.game_id);
        localStorage.setItem('knightlink_active_game_id', data.game_id);
      }
      
      // Broadcast via socket
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: 'game_move',
          move: game.history().pop(),
          fen: game.fen(),
          sender: 'player'
        }));
      }

      if (data.white_elo) {
        user.elo = data.white_elo;
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (e) {
      console.error("Failed to sync game", e);
    }
  };

  // Initial Sync (Create game)
  useEffect(() => {
    if (!isPuzzleMode) syncGame();
  }, [isPuzzleMode]);

  useEffect(() => {
    if (!isPuzzleMode) {
      localStorage.setItem('knightlink_active_game', game.fen());
      syncGame(); // Update FEN on server
    }

    if (game.isGameOver()) {
      setIsGameOver(true);
      let result = "Match Nul";
      let winner = null;
      let finalStatus = 'draw';
      if (game.isCheckmate()) {
        finalStatus = 'completed';
        const winnerColor = game.turn() === 'w' ? 'Noirs' : 'Blancs';
        result = `Échec et Mat ! Victoire des ${winnerColor}`;
        winner = game.turn() === 'w' ? 1 : JSON.parse(localStorage.getItem('user'))?.id;
      }
      setGameResult(result);
      if (!isPuzzleMode) {
        syncGame(winner, finalStatus);
        localStorage.removeItem('knightlink_active_game');
        localStorage.removeItem('knightlink_active_game_id');
      }
    }
  }, [game]);

  // Broadcast AI Commentary to Watchers
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN && aiCommentary && !isPuzzleMode) {
      socket.send(JSON.stringify({
        type: 'game_comment',
        comment: aiCommentary,
        username: 'KnightLink AI'
      }));
    }
  }, [aiCommentary, socket]);

  const [gameData, setGameData] = useState(null);
  const [aiBrain, setAiBrain] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeGameId) {
        try {
          const resp = await fetch(`http://localhost:8000/api/game/${activeGameId}/`);
          const data = await resp.json();
          setGameData(data);
        } catch (e) { console.error(e); }
      }
      // Fetch AI Failure Memory
      try {
        const aiResp = await fetch('http://localhost:8000/api/ai-brain/');
        const aiData = await aiResp.json();
        setAiBrain(aiData);
      } catch (e) { console.error(e); }
    };
    fetchData();
  }, [activeGameId]);

  function onSquareClick(square) {
    if (isAiThinking || (game.turn() === 'b' && !isPuzzleMode) || isGameOver) return;

    if (selectedSquare) {
      if (selectedSquare === square) { setSelectedSquare(null); return; }
      const gameCopy = new Chess(game.fen());
      try {
        const moveAttempt = { from: selectedSquare, to: square, promotion: 'q' };
        const moveStr = `${selectedSquare}${square}`;
        
        // Puzzle Verification (existing logic)
        if (isPuzzleMode && puzzleSolution) {
          if (moveStr !== puzzleSolution && gameCopy.move(moveAttempt)?.san !== puzzleSolution) {
             setAiCommentary("❌ Mauvais coup ! Réessayez.");
             setSelectedSquare(null);
             return;
          } else {
             setAiCommentary("✨ Incroyable ! Puzzle résolu.");
             setIsGameOver(true);
             setGameResult("Puzzle Résolu avec succès !");
          }
        }

        const move = gameCopy.move(moveAttempt);
        if (move) {
          setGame(gameCopy);
          setMoveHistory(gameCopy.history({ verbose: true }));
          setSelectedSquare(null);
          
          // Generate Commentary based on move properties
          let comment = "Bonne réponse.";
          if (move.captured) comment = `Capture en ${move.to} ! La pression monte.`;
          if (move.san.includes('+')) comment = "ÉCHEC ! Un coup magistral.";
          if (move.promotion) comment = "Une promotion ! Un nouveau futur s'ouvre.";
          if (move.san.includes('#')) comment = "MAT ! Fin de la légende.";
          
          setAiCommentary(comment);
          
          const isAgainstAI = !gameData || gameData.black_player === 1;

          if (!isPuzzleMode && !gameCopy.isGameOver() && isAgainstAI) {
            setIsAiThinking(true);
            setTimeout(() => {
              const aiMove = getBestMove(gameCopy.fen(), 3, aiBrain);
              if (aiMove) {
                const aiResult = gameCopy.move(aiMove);
                setGame(new Chess(gameCopy.fen()));
                setMoveHistory(gameCopy.history({ verbose: true }));
                
                let aiComment = "À vous de jouer.";
                if (aiResult.captured) aiComment = "L'IA contre-attaque avec une capture !";
                if (aiResult.san.includes('+')) aiComment = "L'IA vous met en échec ! Prudence.";
                setAiCommentary(aiComment);
              }
              setIsAiThinking(false);
            }, 800);
          }
          return;
        }
      } catch (e) {
        console.log("Invalid move", e);
      }
    }
    const piece = game.get(square);
    if (piece && piece.color === (isPuzzleMode ? game.turn() : 'w')) setSelectedSquare(square);
    else setSelectedSquare(null);
  }

  const resetGame = () => {
    if (isPuzzleMode) {
      setGame(new Chess(puzzleFen));
      setMoveHistory([]);
      setAiCommentary("🔍 Puzzle Mode: Trouvez le meilleur coup !");
    } else {
      localStorage.removeItem('knightlink_active_game');
      localStorage.removeItem('knightlink_active_game_id');
      setGame(new Chess());
      setMoveHistory([]);
      setAiCommentary("Partie réinitialisée. À vous de commencer !");
      setActiveGameId(null);
    }
    setIsGameOver(false);
    setGameResult(null);
    setSelectedSquare(null);
  };

  const resign = () => {
    if (isGameOver) return;
    setIsGameOver(true);
    setGameResult("Vous avez abandonné.");
    if (!isPuzzleMode) recordResult(1, 'completed');
    localStorage.removeItem('knightlink_active_game');
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
        const isSelected = selectedSquare === square;
        const lastMove = moveHistory.length > 0 ? moveHistory[moveHistory.length-1] : null;
        const isLastMove = lastMove && (lastMove.from === square || lastMove.to === square);

        tiles.push(
          <div 
            key={square}
            onClick={() => onSquareClick(square)}
            className={`relative w-full aspect-square flex items-center justify-center cursor-pointer transition-all duration-300
              ${isDark ? 'bg-[#24262E]' : 'bg-[#E3DFD5]'}
              ${isSelected ? 'bg-orange-500/30 ring-2 ring-orange-500 inset-0 z-10' : ''}
              ${isLastMove ? 'after:content-[""] after:absolute after:inset-0 after:bg-orange-500/10' : ''}
              hover:brightness-110 active:scale-95
            `}
          >
            {piece && <PieceStandard type={piece.type} color={piece.color} />}
          </div>
        );
      }
    }
    return tiles;
  }, [game, selectedSquare, moveHistory]);

  const groupedMoves = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < moveHistory.length; i += 2) {
      pairs.push({ num: Math.floor(i / 2) + 1, white: moveHistory[i]?.san, black: moveHistory[i + 1]?.san });
    }
    return pairs;
  }, [moveHistory]);

  return (
    <div className="flex bg-[#0E1013] text-white font-sans min-h-screen max-h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <nav className="h-16 border-b border-white/5 flex items-center justify-between px-10 bg-[#0A0C0F]">
           <h2 className="text-sm font-black uppercase tracking-widest text-[#FF5A1F]">KnightLink</h2>
           <div className="flex items-center gap-6">
              <Clock size={16} className="text-gray-500" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Blitz 5 min</span>
           </div>
        </nav>

        <div className="flex-1 flex p-8 gap-10 overflow-hidden items-center justify-center bg-gradient-to-br from-[#0E1013] via-[#111317] to-[#1A1D21]">
           <div className="flex-[1.5] max-w-[620px] flex flex-col items-center">
              <div className="w-full aspect-square grid grid-cols-8 shadow-[0_50px_100px_rgba(0,0,0,1)] border-[10px] border-[#16181D] rounded-2xl overflow-hidden bg-[#16181D]">
                {boardTiles}
              </div>
           </div>

           <div className="flex-1 flex flex-col gap-5 max-w-[420px] h-full justify-between py-2">
              <div className="bg-[#121418] border border-white/5 p-5 rounded-3xl flex items-center justify-between shadow-2xl">
                 <div className="flex items-center gap-4">
                    <PieceStandard type="k" color="b" />
                    <h4 className="font-bold text-sm text-gray-200 uppercase">GM Adebayo</h4>
                 </div>
                 <div className="bg-[#0A0C0F] px-4 py-2 rounded-xl text-3xl font-black digit-mono text-gray-600">12:45</div>
              </div>

              <div className="flex-1 bg-[#121418] border border-white/5 rounded-3xl flex flex-col overflow-hidden my-1">
                 <div className="bg-[#0A0C0F] p-4 flex justify-between border-b border-white/5 items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5A1F]">Match Log</span>
                    <span className="text-[10px] font-bold text-gray-400 italic">{aiCommentary}</span>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
                    {groupedMoves.length === 0 && (
                      <div className="h-full flex items-center justify-center text-gray-700 text-[10px] font-black uppercase italic">No moves yet</div>
                    )}
                    {groupedMoves.map((m, idx) => (
                       <div key={idx} className="grid grid-cols-12 text-[11px] py-1.5 px-2 hover:bg-white/5 rounded text-gray-400">
                          <span className="col-span-2 font-bold opacity-30">{m.num}.</span>
                          <span className="col-span-10 flex justify-between">
                            <span className="text-orange-500 font-bold">{m.white}</span>
                            <span className="text-gray-200">{m.black || '...'}</span>
                          </span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Game Controls */}
              <div className="flex gap-3">
                 <button 
                  onClick={() => {
                    if (isPuzzleMode) navigate('/puzzles');
                    else resetGame();
                  }}
                  className="flex-1 py-4 border border-white/5 hover:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all text-gray-600">
                    {isPuzzleMode ? 'Exit Puzzle' : 'Reset Game'}
                  </button>
                 <button 
                  onClick={resign}
                  className="flex-1 py-4 bg-[#241B18] border border-orange-500/20 text-[#FF5A1F] hover:bg-[#2e2320] rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95">
                    {isPuzzleMode ? 'Give Up' : 'Resign Match'}
                  </button>
              </div>

              {/* User Card */}
              <div className="bg-[#121418] border border-white/5 p-4 rounded-3xl flex items-center justify-between shadow-2xl">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/20 shadow-inner">
                       <PieceStandard type="k" color="w" />
                    </div>
                    <div>
                       <h4 className="font-bold text-sm text-gray-100 uppercase tracking-widest">
                        {JSON.parse(localStorage.getItem('user'))?.username || 'Guest'}
                       </h4>
                       <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">ELO {JSON.parse(localStorage.getItem('user'))?.elo || 800}</p>
                    </div>
                 </div>
                 <div className="bg-[#FF5A1F] text-white px-4 py-2 rounded-xl text-2xl font-black digit-mono shadow-[0_4px_15px_rgba(255,90,31,0.5)]">08:21</div>
              </div>
           </div>
        </div>

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-[#0A0C0F]/90 backdrop-blur-md z-[100] flex items-center justify-center animate-in fade-in duration-500">
            <div className="bg-[#121418] border border-[#FF5A1F]/30 p-12 rounded-[40px] text-center max-w-sm w-full shadow-[0_0_100px_rgba(255,90,31,0.2)]">
                <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-orange-500/20">
                  <Trophy size={40} className="text-[#FF5A1F]" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Game Over</h2>
                <p className="text-gray-400 font-medium mb-8 uppercase text-[10px] tracking-[0.3em]">{gameResult}</p>
                
                <div className="bg-[#0A0C0F] p-6 rounded-3xl border border-white/5 mb-8">
                  <div className="flex justify-between items-center px-4">
                    <div className="text-left">
                      <p className="text-[9px] font-black text-gray-600 uppercase mb-1">New ELO</p>
                      <p className="text-2xl font-black">{JSON.parse(localStorage.getItem('user'))?.elo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-green-500 uppercase mb-1">XP Gained</p>
                      <p className="text-xl font-black text-green-500">+12</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (isPuzzleMode) navigate('/puzzles');
                    else resetGame();
                  }}
                  className="w-full py-5 bg-[#FF5A1F] text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform"
                >
                  {isPuzzleMode ? 'Back to Puzzles' : 'Play Again'}
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Play;
