import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://modao.cc/agent-py/media/generated_images/2026-04-30/792be2dd96f248068574d05ab43f381c.jpg#desc=Minimalist%20Illustration%20of%20Iconic%20Campus%20Library%20Building%20with%20Clock%20Tower%20and%20Greenery" 
          alt="Campus Landmark" 
          className="w-full h-full object-cover opacity-10"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-200 mb-8 overflow-hidden">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900">智慧体育</h1>
        <p className="mt-2 text-emerald-600 font-bold tracking-widest uppercase text-xs">Smart Campus Sports</p>
      </motion.div>
      
      <div className="absolute bottom-12 text-slate-400 text-[10px] font-bold tracking-widest uppercase">
        © 2026 校园体育管理平台
      </div>
    </div>
  );
};

export default Splash;
