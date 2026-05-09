import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Map, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [gpsStatus, setGpsStatus] = React.useState<'strong' | 'weak' | 'none'>('strong');

  React.useEffect(() => {
    const statuses: ('strong' | 'weak' | 'none')[] = ['strong', 'strong', 'weak'];
    const interval = setInterval(() => {
      setGpsStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-5 pt-5 pb-3 space-y-4">
      {/* Header with GPS Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-md">
            <img
              src="https://modao.cc/agent-py/media/generated_images/2026-04-30/caa65cecc84648449b968b4de14f9843.jpg#desc=Close-up%20Portrait%20of%20a%20Cheerful%20Asian%20Male%20Student%20in%20Sports%20Gear"
              alt="Student Portrait"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              早上好
            </p>
            <p className="font-black text-slate-900 text-base leading-tight">
              张小明
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white pl-2.5 pr-3 py-1.5 rounded-2xl shadow-sm border border-slate-50 max-w-[160px]">
          <div className="flex gap-0.5 items-end h-3 shrink-0">
            <div
              className={cn(
                'w-1 rounded-sm transition-colors h-1.5',
                gpsStatus === 'none' ? 'bg-slate-200' : 'bg-emerald-500'
              )}
            />
            <div
              className={cn(
                'w-1 rounded-sm transition-colors h-2.5',
                gpsStatus === 'none' || gpsStatus === 'weak'
                  ? gpsStatus === 'none'
                    ? 'bg-slate-200'
                    : 'bg-orange-400'
                  : 'bg-emerald-500'
              )}
            />
            <div
              className={cn(
                'w-1 rounded-sm transition-colors h-3.5',
                gpsStatus === 'strong' ? 'bg-emerald-500' : 'bg-slate-200'
              )}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[8px] font-black text-slate-400 uppercase leading-none mb-0.5">
              GPS 信号
            </span>
            <span
              className={cn(
                'text-[9px] font-black leading-tight truncate',
                gpsStatus === 'strong'
                  ? 'text-emerald-500'
                  : gpsStatus === 'weak'
                    ? 'text-orange-400'
                    : 'text-rose-500'
              )}
            >
              {gpsStatus === 'strong'
                ? '定位良好'
                : gpsStatus === 'weak'
                  ? '信号较弱'
                  : '无信号'}
            </span>
          </div>
        </div>
      </div>

      {/* Goal Progress Card */}
      <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-none shadow-lg shadow-emerald-100">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-emerald-100 text-xs font-medium mb-0.5">
                本学期打卡目标
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black leading-none">12</span>
                <span className="text-emerald-100 text-xs">/ 30 次</span>
              </div>
            </div>

            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="transparent"
                  stroke="white"
                  strokeWidth="5"
                  strokeDasharray={126}
                  strokeDashoffset={126 * (1 - 12 / 30)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[9px] font-bold">40%</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 flex justify-around text-center">
            <div>
              <p className="text-[10px] text-emerald-100 mb-0.5">累积里程</p>
              <p className="font-bold text-xs">52.4 km</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-[10px] text-emerald-100 mb-0.5">活跃天数</p>
              <p className="font-bold text-xs">15 天</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/active-exercise')}
          className="flex flex-col items-center justify-center gap-2.5 bg-white p-4 rounded-[1.75rem] shadow-sm border border-slate-50 group active:scale-95 transition-all relative overflow-hidden h-32"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500 opacity-50" />
          <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-orange-100 group-hover:rotate-12 transition-transform relative z-10">
            <span className="text-2xl">🏃</span>
          </div>
          <div className="text-center relative z-10">
            <p className="font-black text-slate-900 text-sm whitespace-nowrap">
              跑步打卡
            </p>
            <p className="text-[9px] font-bold text-slate-300 mt-0.5 uppercase tracking-widest">
              计分项目
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate('/venue-checkin')}
          className="flex flex-col items-center justify-center gap-2.5 bg-white p-4 rounded-[1.75rem] shadow-sm border border-slate-50 group active:scale-95 transition-all relative overflow-hidden h-32"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500 opacity-50" />
          <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-blue-100 group-hover:-rotate-12 transition-transform relative z-10">
            <span className="text-2xl">📍</span>
          </div>
          <div className="text-center relative z-10">
            <p className="font-black text-slate-900 text-sm whitespace-nowrap">
              场地打卡
            </p>
            <p className="text-[9px] font-bold text-slate-300 mt-0.5 uppercase tracking-widest">
              场馆签到
            </p>
          </div>
        </button>
      </div>

      {/* Recent Activity Mini List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">近期运动</h3>
          <button
            onClick={() => navigate('/history')}
            className="text-xs text-emerald-600 font-medium flex items-center gap-0.5"
          >
            全部记录 <ChevronRight size={13} />
          </button>
        </div>

        {[
          { type: '跑步', date: '04-28 17:30', val: '3.2km', status: '成功' },
          { type: '羽毛球馆', date: '04-25 19:00', val: '60min', status: '成功' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white px-3.5 py-3 rounded-2xl border border-slate-50 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center',
                  item.type === '跑步'
                    ? 'bg-orange-50 text-orange-500'
                    : 'bg-blue-50 text-blue-500'
                )}
              >
                {item.type === '跑步' ? <Map size={16} /> : <MapPin size={16} />}
              </div>

              <div>
                <p className="font-bold text-slate-800 text-sm leading-tight">
                  {item.type}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {item.date}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-black text-slate-900 text-sm leading-tight">
                {item.val}
              </p>
              <Badge
                variant="outline"
                className="text-[9px] py-0 h-4 border-emerald-100 text-emerald-600 bg-emerald-50"
              >
                已结算
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;