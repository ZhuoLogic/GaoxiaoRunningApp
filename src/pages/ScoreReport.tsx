import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Award, Zap, Ruler } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

const ScoreReport: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="px-5 pt-12 pb-6 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-black text-slate-900">综合体育成绩单</h2>
        <button className="p-2 -mr-2 text-slate-400">
          <Share2 size={20} />
        </button>
      </div>

      <div className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
        {/* Total Score Header */}
        <div className="relative h-48 rounded-[2.5rem] bg-emerald-500 overflow-hidden flex flex-col items-center justify-center text-white shadow-xl shadow-emerald-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <p className="text-emerald-100 text-sm font-medium mb-1 uppercase tracking-widest">综合评分</p>
          <div className="flex items-baseline">
            <h1 className="text-7xl font-black italic tracking-tighter">88</h1>
            <span className="text-2xl font-bold ml-1">良好</span>
          </div>
          <p className="mt-2 text-emerald-100/80 text-xs">击败了全校 78% 的同学</p>
        </div>

        {/* Evaluation Radar Visualization (SVG) */}
        <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="font-bold text-slate-800 mb-6">体能维度评估</h3>
            <div className="relative w-full aspect-square flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                {/* Background Circles */}
                {[40, 70, 100].map(r => (
                  <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                ))}
                {/* Axes */}
                {[0, 72, 144, 216, 288].map(deg => {
                  const x = 100 + 100 * Math.cos((deg - 90) * Math.PI / 180);
                  const y = 100 + 100 * Math.sin((deg - 90) * Math.PI / 180);
                  return <line key={deg} x1="100" y1="100" x2={x} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
                })}
                {/* Polygon Area */}
                <polygon 
                  points="100,20 180,85 150,165 50,165 20,85" 
                  fill="rgba(16, 185, 129, 0.2)" 
                  stroke="#10b981" 
                  strokeWidth="2"
                />
                {/* Labels (Conceptual) */}
                <text x="100" y="15" textAnchor="middle" fontSize="10" className="fill-slate-400 font-bold">耐力</text>
                <text x="190" y="85" textAnchor="start" fontSize="10" className="fill-slate-400 font-bold">速度</text>
                <text x="160" y="180" textAnchor="middle" fontSize="10" className="fill-slate-400 font-bold">力量</text>
                <text x="40" y="180" textAnchor="middle" fontSize="10" className="fill-slate-400 font-bold">柔韧</text>
                <text x="10" y="85" textAnchor="end" fontSize="10" className="fill-slate-400 font-bold">技巧</text>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            <h3 className="font-black text-slate-900">成绩结构化概览</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: '平时打卡得分', val: '28.5', total: '30', icon: Zap, color: 'text-orange-500 bg-orange-50', desc: '累计里程 124.5km, 达标率 95%' },
              { label: '体育课内得分', val: '35.0', total: '40', icon: Award, color: 'text-blue-500 bg-blue-50', desc: '课程考勤 100%, 技能考核评分 A-' },
              { label: '体测得分', val: '24.5', total: '30', icon: Ruler, color: 'text-emerald-500 bg-emerald-50', desc: '肺活量、立定跳远表现突出' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:bg-slate-100 transition-colors" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", item.color)}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <span className="font-black text-slate-900 text-sm block">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.desc}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-900">{item.val}</span>
                      <span className="text-[10px] text-slate-400 font-bold ml-1">/ {item.total}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseFloat(item.val) / parseFloat(item.total)) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                      className={cn("h-full rounded-full", item.color.split(' ')[0].replace('text', 'bg'))} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestion */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI 运动建议</h4>
          <p className="text-sm font-medium leading-relaxed">
            你的耐力和平时打卡表现优异，但速度维度仍有提升空间。建议增加 50 米冲刺跑训练。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreReport;
