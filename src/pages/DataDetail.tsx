import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Info, Activity, Timer, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const DataDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="px-5 pt-12 pb-6 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-black text-slate-900">运动详情</h2>
        <button className="p-2 -mr-2 text-slate-400">
          <Share2 size={20} />
        </button>
      </div>

      <div className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
        {/* Core Stats Overview */}
        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50 flex flex-col items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">本次跑步距离</p>
          <h1 className="text-6xl font-black italic tracking-tighter text-slate-900">3.21<span className="text-xl ml-1 not-italic">KM</span></h1>
          <div className="mt-8 grid grid-cols-3 w-full gap-4 text-center">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">用时</p>
              <p className="font-black text-slate-900">18:24</p>
            </div>
            <div className="border-x border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">平均配速</p>
              <p className="font-black text-emerald-600">5'42"</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">热量</p>
              <p className="font-black text-slate-900">212kcal</p>
            </div>
          </div>
        </section>

        {/* Pace Chart Placeholder */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              配速曲线
            </h3>
            <Badge variant="outline" className="text-[9px] font-black text-emerald-600 border-emerald-100 bg-emerald-50 uppercase">里程碑: 本月最快</Badge>
          </div>
          <Card className="border-none shadow-xl shadow-slate-200/40 bg-white rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="w-full h-44 flex items-end gap-2">
                {[40, 55, 45, 65, 50, 80, 75, 90, 85, 60, 45, 35].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-50 rounded-full relative group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                      className={cn("absolute bottom-0 left-0 right-0 rounded-full transition-all group-hover:opacity-80", h > 80 ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" : "bg-emerald-200")}
                    />
                    {h > 80 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <Zap size={10} className="text-emerald-500 fill-emerald-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6 text-[10px] font-black text-slate-300 uppercase tracking-widest px-2">
                <span>1.0km</span>
                <span>2.0km</span>
                <span>3.0km</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cadence Chart Placeholder */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              步频分析 (spm)
            </h3>
          </div>
          <Card className="border-none shadow-xl shadow-slate-200/40 bg-white rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="relative h-24 w-full flex items-center">
                <svg viewBox="0 0 300 100" className="w-full h-full">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2 }}
                    d="M0,50 Q25,30 50,60 T100,40 T150,70 T200,30 T250,50 T300,40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                </svg>
                <div className="absolute right-0 top-0 bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-sm">Avg: 178</div>
              </div>
              <div className="flex justify-between mt-4 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                <span>起跑</span>
                <span>加速</span>
                <span>冲刺</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Metrics */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400">平均步频</p>
              <p className="font-black text-slate-900">178<span className="text-[10px] ml-0.5">spm</span></p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
              <Timer size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400">平均步幅</p>
              <p className="font-black text-slate-900">0.98<span className="text-[10px] ml-0.5">m</span></p>
            </div>
          </div>
        </section>

        {/* Route Map */}
        <section className="space-y-4">
          <h3 className="font-bold text-slate-800">运动轨迹</h3>
          <div className="w-full h-64 rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative">
            <img src="https://modao.cc/agent-py/media/generated_images/2026-04-30/a578ffa44f8e459585207ee2958c0a10.jpg#desc=High%20Resolution%20GPS%20Track%20on%20Campus%20Map" alt="Track Detail" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur shadow-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-600 tracking-wide">起点: 东校区主体育场</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataDetail;
