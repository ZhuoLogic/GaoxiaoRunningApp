import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Share2,
  Activity,
  Timer,
  Zap,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const DataDetail: React.FC = () => {
  const navigate = useNavigate();

  const paceData = [
    { km: '0.5', pace: 6.1 },
    { km: '1.0', pace: 5.8 },
    { km: '1.5', pace: 5.9 },
    { km: '2.0', pace: 5.5 },
    { km: '2.5', pace: 5.7 },
    { km: '3.0', pace: 5.3 },
    { km: '3.2', pace: 5.4 },
  ];

  const cadenceData = [
    { label: '起跑', value: 168 },
    { label: '0.5km', value: 172 },
    { label: '1.0km', value: 176 },
    { label: '1.5km', value: 174 },
    { label: '2.0km', value: 180 },
    { label: '2.5km', value: 182 },
    { label: '冲刺', value: 178 },
  ];

  const paceMin = 5.0;
  const paceMax = 6.5;
  const cadenceMin = 160;
  const cadenceMax = 190;

  const getPaceBarHeight = (pace: number) => {
    // 配速数值越小代表越快，所以这里反向计算高度
    const normalized = (paceMax - pace) / (paceMax - paceMin);
    return Math.max(18, Math.min(100, normalized * 100));
  };

  const getCadencePoint = (value: number, index: number) => {
    const chartWidth = 240;
    const chartHeight = 120;
    const paddingX = 24;
    const paddingY = 18;

    const usableWidth = chartWidth - paddingX * 2;
    const usableHeight = chartHeight - paddingY * 2;

    const x = paddingX + (index / (cadenceData.length - 1)) * usableWidth;
    const normalized = (value - cadenceMin) / (cadenceMax - cadenceMin);
    const y = paddingY + (1 - normalized) * usableHeight;

    return { x, y };
  };

  const cadencePath = cadenceData
    .map((item, index) => {
      const point = getCadencePoint(item.value, index);
      return `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`;
    })
    .join(' ');

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="px-5 pt-12 pb-6 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-900"
        >
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
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
            本次跑步距离
          </p>

          <h1 className="text-6xl font-black italic tracking-tighter text-slate-900">
            3.21
            <span className="text-xl ml-1 not-italic">KM</span>
          </h1>

          <div className="mt-8 grid grid-cols-3 w-full gap-4 text-center">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                用时
              </p>
              <p className="font-black text-slate-900">18:24</p>
            </div>

            <div className="border-x border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                平均配速
              </p>
              <p className="font-black text-emerald-600">5'42"</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                热量
              </p>
              <p className="font-black text-slate-900">212kcal</p>
            </div>
          </div>
        </section>

        {/* Pace Chart */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              配速曲线
            </h3>

            <Badge
              variant="outline"
              className="text-[9px] font-black text-emerald-600 border-emerald-100 bg-emerald-50 uppercase"
            >
              里程碑: 本月最快
            </Badge>
          </div>

          <Card className="border-none shadow-xl shadow-slate-200/40 bg-white rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-black text-slate-900">
                    每段配速
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold">
                    单位：min/km，数值越低代表跑得越快
                  </p>
                </div>

                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black">
                  Avg 5'42"
                </div>
              </div>

              <div className="flex gap-3">
                {/* Y Axis */}
                <div className="h-44 flex flex-col justify-between text-[10px] font-black text-slate-400 pt-1 pb-7">
                  <span>5'00"</span>
                  <span>5'30"</span>
                  <span>6'00"</span>
                  <span>6'30"</span>
                </div>

                {/* Chart */}
                <div className="flex-1">
                  <div className="relative h-44">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pb-7">
                      {[0, 1, 2, 3].map(i => (
                        <div
                          key={i}
                          className="w-full border-t border-slate-100"
                        />
                      ))}
                    </div>

                    <div className="relative z-10 h-full flex items-end gap-2 pb-7">
                      {paceData.map((item, i) => {
                        const height = getPaceBarHeight(item.pace);
                        const isFast = item.pace <= 5.4;

                        return (
                          <div
                            key={i}
                            className="flex-1 h-full flex flex-col justify-end items-center group"
                          >
                            <div className="relative w-full flex items-end justify-center flex-1">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.8, delay: i * 0.06 }}
                                className={cn(
                                  'w-full max-w-[18px] rounded-t-full transition-all group-hover:opacity-80',
                                  isFast
                                    ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                                    : 'bg-emerald-200'
                                )}
                              />

                              {isFast && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                  <Zap
                                    size={10}
                                    className="text-emerald-500 fill-emerald-500"
                                  />
                                </div>
                              )}
                            </div>

                            <p className="mt-2 text-[9px] font-black text-slate-400">
                              {item.km}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between mt-1 text-[9px] font-black text-slate-300 uppercase tracking-widest px-1">
                    <span>距离 km</span>
                    <span>配速 min/km</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cadence Chart */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              步频分析
            </h3>

            <Badge
              variant="outline"
              className="text-[9px] font-black text-blue-600 border-blue-100 bg-blue-50 uppercase"
            >
              Avg: 178 spm
            </Badge>
          </div>

          <Card className="border-none shadow-xl shadow-slate-200/40 bg-white rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-black text-slate-900">
                    步频变化
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold">
                    单位：spm，每分钟步数
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* Y Axis */}
                <div className="h-40 flex flex-col justify-between text-[10px] font-black text-slate-400 pt-3 pb-5">
                  <span>190</span>
                  <span>180</span>
                  <span>170</span>
                  <span>160</span>
                </div>

                {/* Chart */}
                <div className="flex-1">
                  <div className="relative h-40 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100">
                    {/* Grid */}
                    <div className="absolute inset-x-0 top-[18px] border-t border-white" />
                    <div className="absolute inset-x-0 top-[46px] border-t border-white" />
                    <div className="absolute inset-x-0 top-[74px] border-t border-white" />
                    <div className="absolute inset-x-0 top-[102px] border-t border-white" />

                    <svg
                      viewBox="0 0 240 120"
                      preserveAspectRatio="none"
                      className="absolute inset-0 w-full h-full"
                    >
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        d={cadencePath}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {cadenceData.map((item, index) => {
                        const point = getCadencePoint(item.value, index);

                        return (
                          <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="3.5"
                            fill="white"
                            stroke="#3b82f6"
                            strokeWidth="2"
                          />
                        );
                      })}
                    </svg>

                    <div className="absolute right-3 top-3 bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-sm">
                      178 spm
                    </div>
                  </div>

                  <div className="grid grid-cols-7 mt-2 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                    {cadenceData.map((item, index) => (
                      <span
                        key={index}
                        className="text-center truncate"
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between mt-2 text-[9px] font-black text-slate-300 uppercase tracking-widest px-1">
                    <span>跑步阶段</span>
                    <span>步频 spm</span>
                  </div>
                </div>
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
              <p className="text-[10px] font-bold text-slate-400">
                平均步频
              </p>
              <p className="font-black text-slate-900">
                178
                <span className="text-[10px] ml-0.5">spm</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
              <Timer size={20} />
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400">
                平均步幅
              </p>
              <p className="font-black text-slate-900">
                0.98
                <span className="text-[10px] ml-0.5">m</span>
              </p>
            </div>
          </div>
        </section>

        {/* Route Map */}
        <section className="space-y-4">
          <h3 className="font-bold text-slate-800">运动轨迹</h3>

          <div className="w-full h-64 rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative">
            <img
              src="https://modao.cc/agent-py/media/generated_images/2026-04-30/a578ffa44f8e459585207ee2958c0a10.jpg#desc=High%20Resolution%20GPS%20Track%20on%20Campus%20Map"
              alt="Track Detail"
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur shadow-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-600 tracking-wide">
                起点: 东校区主体育场
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataDetail;
