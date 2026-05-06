import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Signal, ChevronLeft, Map as MapIcon, Timer, 
  Bell, Loader2, Play, Square, CheckCircle, AlertTriangle,X
} from 'lucide-react';
import { cn } from '../lib/utils';

// 定义运动打卡的全生命周期状态
type RunStatus = 'locating' | 'ready' | 'running' | 'success';

const ActiveExercise: React.FC = () => {
  const navigate = useNavigate();
  
  // 核心状态控制
  const [runStatus, setRunStatus] = useState<RunStatus>('locating');
  const [signalStrength, setSignalStrength] = useState<'strong' | 'weak'>('strong');
  const [viewMode, setViewMode] = useState<'stats' | 'map'>('stats');
  
  // 数据记录
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(0.00);
  const [showNotification, setShowNotification] = useState(false);

  // 1. 模拟进入页面时：开启定位与蓝牙，检测有效打卡区域
  useEffect(() => {
    if (runStatus === 'locating') {
      const locateTimer = setTimeout(() => {
        // 模拟定位完成，随机或根据实际业务设置信号强弱 (这里为了演示设定为弱信号)
        setSignalStrength('weak'); 
        setRunStatus('ready');
      }, 2000);
      return () => clearTimeout(locateTimer);
    }
  }, [runStatus]);

  // 2. 跑步数据持续记录逻辑
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (runStatus === 'running') {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
        // 模拟配速与距离增加
        if (Math.random() > 0.4) {
          setDistance(prev => parseFloat((prev + 0.01).toFixed(2)));
        }
      }, 1000);

      // 模拟 Live Activity 通知弹窗
      const notificationTimer = setTimeout(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000); // 5秒后自动关闭
      }, 3000);
      return () => {
        clearInterval(timer);
        clearTimeout(notificationTimer);
      };
    }
  }, [runStatus]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 3. 处理开始跑步
  const handleStart = () => {
    setRunStatus('running');
  };

  // 4. 处理结束跑步（校验条件）
  const handleFinish = () => {
    // 假设打卡条件为：距离至少 0.05 公里 或 时间超过 1 分钟
    if (distance < 0.05 && seconds < 60) {
      alert("未满足打卡条件！请至少完成 0.05 公里或持续 1 分钟。");
      return;
    }
    
    // 条件满足，进入成功状态
    setRunStatus('success');
    
    // 模拟数据同步并跳转到记录结算页
    setTimeout(() => {
      navigate('/settlement');
    }, 2000);
  };

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col relative overflow-hidden">
      
      {/* Background Map */}
      <div className={cn(
        "absolute inset-0 z-0 transition-opacity duration-700",
        viewMode === 'map' ? "opacity-100" : "opacity-30 blur-sm"
      )}>
        <img src="https://modao.cc/agent-py/media/generated_images/2026-04-30/1645473ab6074661893f1bd1502a750f.jpg#desc=Dark%20Theme%20Satellite%20Campus%20Map%20with%20Neon%20Green%20Run%20Path" alt="Campus Map" className="w-full h-full object-cover" />
      </div>

      {/* 打卡成功遮罩层 (全屏状态覆盖) */}
      <AnimatePresence>
        {runStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-emerald-950/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/50">
                <CheckCircle size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-black text-white mb-3">打卡成功</h2>
              <p className="text-emerald-200 font-medium animate-pulse">正在同步运动轨迹与数据至记录页...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 实时通知横幅 (仅跑步中显示) */}
      <AnimatePresence>
        {showNotification && runStatus === 'running' && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className="absolute top-4 inset-x-4 z-40" 
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Timer className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">正在打卡跑步</p>
                  <p className="text-xs font-bold text-white">当前距离: {distance.toFixed(2)} km</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Bell className="text-slate-500" size={16} />
                <div className="w-px h-6 bg-white/10"></div> {/* 分割线 */}
                <button 
                  onClick={() => setShowNotification(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 顶部 Header栏 */}
      <div className="relative z-10 px-6 pt-12 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
          <ChevronLeft size={24} />
        </button>
        
        {runStatus !== 'locating' && (
          <div className="flex bg-white/5 backdrop-blur-md rounded-2xl p-1 border border-white/10">
            <button 
              onClick={() => setViewMode('stats')}
              className={cn("px-4 py-1.5 rounded-xl text-xs font-black transition-all", viewMode === 'stats' ? "bg-white text-slate-900 shadow-lg" : "text-white/40")}
            >
              数据
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={cn("px-4 py-1.5 rounded-xl text-xs font-black transition-all", viewMode === 'map' ? "bg-white text-slate-900 shadow-lg" : "text-white/40")}
            >
              地图
            </button>
          </div>
        )}

        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-2xl border",
          signalStrength === 'weak' ? "bg-amber-500/20 border-amber-500/30 text-amber-400" : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
        )}>
          <Signal size={12} className="animate-pulse" />
          <span className="text-[10px] font-black">{signalStrength === 'weak' ? '信号弱' : '信号佳'}</span>
        </div>
      </div>

      {/* 主视图区域 (数据/地图/定位中) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          
          {/* 定位中状态 */}
          {runStatus === 'locating' && (
            <motion.div key="locating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-800/80 rounded-full flex items-center justify-center mb-6 animate-pulse border-4 border-slate-700">
                <MapPin className="text-emerald-500 animate-bounce" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">正在获取定位</h3>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" /> 检测有效打卡区域...
              </p>
            </motion.div>
          )}

          {/* 就绪和运行中状态的数据面板 */}
          {(runStatus === 'ready' || runStatus === 'running') && viewMode === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full flex flex-col items-center">
              <div className="text-center space-y-2 mb-16">
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">当前里程 (公里)</p>
                <motion.h2 className="text-[10rem] font-black italic tracking-tighter leading-none text-white drop-shadow-2xl">
                  {distance.toFixed(2)}
                </motion.h2>
              </div>

              <div className="grid grid-cols-2 w-full gap-8">
                <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 text-center">
                  <p className="text-slate-500 text-[10px] font-black mb-1 uppercase tracking-widest">持续时间</p>
                  <p className="text-4xl font-black font-mono tracking-tighter">{formatTime(seconds)}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 text-center">
                  <p className="text-slate-500 text-[10px] font-black mb-1 uppercase tracking-widest">当前配速</p>
                  <p className="text-4xl font-black font-mono tracking-tighter">{distance > 0 ? "5'28\"" : "--'--"}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 就绪和运行中状态的地图悬浮窗 */}
          {(runStatus === 'ready' || runStatus === 'running') && viewMode === 'map' && (
            <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-4 right-4 -translate-y-1/2">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex gap-4 items-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <MapIcon size={24} />
                </div>
                <div>
                  <p className="text-xs font-black">当前位置: {runStatus === 'ready' ? '操场起始点' : '正途经图书馆南路'}</p>
                  <p className="text-[10px] text-slate-400">正在记录并绘制运动轨迹</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 底部操作区 */}
      <div className="relative z-10 p-8 pb-12 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
        
        {/* 弱信号打卡提示批注 */}
        {runStatus === 'ready' && signalStrength === 'weak' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 mb-6 bg-amber-500/10 py-2 px-4 rounded-full border border-amber-500/20">
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-400">信号较弱，已自动扩大有效识别范围</span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {runStatus === 'ready' && (
            <motion.button
              key="start-btn"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              onClick={handleStart}
              className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full text-xl font-black shadow-xl shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play size={24} className="fill-current" /> 开始跑步
            </motion.button>
          )}

          {runStatus === 'running' && (
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

export default ActiveExercise;
