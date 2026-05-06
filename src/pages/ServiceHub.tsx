import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarCheck, 
  Search, 
  Trophy, 
  MapPin, 
  BookOpen, 
  Bell, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

const ServiceHub: React.FC = () => {
  const navigate = useNavigate();

  const mainServices = [
    { icon: CalendarCheck, label: '体测预约', color: 'bg-emerald-100 text-emerald-600', path: '/appointment' },
    { icon: Search, label: '成绩查询', color: 'bg-blue-100 text-blue-600', path: '/report' },
    { icon: Trophy, label: '校运会', color: 'bg-orange-100 text-orange-600', path: '#' },
    { icon: MapPin, label: '场馆预约', color: 'bg-purple-100 text-purple-600', path: '#' },
  ];

  return (
    <div className="px-5 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">服务大厅</h2>
        <button className="relative p-2 text-slate-400">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-50" />
        </button>
      </div>

      {/* Grid Navigation */}
      <div className="grid grid-cols-4 gap-4">
        {mainServices.map((s, i) => (
          <button 
            key={i} 
            onClick={() => s.path !== '#' && navigate(s.path)}
            className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow", s.color)}>
              <s.icon size={24} />
            </div>
            <span className="text-xs font-bold text-slate-600">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Physical Education Class Zone */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            体育课专区
          </h3>
          <Badge variant="outline" className="text-[10px] font-black text-emerald-600 border-emerald-100 bg-emerald-50 px-3 py-1 uppercase">Spring 2026</Badge>
        </div>
        
        <Card className="border-none shadow-xl shadow-slate-200/40 bg-white rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-0">
            <div className="p-7 bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-1.5 opacity-80">当前绑定课程</p>
                  <h4 className="text-2xl font-black">大学体育 (IV) - 网球基础</h4>
                </div>
                <div className="bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-sm">
                  周三 1-2 节
                </div>
              </div>
            </div>
            <div className="p-7 space-y-6">
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                    <MapPin size={22} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">上课地点</p>
                    <p className="text-sm font-black text-slate-900">东校区网球场 A2</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200 mx-2" />
                <div className="flex flex-col items-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">授课教师</p>
                  <p className="text-sm font-black text-slate-900">李教授</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                  <div className="w-9 h-9 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 overflow-hidden">
                    <img src="https://modao.cc/agent-py/media/generated_images/2026-04-30/6a4eb1a54b374340ba9153550d0f67b0.jpg#desc=Portrait%20of%20a%20Male%20Student" alt="Student 1" />
                  </div>
                  <div className="w-9 h-9 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 overflow-hidden">
                    <img src="https://modao.cc/agent-py/media/generated_images/2026-04-30/d57be4524beb4d8f94d9926aa3e96d5a.jpg#desc=Portrait%20of%20a%20Female%20Student" alt="Student 2" />
                  </div>
                  <div className="w-9 h-9 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 overflow-hidden">
                    <img src="https://modao.cc/agent-py/media/generated_images/2026-04-30/32be19b001854d028276c6562d03eba2.jpg#desc=Portrait%20of%20a%20Smiling%20Student" alt="Student 3" />
                  </div>
                  <div className="w-9 h-9 rounded-full border-4 border-white bg-emerald-50 flex items-center justify-center text-[10px] font-black text-emerald-600">
                    +42
                  </div>
                </div>
                <button className="flex items-center gap-2 text-xs font-black text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-2xl hover:bg-emerald-100 transition-colors">
                  <Bell size={14} />
                  课程通知
                  <span className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black border-2 border-white">2</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Access List */}
      <section className="space-y-3">
        <h3 className="font-bold text-slate-800">便捷入口</h3>
        {[
          { icon: '🏃', label: '免修申请', desc: '体质健康测试免测申请' },
          { icon: '🏥', label: '运动康复', desc: '校医院运动损伤在线咨询' },
          { icon: '📣', label: '失物招领', desc: '体育场馆物品拾取公示' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-50 shadow-sm active:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-bold text-slate-800 text-sm">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="text-slate-200" size={18} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ServiceHub;
