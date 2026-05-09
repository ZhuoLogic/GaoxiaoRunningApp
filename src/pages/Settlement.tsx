import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Share2,
  ArrowRight,
  Trophy,
  HeartPulse,
  Flame,
  Footprints,
  Ruler,
  Timer,
  Route,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ExerciseRouteMap, { LatLngPoint } from '../components/ExerciseRouteMap';

const mockRoute: LatLngPoint[] = [
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

const mockSummary = {
  distance: 3.56,
  calories: 245,
  duration: '23:18',
  avgHeartRate: 142,
  maxHeartRate: 168,
  cadence: 166,
  strideLength: 0.92,
  hasExternalDevice: false,
};

const Settlement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-slate-50 flex flex-col px-6 py-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200"
        >
          <CheckCircle2 size={48} className="text-white" />
        </motion.div>

        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">打卡成功！</h2>
          <p className="text-slate-500 font-medium">恭喜张同学，今日打卡任务已完成</p>
        </div>

        {/* 顶部核心数据 */}
        <div className="w-full grid grid-cols-2 gap-4">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                本次运动
              </p>
              <p className="text-2xl font-black text-emerald-600">
                {mockSummary.distance.toFixed(2)}
                <span className="text-xs ml-0.5">km</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                消耗热量
              </p>
              <p className="text-2xl font-black text-orange-500">
                {mockSummary.calories}
                <span className="text-xs ml-0.5">kcal</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 扩展运动指标 */}
        <div className="w-full grid grid-cols-2 gap-3">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Timer size={16} className="text-emerald-500" />
                <p className="text-[10px] text-slate-400 font-black">运动时长</p>
              </div>
              <p className="text-xl font-black text-slate-900">
                {mockSummary.duration}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <HeartPulse
                  size={16}
                  className={mockSummary.hasExternalDevice ? 'text-rose-500' : 'text-slate-300'}
                />
                <p className="text-[10px] text-slate-400 font-black">平均心率</p>
              </div>

              {mockSummary.hasExternalDevice ? (
                <p className="text-xl font-black text-slate-900">
                  {mockSummary.avgHeartRate}
                  <span className="text-[10px] text-slate-400 ml-1">bpm</span>
                </p>
              ) : (
                <p className="text-xs font-bold text-slate-400">
                  连接设备可查看
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <HeartPulse
                  size={16}
                  className={mockSummary.hasExternalDevice ? 'text-orange-500' : 'text-slate-300'}
                />
                <p className="text-[10px] text-slate-400 font-black">最大心率</p>
              </div>

              {mockSummary.hasExternalDevice ? (
                <p className="text-xl font-black text-slate-900">
                  {mockSummary.maxHeartRate}
                  <span className="text-[10px] text-slate-400 ml-1">bpm</span>
                </p>
              ) : (
                <p className="text-xs font-bold text-slate-400">
                  连接设备可查看
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Footprints size={16} className="text-emerald-500" />
                <p className="text-[10px] text-slate-400 font-black">平均步频</p>
              </div>
              <p className="text-xl font-black text-slate-900">
                {mockSummary.cadence}
                <span className="text-[10px] text-slate-400 ml-1">spm</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Ruler size={16} className="text-blue-500" />
                <p className="text-[10px] text-slate-400 font-black">平均步幅</p>
              </div>
              <p className="text-xl font-black text-slate-900">
                {mockSummary.strideLength}
                <span className="text-[10px] text-slate-400 ml-1">m</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Route size={16} className="text-violet-500" />
                <p className="text-[10px] text-slate-400 font-black">路线轨迹</p>
              </div>
              <p className="text-xl font-black text-slate-900">已生成</p>
            </CardContent>
          </Card>
        </div>

        {!mockSummary.hasExternalDevice && (
          <div className="w-full bg-slate-100 text-slate-500 rounded-2xl px-4 py-3 text-xs font-bold">
            当前未检测到外部设备，连接 Apple Watch / 华为手环后可查看平均心率和最大心率。
          </div>
        )}

        {/* 能量换算 */}
        <div className="w-full bg-white border border-slate-100 rounded-[2.5rem] p-8 flex items-center justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 opacity-50" />

          <div className="text-left relative z-10">
            <p className="text-[10px] text-orange-600 font-black mb-1 uppercase tracking-widest">
              能量换算
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-slate-900 font-black text-lg">相当于消耗了</p>
              <p className="text-orange-500 text-3xl font-black italic">2.4</p>
              <p className="text-slate-900 font-black text-lg">个</p>
            </div>
            <p className="text-slate-400 font-bold text-xs mt-1">
              食堂同款 · 爱心荷包蛋 🍳
            </p>
          </div>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center shadow-inner text-4xl relative z-10"
          >
            🍳
          </motion.div>
        </div>

        {/* 完整路线轨迹 */}
        <div className="w-full h-64 rounded-[2.5rem] overflow-hidden relative border border-slate-100 shadow-md bg-slate-200">
          <ExerciseRouteMap route={mockRoute} isFinished />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
                <Trophy className="text-white" size={20} />
              </div>
              <div>
                <p className="text-white text-xs font-black uppercase tracking-widest">
                  解锁勋章
                </p>
                <p className="text-yellow-400 text-sm font-black">
                  校园清晨跑者
                </p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-tighter">
              2026.04.30
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <div className="flex gap-4">
          <Button
            onClick={() => navigate('/feedback')}
            className="flex-1 h-16 bg-white text-rose-500 border-2 border-rose-100 hover:bg-rose-50 rounded-[2rem] font-black flex gap-2 shadow-sm transition-all active:scale-95"
          >
            申诉此记录
          </Button>

          <Button
            className="flex-1 h-16 bg-white text-slate-900 border-2 border-slate-100 hover:bg-slate-50 hover:border-emerald-100 rounded-[2rem] font-black flex gap-2 shadow-sm transition-all active:scale-95"
          >
            <Share2 size={20} className="text-emerald-500" />
            分享成就
          </Button>
        </div>

        <Button
          onClick={() => navigate('/home')}
          className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] font-black flex gap-2 shadow-xl shadow-emerald-500/30 transition-all active:scale-95"
        >
          返回首页 <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Settlement;
