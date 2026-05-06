import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Settings, 
  ChevronRight, 
  Watch, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquareWarning,
  LogOut,
  Camera,
  Layout
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Profile Header */}
      <div className="bg-white px-5 pt-16 pb-12 rounded-b-[3.5rem] shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />
        <div className="flex items-start justify-between mb-10">
          <div className="relative group">
            <Avatar className="w-28 h-28 border-4 border-emerald-50 shadow-2xl transition-transform group-hover:scale-105 duration-500">
              <AvatarImage src="https://modao.cc/agent-py/media/generated_images/2026-04-30/de22569297eb4427ae299996e70dc5f9.jpg#desc=High%20Quality%20Portrait%20of%20a%20Handsome%20Asian%20Male%20Student%20with%20Athletic%20Build" />
              <AvatarFallback className="font-black text-2xl">张</AvatarFallback>
            </Avatar>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-1 right-1 w-9 h-9 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg"
            >
              <Camera size={16} />
            </motion.button>
          </div>
          <motion.button 
            whileTap={{ rotate: 90 }}
            className="p-3 bg-slate-50 rounded-2xl text-slate-400 border border-slate-100 shadow-sm"
          >
            <Settings size={24} />
          </motion.button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">张小明</h2>
            <div className="flex bg-emerald-500 px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">校级运动员</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">计算机学院 · 大三</p>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">学号: 2023010101</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          {[
            { label: '勋章成就', val: '12', color: 'bg-orange-500' },
            { label: '体能积分', val: '1,245', color: 'bg-blue-500' },
            { label: '全校排名', val: 'Top 5%', color: 'bg-emerald-500' }
          ].map((item, i) => (
            <div key={i} className="flex-1 bg-slate-50 rounded-[1.5rem] p-4 flex flex-col items-center border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
              <p className="text-xl font-black text-slate-900 mb-1">{item.val}</p>
              <div className="flex items-center gap-1.5">
                <div className={cn("w-1.5 h-1.5 rounded-full", item.color)} />
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 py-8 space-y-6 overflow-y-auto pb-24">
        {/* Device Status */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group active:scale-95 transition-all">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
              <Watch size={28} className="animate-pulse" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm mb-0.5">外部运动设备</p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-emerald-500 rounded-full" />)}
                  </div>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest leading-none">Apple Watch 已同步</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-blue-500 rounded-full" />)}
                  </div>
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest leading-none">已连接华为手环</p>
                </div>
              </div>
            </div>
          </div>
          <ChevronRight className="text-slate-200 group-hover:translate-x-1 transition-transform" size={20} />
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-[2.5rem] p-2 border border-slate-50 shadow-sm overflow-hidden">
          {[
            { icon: MessageSquareWarning, label: '打卡申诉与反馈', path: '/feedback', color: 'text-orange-500 bg-orange-50' },
            { icon: Layout, label: '原型功能说明', path: '/overview', color: 'text-emerald-500 bg-emerald-50' },
            { icon: ShieldCheck, label: '隐私与权限管理', path: '#', color: 'text-blue-500 bg-blue-50' },
            { icon: HelpCircle, label: '常见问题手册', path: '#', color: 'text-purple-500 bg-purple-50' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => item.path !== '#' && navigate(item.path)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-[2rem] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", item.color)}>
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-slate-800 text-sm">{item.label}</span>
              </div>
              <ChevronRight className="text-slate-200" size={18} />
            </button>
          ))}
        </div>

        <button 
          onClick={() => navigate('/login')}
          className="w-full h-14 bg-rose-50 text-rose-500 rounded-[2rem] font-bold text-sm flex items-center justify-center gap-2"
        >
          <LogOut size={18} /> 退出当前登录
        </button>
      </div>
    </div>
  );
};

export default Profile;
