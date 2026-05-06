import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

const History: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  
  // 新增：时间范围状态控制 (本周 / 本月)
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('month');

  // 原始模拟数据
  const historyItems = [
    { type: '跑步打卡', date: '2026-04-28', time: '17:30', val: '3.21km', duration: '18:24', status: 'success' },
    { type: '场地打卡', date: '2026-04-25', time: '19:00', val: '篮球馆', duration: '60:00', status: 'success' },
    { type: '跑步打卡', date: '2026-04-22', time: '07:15', val: '2.50km', duration: '15:10', status: 'success' },
    { type: '场地打卡', date: '2026-04-20', time: '16:00', val: '羽毛球馆', duration: '45:00', status: 'fail' },
    { type: '跑步打卡', date: '2026-04-18', time: '18:45', val: '4.10km', duration: '22:45', status: 'success' },
  ];

  // 新增：根据 timeRange 过滤数据
  // 这里做了一个简单的 mock 逻辑，假设 22 号及以后是“本周”
  const displayItems = timeRange === 'month' 
    ? historyItems 
    : historyItems.filter(item => parseInt(item.date.split('-')[2]) >= 22);

  // 动态计算打卡次数（演示用，可以根据你的真实业务逻辑替换）
  const totalCount = displayItems.length;

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="px-5 pt-12 pb-6 bg-white border-b border-slate-50 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900">运动记录</h2>
          <div className="flex bg-slate-50 p-1 rounded-2xl">
            <button 
              onClick={() => setView('list')}
              className={cn("p-2.5 rounded-xl transition-all", view === 'list' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400")}
            >
              <Filter size={20} />
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={cn("p-2.5 rounded-xl transition-all", view === 'calendar' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400")}
            >
              <Calendar size={20} />
            </button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full bg-slate-50 rounded-xl p-1 grid grid-cols-3">
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">全部</TabsTrigger>
            <TabsTrigger value="run" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">跑步</TabsTrigger>
            <TabsTrigger value="venue" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">场地</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
        
        {/* 新增：本周 / 本月 切换按钮 */}
        <div className="flex justify-center">
          <div className="flex bg-slate-200/50 p-1 rounded-2xl w-48 shadow-inner">
            <button 
              onClick={() => setTimeRange('week')}
              className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", timeRange === 'week' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              本周
            </button>
            <button 
              onClick={() => setTimeRange('month')}
              className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", timeRange === 'month' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              本月
            </button>
          </div>
        </div>

        {/* 动态更新：累计统计卡片 */}
        <div className="flex items-center justify-between bg-emerald-500 rounded-3xl p-6 text-white shadow-lg shadow-emerald-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-wider">
                {timeRange === 'week' ? '本周累计' : '本月累计'}
              </p>
              <h3 className="text-xl font-black">{totalCount} 次打卡</h3>
            </div>
          </div>
          <ChevronRight size={24} className="text-emerald-200" />
        </div>

        {/* List Content */}
        <div className="space-y-4 pb-20">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {view === 'calendar' 
                ? (timeRange === 'month' ? '2026年4月打卡分布' : '本周打卡分布')
                : (timeRange === 'month' ? '本月全部记录' : '本周全部记录')}
            </h4>
          </div>

          {view === 'calendar' ? (
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                  <span key={d} className="text-[10px] font-black text-slate-300 uppercase">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  // 在日历视图中，如果在“本周”模式下，可以考虑只高亮本周的打卡，这里暂时保留原来的全局高亮逻辑
                  const hasHistory = [5, 8, 12, 18, 20, 22, 25, 28].includes(day);
                  
                  // 如果是本周模式，为了视觉效果，我们可以将非本周的日期变暗（示例：大于21号为本周）
                  const isThisWeek = day > 21;
                  const dimDate = timeRange === 'week' && !isThisWeek;

                  return (
                    <div 
                      key={i} 
                      className={cn(
                        "aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all",
                        hasHistory ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100 scale-110" : "text-slate-400 hover:bg-slate-50",
                        dimDate && "opacity-20" // 非本周的日期变得半透明
                      )}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50 flex justify-around">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">已达标</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-100" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">未运动</span>
                </div>
              </div>
            </div>
          ) : (
            // 动态渲染：使用过滤后的 displayItems
            displayItems.map((item, i) => (
              <div 
                key={i} 
                onClick={() => navigate('/detail')}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm active:bg-slate-50 transition-all flex items-center justify-between group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm",
                    item.type === '跑步打卡' ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-500"
                  )}>
                    <span className="text-2xl">{item.type === '跑步打卡' ? '🏃' : '📍'}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-black text-slate-900 text-sm">{item.type}</p>
                      {item.status === 'fail' && <Badge className="text-[8px] bg-rose-500 text-white border-none h-4 px-1.5 font-black uppercase tracking-tighter" variant="outline">异常</Badge>}
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.date} · {item.time}</p>
                  </div>
                </div>
                <div className="text-right relative z-10">
                  <p className="font-black text-slate-900 text-lg italic tracking-tighter">{item.val}</p>
                  <p className="text-[10px] text-emerald-500 font-black uppercase">{item.duration}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="w-full py-4 text-xs font-bold text-slate-400">没有更多记录了</button>
      </div>
    </div>
  );
};

export default History;