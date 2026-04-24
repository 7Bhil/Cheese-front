import React from 'react';
const { useState } = React;
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: formData.username,
        password: formData.password
      });

      if (response.status === 200) {
        // En vrai on stockerait un token ici (JWT)
        // localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1013] text-white flex items-center justify-center font-sans tracking-wide">
      <div className="max-w-[1100px] w-full flex flex-col md:flex-row items-center justify-center p-6 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Side - Image/Brand */}
        <div className="hidden md:flex flex-col items-start max-w-[450px] w-full">
           <div className="relative w-full aspect-square bg-[#121418] rounded-3xl flex items-center justify-center overflow-hidden group shadow-2xl border border-white/5">
             <div className="absolute inset-0 bg-[#FF5A1F] opacity-[0.1] blur-[80px] group-hover:opacity-25 transition-opacity duration-1000"></div>
             <img src="/hero-knight.png" alt="Knight Link Hero" className="relative z-10 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
           </div>
           
           <h1 className="text-5xl font-black text-[#FF5A1F] mt-10 mb-4 tracking-tight drop-shadow-[0_2px_10px_rgba(255,90,31,0.2)]">Master the Craft</h1>
           <p className="text-gray-400 italic text-[17px] leading-relaxed mb-8 font-serif">
             "In the dance of sixty-four squares, every move is a story of heritage and strategy."
           </p>
           
           <div className="flex items-center gap-4">
             <div className="w-16 h-[2px] bg-[#FF5A1F]"></div>
             <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.25em] uppercase">Grandmaster Path</span>
           </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md bg-[#0E1013]">
           <div className="flex items-center gap-3 mb-10">
             <div className="text-[#FF5A1F]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF5A1F" className="drop-shadow-[0_0_8px_rgba(255,90,31,0.6)]">
                 <path d="M4 22h16v-2H4v2zm2-4h12v-2H6v2zm1-4h10v-2H7v2zm1.5-4h7v-2h-7v2zm-2-4h11V4h-11v2z"/>
               </svg>
             </div>
             <h2 className="text-3xl font-black text-white tracking-wide">Knight<span className="text-[#FF5A1F]">Link</span></h2>
           </div>

           <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
           <p className="text-gray-400 text-sm mb-10">Enter your details to resume your journey.</p>

           <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-xs font-bold text-center">
                  {error}
                </div>
              )}
             <div className="space-y-2">
               <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email or Username</label>
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <User className="h-4 w-4 text-gray-500 group-focus-within:text-[#FF5A1F] transition-colors" />
                 </div>
                 <input 
                   type="text" 
                   name="username"
                   value={formData.username}
                   onChange={handleChange}
                   autoComplete="off"
                   placeholder="grandmaster_kofi"
                   className="w-full bg-[#14161A] border-t-0 border-x-0 border-b-2 border-gray-800 text-white pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#FF5A1F] transition-all placeholder-gray-600 text-[15px] hover:bg-[#181a1f]"
                   required
                 />
               </div>
             </div>

             <div className="space-y-2">
               <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-[#FF5A1F] transition-colors" />
                 </div>
                 <input 
                   type={showPassword ? "text" : "password"} 
                   name="password"
                   value={formData.password}
                   onChange={handleChange}
                   autoComplete="off"
                   placeholder="••••••••"
                   className="w-full bg-[#14161A] border-t-0 border-x-0 border-b-2 border-gray-800 text-white pl-12 pr-12 py-3.5 focus:outline-none focus:border-[#FF5A1F] transition-all placeholder-gray-600 text-[15px] tracking-[0.2em] hover:bg-[#181a1f]"
                   required
                 />
                 <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute inset-y-0 right-0 pr-4 flex items-center"
                 >
                   {showPassword ? <EyeOff className="h-4 w-4 text-gray-500 hover:text-white transition-colors" /> : <Eye className="h-4 w-4 text-gray-500 hover:text-white transition-colors" />}
                 </button>
               </div>
             </div>

             <div className="flex items-center justify-between pt-2">
               <label className="flex items-center cursor-pointer group">
                 <div className="relative flex items-center justify-center">
                   <input type="checkbox" className="sr-only" />
                   <div className="w-[18px] h-[18px] border-2 border-gray-700 rounded bg-[#1A1D21] group-hover:border-gray-500 transition-colors flex items-center justify-center"></div>
                 </div>
                 <span className="ml-3 text-[13px] text-gray-400 group-hover:text-gray-200 transition-colors">Remember me</span>
               </label>
               <a href="#" className="text-[13px] text-[#FF5A1F] hover:text-[#ff7f4e] font-semibold transition-colors">Forgot password?</a>
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className={`w-full bg-[#FF5A1F] hover:bg-[#ff6c35] text-white font-bold rounded-lg py-4 mt-6 shadow-[0_4px_14px_rgba(255,90,31,0.25)] hover:shadow-[0_6px_20px_rgba(255,90,31,0.4)] transition-all transform hover:-translate-y-[1px] tracking-wide text-[15px] ${loading ? 'opacity-50' : ''}`}
             >
               {loading ? 'Logging in...' : 'Login'}
             </button>
           </form>
           <div className="mt-10 flex items-center opacity-60">
             <div className="flex-1 h-[1px] bg-gray-700"></div>
             <span className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
             <div className="flex-1 h-[1px] bg-gray-700"></div>
           </div>

           <div className="mt-8 grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-3 bg-[#14161A] border border-gray-800 hover:border-gray-600 hover:bg-[#1A1D21] text-white text-[13px] font-semibold rounded-lg py-3 transition-all">
               <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                 <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                 <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                 <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                 <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
               </svg>
               Google
             </button>
             <button className="flex items-center justify-center gap-3 bg-[#14161A] border border-gray-800 hover:border-gray-600 hover:bg-[#1A1D21] text-white text-[13px] font-semibold rounded-lg py-3 transition-all">
               <svg className="h-[20px] w-[20px]" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.76 1.48-.02 2.76.62 3.54 1.76-3.2 1.95-2.69 6.01.44 7.21-.73 1.83-1.74 3.02-2.64 3.96zm-4.32-15.11c-.13-2.63 2.16-4.71 4.75-4.82.35 2.78-2.67 4.98-4.75 4.82z"/>
               </svg>
               Apple
             </button>
           </div>
           
           <div className="mt-12 text-center">
             <p className="text-gray-400 text-sm">
               New to the court? <Link to="/register" className="text-[#FF5A1F] font-bold hover:underline transition-all">Join KnightLink</Link>
             </p>
           </div>
        </div>
        
      </div>
      
      {/* Decorative background elements matching the image edge */}
      <div className="fixed bottom-0 right-0 opacity-20 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="#FF5A1F">
           <rect x="60" y="80" width="10" height="10" />
           <rect x="80" y="80" width="10" height="10" />
           <rect x="70" y="70" width="10" height="10" />
           <rect x="90" y="70" width="10" height="10" />
           <rect x="80" y="60" width="10" height="10" />
        </svg>
      </div>
    </div>
  );
}

export default Login;
