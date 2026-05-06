import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, ChevronLeft, Loader2, Play, Square, 
  CheckCircle, Clock, Building2
} from 'lucide-react';
import { cn } from '../lib/utils';

type VenueStatus = 'locating' | 'ready' | 'running' | 'success';

const VenueCheckin: React.FC = () => {
  const navigate = useNavigate();
  
  // 核心状态控制
  const [status, setStatus] = useState<VenueStatus>('locating');
  const [seconds, setSeconds] = useState(0);
  const [venueName, setVenueName] = useState<string>('');

  // 1. 模拟进入页面时：系统自动开启定位，检测有效打卡区域
  useEffect(() => {
    if (status === 'locating') {
      const locateTimer = setTimeout(() => {
        // 模拟定位成功，获取到场馆信息
        setVenueName('综合体育馆 - 羽毛球一区'); 
        setStatus('ready');
      }, 2000);
      return () => clearTimeout(locateTimer);
    }
  }, [status]);

  // 2. 持续记录打卡时长 (支持模拟息屏/后台计时逻辑)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (status === 'running') {
      // 在实际生产的 App 中，这里可能会记录 startTime，
      // 每次唤醒时用 Date.now() - startTime 来计算精确时长以对抗息屏休眠
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 3. 处理开始打卡
  const handleStart = () => {
    setStatus('running');
  };

  // 4. 处理结束打卡（校验条件）
  const handleFinish = () => {
    // 假设场地打卡要求至少持续 10 分钟 (600秒) 才算有效
    // 这里为了演示方便，设置为大于 5 秒即可
    if (seconds < 5) {
      alert("打卡时长过短！请至少完成规定的运动时长后再结束。");
      return;
    }
    
    // 条件满足，进入成功状态
    setStatus('success');
    
    // 模拟数据同步并跳转到记录页
    setTimeout(() => {
      navigate('/history');
    }, 2000);
  };

  return (
    <div className="h-full min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* 顶部 Header栏 */}
      <div className="relative z-10 px-6 pt-12 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-sm font-black tracking-widest text-slate-300">场地签到</h1>
        <div className="w-10 h-10" /> {/* 占位以居中标题 */}
      </div>

      {/* 打卡成功遮罩层 (全屏状态覆盖) */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-blue-950/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
              className="flex flex-col items-center text-center px-8"
            >
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/50">
                <CheckCircle size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-black text-white mb-3">打卡成功</h2>
              <p className="text-blue-200 font-medium animate-pulse mb-8">本次场馆锻炼时长 {formatTime(seconds)}</p>
              <div className="flex items-center gap-2 text-xs text-blue-400">
                <Loader2 size={14} className="animate-spin" /> 正在同步数据至记录页...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主视图区域 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          
          {/* 状态 1: 定位中 */}
          {status === 'locating' && (
            <motion.div key="locating" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
                <div className="absolute inset-4 border-4 border-blue-500/50 rounded-full animate-pulse" />
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 relative z-10">
                  <MapPin className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-3">定位场馆中</h3>
              <p className="text-sm text-slate-400 font-medium">请确保您已进入场馆内有效打卡区域</p>
            </motion.div>
          )}

          {/* 状态 2: 准备就绪 */}
          {status === 'ready' && (
            <motion.div key="ready" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full flex flex-col items-center">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] p-8 w-full text-center shadow-2xl">
                <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building2 size={32} />
                </div>
                <h3 className="text-xl font-black text-white mb-2">已进入有效区域</h3>
                <p className="text-blue-400 font-bold mb-8">{venueName}</p>
                <div className="bg-slate-900/50 rounded-2xl p-4 text-left">
                  <p className="text-xs text-slate-400 mb-1 font-medium">打卡要求：</p>
                  <p className="text-sm text-slate-300 font-bold">持续运动需满 45 分钟，中途请勿离开场馆范围，支持息屏记录。</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 状态 3: 记录中 */}
          {status === 'running' && (
            <motion.div key="running" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full flex flex-col items-center">
              <div className="text-center space-y-4 mb-16 relative">
                {/* 背景呼吸波纹 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse -z-10" />
                
                <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2">
                  <Clock size={14} className="animate-spin-slow" /> 已运动时长
                </p>
                <motion.h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-2xl font-mono">
                  {formatTime(seconds)}
                </motion.h2>
              </div>

              <div className="w-full bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10 flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                  <Building2 size={24} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] text-slate-400 font-bold mb-0.5">当前位置</p>
                  <p className="text-sm font-black">{venueName}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-500">位置监控中</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 底部操作区 */}
      <div className="relative z-10 p-8 pb-12 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
        <AnimatePresence mode="wait">
          {status === 'ready' && (
            <motion.button
              key="start-btn"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              onClick={handleStart}
              className="w-full h-16 bg-blue-500 hover:bg-blue-400 text-white rounded-full text-xl font-black shadow-xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play size={24} className="fill-current" /> 开始打卡
            </motion.button>
          )}

          {status === 'running' && (
            <motion.button
              key="finish-btn"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              onClick={handleFinish}
              className="w-full h-16 bg-rose-500 hover:bg-rose-400 text-white rounded-full text-xl font-black shadow-xl shadow-rose-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Square size={20} className="fill-current" /> 结束打卡
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
};

export default VenueCheckin;