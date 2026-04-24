import React from 'react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Trophy, 
  User, 
  Settings, 
  HelpCircle, 
  Activity
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Gamepad2, label: 'Play', path: '/play' },
    { icon: Trophy, label: 'Puzzles', path: '/puzzles' },
    { icon: Activity, label: 'Rankings', path: '/rankings' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <aside className="w-64 bg-[#0A0C0F] border-r border-white/5 flex flex-col p-6 h-screen sticky top-0">
      <div className="mb-10">
         <h2 className="text-xl font-black tracking-wider text-white">Knight<span className="text-[#FF5A1F]">Link</span></h2>
         <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Grandmaster Tier</p>
      </div>

      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <div 
              key={idx} 
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                isActive ? 'bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
          );
        })}
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
  );
}

export default Sidebar;
