import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ChevronLeft,
  Loader2,
  Play,
  Square,
  CheckCircle,
  Clock,
  Building2,
  ShieldCheck,
  AlertTriangle,
  Info,
  Wifi,
  DoorOpen,
} from 'lucide-react';
import { cn } from '../lib/utils';

type VenueStatus = 'locating' | 'ready' | 'running' | 'success';

const REQUIRED_SECONDS = 30 * 60;

// 静态原型展示用：这里把演示进度稍微做快一点。
// 如果想完全按真实 30 分钟走，把 1 改成 1；如果想演示快一点，可以改成 10 或 30。
// 当前保持真实每秒 +1。
const MOCK_TIME_SPEED = 1;

const VenueCheckin: React.FC = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<VenueStatus>('locating');
  const [seconds, setSeconds] = useState(0);
  const [venueName, setVenueName] = useState<string>('');
  const [showRuleTip, setShowRuleTip] = useState(false);

  const remainingSeconds = Math.max(REQUIRED_SECONDS - seconds, 0);
  const progress = Math.min(seconds / REQUIRED_SECONDS, 1);
  const progressPercent = Math.round(progress * 100);
  const isRequirementMet = seconds >= REQUIRED_SECONDS;

  // 1. 模拟进入页面时：系统自动开启定位，检测有效打卡区域
  useEffect(() => {
    if (status === 'locating') {
      const locateTimer = setTimeout(() => {
        setVenueName('综合体育馆 · 羽毛球一区');
        setStatus('ready');
      }, 1600);

      return () => clearTimeout(locateTimer);
    }
  }, [status]);

  // 2. 持续记录场地打卡时长
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (status === 'running') {
      timer = setInterval(() => {
        setSeconds(prev => {
          const next = prev + MOCK_TIME_SPEED;
          return Math.min(next, REQUIRED_SECONDS);
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStart = () => {
    setStatus('running');
  };

  const handleFinish = () => {
    if (!isRequirementMet) {
      alert(`还未达到场地签到要求，请继续停留 ${formatTime(remainingSeconds)}。`);
      return;
    }

    setStatus('success');

    setTimeout(() => {
      navigate('/history');
    }, 2000);
  };

  const handleBack = () => {
    if (status === 'running') {
      setShowRuleTip(true);
      return;
    }

    navigate(-1);
  };

  return (
    <div className="h-full min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-blue-950/30 to-transparent" />
      </div>

      {/* 顶部 Header */}
      <div className="relative z-10 px-6 pt-12 flex justify-between items-center">
        <button
          onClick={handleBack}
          className="min-w-10 h-10 px-3 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center gap-1 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={22} />
          {status === 'running' && (
            <span className="text-[10px] font-black">说明</span>
          )}
        </button>

        <h1 className="text-sm font-black tracking-widest text-slate-300">
          场地签到
        </h1>

        <button
          onClick={() => setShowRuleTip(true)}
          className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <Info size={18} />
        </button>
      </div>

      {/* 规则说明弹窗 */}
      <AnimatePresence>
        {showRuleTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              className="w-full bg-slate-900 border border-white/10 rounded-[2rem] p-6 shadow-2xl"
            >
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck size={26} />
              </div>

              <h3 className="text-xl font-black mb-2">场地签到规则</h3>

              <div className="space-y-3 text-left mt-5">
                <div className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <Clock size={18} className="text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-white">需在场馆内停留满 30 分钟</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      页面会显示剩余时间，倒计时结束后才可完成有效签到。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <MapPin size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-white">签到后不能离开有效范围</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      系统会持续检测是否仍在场馆区域内；离开场馆可能导致本次签到无效。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <Wifi size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-white">支持息屏或短暂切后台</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      建议保持定位权限开启，避免因定位中断影响记录。
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowRuleTip(false)}
                className="w-full h-14 mt-6 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-black transition-all active:scale-95"
              >
                我知道了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 打卡成功遮罩 */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-blue-950/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="flex flex-col items-center text-center px-8"
            >
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/50">
                <CheckCircle size={48} className="text-white" />
              </div>

              <h2 className="text-4xl font-black text-white mb-3">
                签到成功
              </h2>

              <p className="text-blue-200 font-medium mb-8">
                已完成 30 分钟场地签到
              </p>

              <div className="flex items-center gap-2 text-xs text-blue-400">
                <Loader2 size={14} className="animate-spin" />
                正在同步数据至记录页...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主视图区域 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {/* 定位中 */}
          {status === 'locating' && (
            <motion.div
              key="locating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
                <div className="absolute inset-4 border-4 border-blue-500/50 rounded-full animate-pulse" />
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 relative z-10">
                  <MapPin className="text-white" size={32} />
                </div>
              </div>

              <h3 className="text-2xl font-black mb-3">定位场馆中</h3>
              <p className="text-sm text-slate-400 font-medium">
                请确保您已进入场馆内有效签到区域
              </p>
            </motion.div>
          )}

          {/* 准备就绪 */}
          {status === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center"
            >
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] p-8 w-full text-center shadow-2xl">
                <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building2 size={32} />
                </div>

                <h3 className="text-xl font-black text-white mb-2">
                  已进入有效区域
                </h3>

                <p className="text-blue-400 font-bold mb-8">
                  {venueName}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-900/50 rounded-2xl p-4 text-center border border-white/5">
                    <p className="text-[10px] text-slate-500 font-black mb-1">
                      标准时限
                    </p>
                    <p className="text-2xl font-black text-white">
                      30
                      <span className="text-xs text-slate-400 ml-1">分钟</span>
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-2xl p-4 text-center border border-white/5">
                    <p className="text-[10px] text-slate-500 font-black mb-1">
                      区域要求
                    </p>
                    <p className="text-sm font-black text-emerald-400 mt-1">
                      场馆内有效
                    </p>
                  </div>
                </div>

                <div className="bg-blue-500/10 rounded-2xl p-4 text-left border border-blue-500/20">
                  <div className="flex gap-3">
                    <AlertTriangle size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-300 mb-1 font-black">
                        签到后请勿离开场馆范围
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        场地签到不是跑步打卡，不记录配速、步频或跑步轨迹；只检测您是否持续停留在有效场馆区域内。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 记录中 */}
          {status === 'running' && (
            <motion.div
              key="running"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center space-y-4 mb-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse -z-10" />

                <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2">
                  <Clock size={14} />
                  距离达标还剩
                </p>

                <motion.h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-2xl font-mono">
                  {formatTime(remainingSeconds)}
                </motion.h2>

                <p className="text-xs text-slate-400 font-bold">
                  已签到 {formatTime(seconds)} / 目标 30:00
                </p>
              </div>

              <div className="w-full bg-white/5 backdrop-blur-md rounded-[2rem] p-5 border border-white/10 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-slate-400 font-black">
                    签到进度
                  </p>
                  <p className="text-xs text-blue-400 font-black">
                    {progressPercent}%
                  </p>
                </div>

                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10 text-left">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-3">
                    <Building2 size={22} />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold mb-1">
                    当前场馆
                  </p>
                  <p className="text-sm font-black leading-tight">
                    {venueName}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10 text-left">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-3">
                    <ShieldCheck size={22} />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold mb-1">
                    范围状态
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-sm font-black text-emerald-400">
                      有效范围内
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-amber-500/10 backdrop-blur-md rounded-3xl p-4 border border-amber-500/20 flex items-start gap-3">
                <DoorOpen size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs font-black text-amber-300 mb-1">
                    请勿离开场馆
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    签到期间需要持续停留在当前场馆有效区域内，离开场馆或定位中断可能导致本次签到无效。
                  </p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleStart}
              className="w-full h-16 bg-blue-500 hover:bg-blue-400 text-white rounded-full text-xl font-black shadow-xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play size={24} className="fill-current" />
              开始签到
            </motion.button>
          )}

          {status === 'running' && (
            <motion.button
              key="finish-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleFinish}
              className={cn(
                'w-full h-16 rounded-full text-xl font-black shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2',
                isRequirementMet
                  ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/30'
                  : 'bg-white/10 text-slate-400 border border-white/10'
              )}
            >
              <Square size={20} className="fill-current" />
              {isRequirementMet
                ? '完成签到'
                : `还剩 ${formatTime(remainingSeconds)}`}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VenueCheckin;