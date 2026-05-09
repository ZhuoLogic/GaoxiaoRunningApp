import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Signal,
  ChevronLeft,
  Timer,
  Bell,
  Loader2,
  Play,
  Square,
  CheckCircle,
  AlertTriangle,
  X,
  HeartPulse,
  Footprints,
  Ruler,
  Flame,
  Minimize2,
  StopCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import ExerciseRouteMap, { LatLngPoint } from '../components/ExerciseRouteMap';

type RunStatus = 'locating' | 'ready' | 'countdown' | 'running' | 'success';

type RunMetrics = {
  heartRate: number | null;
  cadence: number;
  strideLength: number;
  calories: number;
};

const MOCK_ROUTE: LatLngPoint[] = [
  { lat: 31.22967, lng: 121.40385 },
  { lat: 31.22982, lng: 121.40412 },
  { lat: 31.23002, lng: 121.40443 },
  { lat: 31.23022, lng: 121.40476 },
  { lat: 31.23012, lng: 121.40508 },
  { lat: 31.22985, lng: 121.40532 },
  { lat: 31.22952, lng: 121.4052 },
  { lat: 31.22928, lng: 121.40488 },
  { lat: 31.22932, lng: 121.40445 },
  { lat: 31.22967, lng: 121.40385 },
];

// 原型用：改成 true 可以展示“已连接设备，有心率数据”
const MOCK_HAS_EXTERNAL_DEVICE = false;

// 一分钟跑完整个模拟路线
const MOCK_ROUTE_DURATION_SECONDS = 60;

// 一分钟内完成的模拟距离，别设太大，否则又像超人
const MOCK_TOTAL_DISTANCE_KM = 0.18;

// 把少量路线点插值成 61 个点：每秒走一个点，避免“瞬移”
const buildSmoothRoute = (
  route: LatLngPoint[],
  totalSeconds: number
): LatLngPoint[] => {
  if (route.length < 2) return route;

  const result: LatLngPoint[] = [];

  for (let i = 0; i <= totalSeconds; i++) {
    const progress = i / totalSeconds;
    const segmentProgress = progress * (route.length - 1);

    const segmentIndex = Math.min(
      Math.floor(segmentProgress),
      route.length - 2
    );

    const localProgress = segmentProgress - segmentIndex;
    const start = route[segmentIndex];
    const end = route[segmentIndex + 1];

    result.push({
      lat: start.lat + (end.lat - start.lat) * localProgress,
      lng: start.lng + (end.lng - start.lng) * localProgress,
    });
  }

  return result;
};

const SMOOTH_MOCK_ROUTE = buildSmoothRoute(
  MOCK_ROUTE,
  MOCK_ROUTE_DURATION_SECONDS
);

const ActiveExercise: React.FC = () => {
  const navigate = useNavigate();

  const [runStatus, setRunStatus] = useState<RunStatus>('locating');
  const [signalStrength, setSignalStrength] = useState<'strong' | 'weak'>('strong');
  const [viewMode, setViewMode] = useState<'stats' | 'map'>('stats');

  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(0.0);
  const [showNotification, setShowNotification] = useState(false);

  const [countdown, setCountdown] = useState(3);
  const [routeIndex, setRouteIndex] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  const [metrics, setMetrics] = useState<RunMetrics>({
    heartRate: MOCK_HAS_EXTERNAL_DEVICE ? 138 : null,
    cadence: 166,
    strideLength: 0.92,
    calories: 0,
  });

  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 1. 模拟定位
  useEffect(() => {
    if (runStatus !== 'locating') return;

    const locateTimer = setTimeout(() => {
      setSignalStrength('weak');
      setRunStatus('ready');
    }, 1500);

    return () => clearTimeout(locateTimer);
  }, [runStatus]);

  // 2. 跑步中：模拟时间、距离、路线点、运动指标
  useEffect(() => {
    if (runStatus !== 'running') return;

    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        const nextSeconds = prevSeconds + 1;

        const progress = Math.min(
          nextSeconds / MOCK_ROUTE_DURATION_SECONDS,
          1
        );

        const nextRouteIndex = Math.floor(
          progress * (SMOOTH_MOCK_ROUTE.length - 1)
        );

        setRouteIndex(nextRouteIndex);

        const nextDistance = parseFloat(
          (progress * MOCK_TOTAL_DISTANCE_KM).toFixed(2)
        );

        setDistance(nextDistance);

        setMetrics(prev => {
          const nextHeartRate = MOCK_HAS_EXTERNAL_DEVICE
            ? Math.round(136 + Math.random() * 18)
            : null;

          return {
            heartRate: nextHeartRate,
            cadence: Math.round(162 + Math.random() * 10),
            strideLength: parseFloat((0.88 + Math.random() * 0.1).toFixed(2)),
            calories: Math.max(prev.calories + 1, Math.round(nextSeconds * 0.12)),
          };
        });

        return nextSeconds;
      });
    }, 1000);

    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(notificationTimer);
    };
  }, [runStatus]);

  // 3. 开始前倒计时
  useEffect(() => {
    if (runStatus !== 'countdown') return;

    if (countdown <= 0) {
      setRunStatus('running');
      setCountdown(3);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [runStatus, countdown]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }

    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const timeText = formatTime(seconds);
  const timeTextSize = timeText.length > 5 ? 'text-3xl' : 'text-4xl';

  const handleStart = () => {
    setCountdown(3);
    setRunStatus('countdown');
  };

  const handleCancelCountdown = () => {
    setCountdown(3);
    setRunStatus('ready');
  };

  const handleFinish = () => {
    setRunStatus('success');

    setTimeout(() => {
      navigate('/settlement');
    }, 1800);
  };

  const cancelHoldFinish = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    setHoldProgress(0);
  };

  const startHoldFinish = () => {
    if (holdTimerRef.current) return;

    const duration = 2400;
    const interval = 30;
    let elapsed = 0;

    holdTimerRef.current = setInterval(() => {
      elapsed += interval;
      const progress = Math.min(elapsed / duration, 1);
      setHoldProgress(progress);

      if (progress >= 1) {
        cancelHoldFinish();
        handleFinish();
      }
    }, interval);
  };

  const handleBack = () => {
    if (runStatus === 'running') {
      setShowExitModal(true);
      return;
    }

    navigate(-1);
  };

  const handleContinueInBackground = () => {
    // 静态原型：这里只展示“后台继续记录”的交互含义，不做真实后台计时
    navigate(-1);
  };

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* 地图背景 */}
      <div
        className={cn(
          'absolute inset-0 z-0 transition-all duration-700',
          viewMode === 'map' ? 'opacity-100' : 'opacity-35 blur-[1px]'
        )}
      >
        <ExerciseRouteMap
          route={SMOOTH_MOCK_ROUTE}
          currentIndex={runStatus === 'running' ? routeIndex : 0}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/20 to-slate-950/90 pointer-events-none" />
      </div>

      {/* 倒计时遮罩 */}
      <AnimatePresence>
        {runStatus === 'countdown' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="text-[9rem] font-black italic leading-none"
            >
              {countdown}
            </motion.div>

            <p className="mt-4 text-sm text-slate-400 font-bold tracking-widest">
              准备开始跑步
            </p>

            <button
              onClick={handleCancelCountdown}
              className="mt-10 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-sm font-bold active:scale-95"
            >
              取消
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 成功遮罩 */}
      <AnimatePresence>
        {runStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-emerald-950/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/50">
                <CheckCircle size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-black text-white mb-3">打卡成功</h2>
              <p className="text-emerald-200 font-medium animate-pulse">
                正在生成运动轨迹与结算数据...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 返回/后台确认弹窗 */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="w-full bg-slate-900 border border-white/10 rounded-[2rem] p-6 shadow-2xl"
            >
              <h3 className="text-xl font-black mb-2">正在跑步中</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                返回按钮不会直接结束打卡。你可以选择后台继续记录，或留在跑步页面继续运动。
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleContinueInBackground}
                  className="w-full h-14 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center gap-2 active:scale-95"
                >
                  <Minimize2 size={20} />
                  后台继续记录
                </button>

                <button
                  onClick={() => setShowExitModal(false)}
                  className="w-full h-14 rounded-full bg-white/10 text-white border border-white/10 font-black flex items-center justify-center gap-2 active:scale-95"
                >
                  <StopCircle size={20} />
                  留在跑步页面
                </button>

                <button
                  onClick={() => setShowExitModal(false)}
                  className="w-full h-12 rounded-full bg-white/5 text-slate-300 font-bold"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 实时通知横幅 */}
      <AnimatePresence>
        {showNotification && runStatus === 'running' && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-4 inset-x-4 z-40"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Timer className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    正在打卡跑步
                  </p>
                  <p className="text-xs font-bold text-white">
                    当前距离: {distance.toFixed(2)} km
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowNotification(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 顶部 Header */}
      <div className="relative z-10 px-6 pt-12 flex justify-between items-center">
        <button
          onClick={handleBack}
          className="min-w-10 h-10 px-3 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center gap-1"
        >
          <ChevronLeft size={22} />
          {runStatus === 'running' && (
            <span className="text-[10px] font-black">后台</span>
          )}
        </button>

        {runStatus !== 'locating' && (
          <div className="flex bg-white/5 backdrop-blur-md rounded-2xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode('stats')}
              className={cn(
                'px-4 py-1.5 rounded-xl text-xs font-black transition-all',
                viewMode === 'stats'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'text-white/40'
              )}
            >
              数据
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={cn(
                'px-4 py-1.5 rounded-xl text-xs font-black transition-all',
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'text-white/40'
              )}
            >
              地图
            </button>
          </div>
        )}

        <div
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-2xl border',
            signalStrength === 'weak'
              ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
              : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
          )}
        >
          <Signal size={12} className="animate-pulse" />
          <span className="text-[10px] font-black">
            {signalStrength === 'weak' ? '信号弱' : '信号佳'}
          </span>
        </div>
      </div>

      {/* 主视图 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {runStatus === 'locating' && (
            <motion.div
              key="locating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-slate-800/80 rounded-full flex items-center justify-center mb-6 animate-pulse border-4 border-slate-700">
                <MapPin className="text-emerald-500 animate-bounce" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">正在获取定位</h3>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                检测有效打卡区域...
              </p>
            </motion.div>
          )}

          {(runStatus === 'ready' || runStatus === 'running') && viewMode === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center space-y-2 mb-12">
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                  当前里程 公里
                </p>
                <motion.h2 className="text-[10rem] font-black italic tracking-tighter leading-none text-white drop-shadow-2xl">
                  {distance.toFixed(2)}
                </motion.h2>
              </div>

              <div className="grid grid-cols-2 w-full gap-5">
                <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-5 border border-white/10 text-center overflow-hidden">
                  <p className="text-slate-500 text-[10px] font-black mb-2 uppercase tracking-widest">
                    持续时间
                  </p>
                  <p
                    className={cn(
                      'font-black font-mono tracking-tighter leading-none',
                      timeTextSize
                    )}
                  >
                    {timeText}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-5 border border-white/10 text-center overflow-hidden">
                  <p className="text-slate-500 text-[10px] font-black mb-2 uppercase tracking-widest">
                    当前配速
                  </p>
                  <p className="text-4xl font-black font-mono tracking-tighter leading-none">
                    {distance > 0 ? "5'28\"" : "--'--"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 w-full gap-3 mt-5">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <HeartPulse size={16} className="mx-auto mb-1 text-rose-300" />
                  <p className="text-[9px] text-slate-500 font-black mb-1">心率</p>
                  <p
                    className={cn(
                      'text-lg font-black',
                      metrics.heartRate ? 'text-rose-300' : 'text-slate-500'
                    )}
                  >
                    {metrics.heartRate ? metrics.heartRate : '--'}
                  </p>
                  <p className="text-[8px] text-slate-500">bpm</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <Footprints size={16} className="mx-auto mb-1 text-emerald-300" />
                  <p className="text-[9px] text-slate-500 font-black mb-1">步频</p>
                  <p className="text-lg font-black text-white">{metrics.cadence}</p>
                  <p className="text-[8px] text-slate-500">spm</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <Ruler size={16} className="mx-auto mb-1 text-blue-300" />
                  <p className="text-[9px] text-slate-500 font-black mb-1">步幅</p>
                  <p className="text-lg font-black text-white">{metrics.strideLength}</p>
                  <p className="text-[8px] text-slate-500">m</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <Flame size={16} className="mx-auto mb-1 text-orange-300" />
                  <p className="text-[9px] text-slate-500 font-black mb-1">热量</p>
                  <p className="text-lg font-black text-orange-300">{metrics.calories}</p>
                  <p className="text-[8px] text-slate-500">kcal</p>
                </div>
              </div>

              {!MOCK_HAS_EXTERNAL_DEVICE && (
                <p className="mt-3 text-[10px] text-slate-400 font-bold">
                  连接 Apple Watch / 华为手环后可查看实时心率
                </p>
              )}
            </motion.div>
          )}

          {(runStatus === 'ready' || runStatus === 'running') && viewMode === 'map' && (
            <motion.div
              key="map-floating"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-8 left-4 max-w-[72%]"
            >
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs font-black">
                  {runStatus === 'ready' ? '当前位置：操场起始点' : '正在记录运动轨迹'}
                </p>
                <p className="text-[10px] text-slate-300 mt-1">
                  {distance.toFixed(2)} km · {formatTime(seconds)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部操作区 */}
      <div className="relative z-10 p-8 pb-12 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
        {runStatus === 'ready' && signalStrength === 'weak' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6 bg-amber-500/10 py-2 px-4 rounded-full border border-amber-500/20"
          >
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-400">
              信号较弱，已自动扩大有效识别范围
            </span>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {runStatus === 'ready' && (
            <motion.button
              key="start-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleStart}
              className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full text-xl font-black shadow-xl shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play size={24} className="fill-current" />
              开始跑步
            </motion.button>
          )}

          {runStatus === 'running' && (
            <motion.button
              key="finish-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onPointerDown={startHoldFinish}
              onPointerUp={cancelHoldFinish}
              onPointerLeave={cancelHoldFinish}
              onPointerCancel={cancelHoldFinish}
              className="relative w-full h-16 bg-rose-500/30 text-white rounded-full text-xl font-black shadow-xl shadow-rose-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden border border-rose-400/30"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-rose-500"
                animate={{ width: `${holdProgress * 100}%` }}
                transition={{ duration: 0.05 }}
              />

              <span className="relative z-10 flex items-center justify-center gap-2">
                <Square size={20} className="fill-current" />
                {holdProgress > 0 ? '继续长按结束' : '长按结束打卡'}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActiveExercise;