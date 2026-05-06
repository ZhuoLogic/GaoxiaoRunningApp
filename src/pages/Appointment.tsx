import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

const Appointment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(12);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const dates = [
    { day: '一', date: 11 },
    { day: '二', date: 12 },
    { day: '三', date: 13 },
    { day: '四', date: 14 },
    { day: '五', date: 15 },
    { day: '六', date: 16 },
  ];

  const slots = [
    { time: '08:30 - 10:00', remain: 5 },
    { time: '10:15 - 11:45', remain: 0 },
    { time: '13:30 - 15:00', remain: 12 },
    { time: '15:15 - 16:45', remain: 8 },
    { time: '18:30 - 20:00', remain: 20 },
  ];

  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="px-5 pt-12 pb-6 border-b border-slate-50 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-black text-slate-900">体测预约</h2>
        <button className="p-2 -mr-2 text-slate-400">
          <Info size={20} />
        </button>
      </div>

      <div className="flex-1 px-5 py-6 space-y-8 overflow-y-auto">
        {/* Project Requirements */}
        <section className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
          <h3 className="text-slate-900 font-black text-sm mb-4 flex items-center gap-2">
            <div className="w-1 h-4 bg-emerald-500 rounded-full" />
            体测项目清单及要求
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: '身体形态', desc: '身高 / 体重 / 肺活量', icon: '📏' },
              { label: '身体机能', desc: '坐位体前屈 / 立定跳远', icon: '🤸' },
              { label: '身体素质', desc: '50米跑 / 800-1000米', icon: '⚡' },
              { label: '力量测试', desc: '仰卧起坐 / 引体向上', icon: '💪' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl group transition-all">
                <div className="text-xl w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div>
                  <p className="text-xs font-black text-slate-900 mb-0.5">{item.label}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Date Selector */}
        <section className="space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full" />
              日历视图
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">2026年5月</span>
          </div>
          <div className="flex justify-between gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
            {dates.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(d.date)}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center gap-2 w-14 py-4 rounded-2xl transition-all border",
                  selectedDate === d.date ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-200 scale-105" : "bg-white border-slate-100 text-slate-400"
                )}
              >
                <span className="text-[10px] font-black uppercase tracking-tighter">{d.day}</span>
                <span className="text-xl font-black">{d.date}</span>
                {selectedDate === d.date && <div className="w-1 h-1 bg-white rounded-full" />}
              </button>
            ))}
          </div>
        </section>

        {/* Time Slots */}
        <section className="space-y-4">
          <h3 className="font-black text-slate-900">选择时段</h3>
          <div className="space-y-3">
            {slots.map((s, i) => (
              <button
                key={i}
                disabled={s.remain === 0}
                onClick={() => setSelectedSlot(s.time)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
                  s.remain === 0 ? "bg-slate-50 border-slate-100 opacity-60" : 
                  selectedSlot === s.time ? "bg-white border-emerald-500 shadow-sm" : "bg-white border-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                    selectedSlot === s.time ? "bg-emerald-500 border-emerald-500" : "border-slate-200"
                  )}>
                    {selectedSlot === s.time && <Check size={12} className="text-white" />}
                  </div>
                  <span className={cn("text-sm font-bold", selectedSlot === s.time ? "text-emerald-600" : "text-slate-700")}>{s.time}</span>
                </div>
                <Badge variant={s.remain === 0 ? "secondary" : "outline"} className={cn("text-[10px] font-bold", s.remain > 0 ? "text-emerald-600 border-emerald-100 bg-emerald-50" : "text-slate-400")}>
                  {s.remain === 0 ? "已满" : `剩 ${s.remain} 名额`}
                </Badge>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="p-6 border-t border-slate-50 bg-white">
        <Button 
          disabled={!selectedSlot}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/20"
        >
          确认预约
        </Button>
      </div>
    </div>
  );
};

export default Appointment;
