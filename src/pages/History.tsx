import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  Footprints,
  MapPin,
  Trophy,
  Clock,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

type ViewType = 'list' | 'calendar';
type TimeRange = 'week' | 'month';
type ActivityFilter = 'all' | 'run' | 'venue';

type HistoryItem = {
  type: '跑步打卡' | '场地打卡';
  category: 'run' | 'venue';
  date: string;
  time: string;
  val: string;
  distanceKm: number;
  duration: string;
  durationMin: number;
  status: 'success' | 'fail';
};

const History: React.FC = () => {
  const navigate = useNavigate();

  const [view, setView] = useState<ViewType>('list');
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all');

  const historyItems: HistoryItem[] = [
    {
      type: '跑步打卡',
      category: 'run',
      date: '2026-04-28',
      time: '17:30',
      val: '3.21km',
      distanceKm: 3.21,
      duration: '18:24',
      durationMin: 18,
      status: 'success',
    },
    {
      type: '场地打卡',
      category: 'venue',
      date: '2026-04-25',
      time: '19:00',
      val: '篮球馆',
      distanceKm: 0,
      duration: '60:00',
      durationMin: 60,
      status: 'success',
    },
    {
      type: '跑步打卡',
      category: 'run',
      date: '2026-04-22',
      time: '07:15',
      val: '2.50km',
      distanceKm: 2.5,
      duration: '15:10',
      durationMin: 15,
      status: 'success',
    },
    {
      type: '场地打卡',
      category: 'venue',
      date: '2026-04-20',
      time: '16:00',
      val: '羽毛球馆',
      distanceKm: 0,
      duration: '45:00',
      durationMin: 45,
      status: 'fail',
    },
    {
      type: '跑步打卡',
      category: 'run',
      date: '2026-04-18',
      time: '18:45',
      val: '4.10km',
      distanceKm: 4.1,
      duration: '22:45',
      durationMin: 22,
      status: 'success',
    },
    {
      type: '跑步打卡',
      category: 'run',
      date: '2026-04-12',
      time: '08:00',
      val: '2.80km',
      distanceKm: 2.8,
      duration: '16:32',
      durationMin: 16,
      status: 'success',
    },
    {
      type: '场地打卡',
      category: 'venue',
      date: '2026-04-08',
      time: '18:20',
      val: '网球场',
      distanceKm: 0,
      duration: '50:00',
      durationMin: 50,
      status: 'success',
    },
    {
      type: '跑步打卡',
      category: 'run',
      date: '2026-04-05',
      time: '07:45',
      val: '1.90km',
      distanceKm: 1.9,
      duration: '12:20',
      durationMin: 12,
      status: 'success',
    },
  ];

  const filteredItems = useMemo(() => {
    return historyItems.filter(item => {
      const day = Number(item.date.split('-')[2]);

      const matchRange =
        timeRange === 'month'
          ? true
          : day >= 22;

      const matchType =
        activityFilter === 'all'
          ? true
          : item.category === activityFilter;

      return matchRange && matchType;
    });
  }, [timeRange, activityFilter]);

  const successItems = filteredItems.filter(item => item.status === 'success');
  const runItems = filteredItems.filter(item => item.category === 'run');
  const venueItems = filteredItems.filter(item => item.category === 'venue');

  const totalCount = filteredItems.length;
  const successCount = successItems.length;
  const successRate = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;
  const totalDistance = runItems.reduce((sum, item) => sum + item.distanceKm, 0);
  const totalDuration = filteredItems.reduce((sum, item) => sum + item.durationMin, 0);

  const weeklyRunBars = [
    { label: '一', value: 0 },
    { label: '二', value: 2.5 },
    { label: '三', value: 0 },
    { label: '四', value: 0 },
    { label: '五', value: 0 },
    { label: '六', value: 0 },
    { label: '日', value: 3.21 },
  ];

  const maxWeeklyRun = Math.max(...weeklyRunBars.map(item => item.value), 1);

  const monthlyTrend = [
    { label: '第1周', count: 2 },
    { label: '第2周', count: 2 },
    { label: '第3周', count: 2 },
    { label: '第4周', count: 3 },
  ];

  const maxMonthlyCount = Math.max(...monthlyTrend.map(item => item.count), 1);

  const activeDays = filteredItems.map(item => Number(item.date.split('-')[2]));

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="px-5 pt-12 pb-5 bg-white border-b border-slate-50 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
              Exercise History
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              运动记录
            </h2>
          </div>

          <div className="flex bg-slate-50 p-1 rounded-2xl">
            <button
              onClick={() => setView('list')}
              className={cn(
                'p-2.5 rounded-xl transition-all',
                view === 'list'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-400'
              )}
            >
              <Filter size={20} />
            </button>

            <button
              onClick={() => setView('calendar')}
              className={cn(
                'p-2.5 rounded-xl transition-all',
                view === 'calendar'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-400'
              )}
            >
              <Calendar size={20} />
            </button>
          </div>
        </div>

        <Tabs
          value={activityFilter}
          onValueChange={value => setActivityFilter(value as ActivityFilter)}
          className="w-full"
        >
          <TabsList className="w-full bg-slate-50 rounded-xl p-1 grid grid-cols-3">
            <TabsTrigger
              value="all"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              全部
            </TabsTrigger>
            <TabsTrigger
              value="run"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              跑步
            </TabsTrigger>
            <TabsTrigger
              value="venue"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              场地
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 px-5 py-5 space-y-5 overflow-y-auto">
        {/* 本周 / 本月 */}
        <div className="flex justify-center">
          <div className="flex bg-slate-200/50 p-1 rounded-2xl w-48 shadow-inner">
            <button
              onClick={() => setTimeRange('week')}
              className={cn(
                'flex-1 py-2 rounded-xl text-xs font-bold transition-all',
                timeRange === 'week'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              本周
            </button>

            <button
              onClick={() => setTimeRange('month')}
              className={cn(
                'flex-1 py-2 rounded-xl text-xs font-bold transition-all',
                timeRange === 'month'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              本月
            </button>
          </div>
        </div>

        {/* 概览统计 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-500 rounded-[1.75rem] p-5 text-white shadow-lg shadow-emerald-100">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
              <Trophy size={20} />
            </div>
            <p className="text-[10px] text-emerald-100 font-black mb-1">
              {timeRange === 'week' ? '本周打卡' : '本月打卡'}
            </p>
            <p className="text-3xl font-black leading-none">
              {totalCount}
              <span className="text-xs ml-1 text-emerald-100">次</span>
            </p>
          </div>

          <div className="bg-white rounded-[1.75rem] p-5 border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-3">
              <Footprints size={20} />
            </div>
            <p className="text-[10px] text-slate-400 font-black mb-1">
              跑步总量
            </p>
            <p className="text-3xl font-black text-slate-900 leading-none">
              {totalDistance.toFixed(1)}
              <span className="text-xs ml-1 text-slate-400">km</span>
            </p>
          </div>

          <div className="bg-white rounded-[1.75rem] p-5 border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-3">
              <MapPin size={20} />
            </div>
            <p className="text-[10px] text-slate-400 font-black mb-1">
              场地签到
            </p>
            <p className="text-3xl font-black text-slate-900 leading-none">
              {venueItems.length}
              <span className="text-xs ml-1 text-slate-400">次</span>
            </p>
          </div>

          <div className="bg-white rounded-[1.75rem] p-5 border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-3">
              <Clock size={20} />
            </div>
            <p className="text-[10px] text-slate-400 font-black mb-1">
              运动时长
            </p>
            <p className="text-3xl font-black text-slate-900 leading-none">
              {totalDuration}
              <span className="text-xs ml-1 text-slate-400">min</span>
            </p>
          </div>
        </div>

        {/* 趋势统计 */}
        <section className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <BarChart3 size={18} className="text-emerald-500" />
              进步趋势
            </h3>

            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[10px]">
              {successRate}% 达标率
            </Badge>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black text-slate-500">
                本周跑步量
              </p>
              <p className="text-xs font-black text-orange-500">
                {weeklyRunBars.reduce((sum, item) => sum + item.value, 0).toFixed(1)} km
              </p>
            </div>

            <div className="h-32 flex items-end justify-between gap-2">
              {weeklyRunBars.map((item, index) => {
                const height = Math.max((item.value / maxWeeklyRun) * 100, item.value > 0 ? 18 : 6);

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full h-24 flex items-end">
                      <div
                        className={cn(
                          'w-full rounded-t-xl transition-all',
                          item.value > 0
                            ? 'bg-orange-400 shadow-sm shadow-orange-100'
                            : 'bg-slate-100'
                        )}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <p className="text-[10px] font-black text-slate-400">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black text-slate-500">
                本月打卡次数趋势
              </p>
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp size={14} />
                <p className="text-xs font-black">持续上升</p>
              </div>
            </div>

            <div className="space-y-3">
              {monthlyTrend.map((item, index) => {
                const width = Math.max((item.count / maxMonthlyCount) * 100, 16);

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-black text-slate-400">
                        {item.label}
                      </p>
                      <p className="text-[10px] font-black text-slate-700">
                        {item.count} 次
                      </p>
                    </div>

                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* List / Calendar Content */}
        <div className="space-y-4 pb-20">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {view === 'calendar'
                ? timeRange === 'month'
                  ? '2026年4月打卡分布'
                  : '本周打卡分布'
                : timeRange === 'month'
                  ? '本月记录'
                  : '本周记录'}
            </h4>

            <span className="text-[10px] font-black text-slate-400">
              当前筛选：
              {activityFilter === 'all'
                ? '全部'
                : activityFilter === 'run'
                  ? '跑步'
                  : '场地'}
            </span>
          </div>

          {view === 'calendar' ? (
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                  <span
                    key={d}
                    className="text-[10px] font-black text-slate-300 uppercase"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const dayRecords = filteredItems.filter(
                    item => Number(item.date.split('-')[2]) === day
                  );
                  const hasHistory = dayRecords.length > 0;
                  const hasFail = dayRecords.some(item => item.status === 'fail');
                  const isThisWeek = day >= 22;
                  const dimDate = timeRange === 'week' && !isThisWeek;

                  return (
                    <div
                      key={i}
                      className={cn(
                        'aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all',
                        hasHistory && !hasFail
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100 scale-110'
                          : hasHistory && hasFail
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-100 scale-110'
                            : 'text-slate-400 hover:bg-slate-50',
                        dimDate && 'opacity-20'
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
                  <span className="text-[10px] font-black text-slate-400 uppercase">
                    已达标
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">
                    异常
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-100" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">
                    未运动
                  </span>
                </div>
              </div>
            </div>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <div
                key={`${item.date}-${item.time}-${i}`}
                onClick={() => navigate('/detail')}
                className="bg-white p-5 rounded-[2rem] border border-slate-50 shadow-sm active:bg-slate-50 transition-all flex items-center justify-between group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />

                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className={cn(
                      'w-13 h-13 rounded-2xl flex items-center justify-center shadow-sm',
                      item.category === 'run'
                        ? 'bg-orange-50 text-orange-500'
                        : 'bg-blue-50 text-blue-500'
                    )}
                  >
                    <span className="text-2xl">
                      {item.category === 'run' ? '🏃' : '📍'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-black text-slate-900 text-sm">
                        {item.type}
                      </p>
                      {item.status === 'fail' && (
                        <Badge
                          className="text-[8px] bg-rose-500 text-white border-none h-4 px-1.5 font-black uppercase tracking-tighter"
                          variant="outline"
                        >
                          异常
                        </Badge>
                      )}
                    </div>

                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {item.date} · {item.time}
                    </p>
                  </div>
                </div>

                <div className="text-right relative z-10">
                  <p className="font-black text-slate-900 text-lg italic tracking-tighter">
                    {item.val}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-black uppercase">
                    {item.duration}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-[2rem] p-8 text-center border border-slate-100">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-slate-400" />
              </div>
              <p className="font-black text-slate-800 mb-1">
                暂无记录
              </p>
              <p className="text-xs text-slate-400 font-bold">
                当前筛选条件下还没有运动记录
              </p>
            </div>
          )}
        </div>

        <button className="w-full py-4 text-xs font-bold text-slate-400">
          没有更多记录了
        </button>
      </div>
    </div>
  );
};

export default History;