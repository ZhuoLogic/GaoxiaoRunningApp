import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  MessageSquareWarning,
  LogOut,
  Layout,
  GraduationCap,
  User,
  School,
  Hash,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const profileInfo = [
    {
      icon: School,
      label: '学院',
      value: '计算机学院',
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      icon: GraduationCap,
      label: '年级',
      value: '大三',
      color: 'text-blue-500 bg-blue-50',
    },
    {
      icon: Hash,
      label: '学号',
      value: '2023010101',
      color: 'text-purple-500 bg-purple-50',
    },
  ];

  const menuItems = [
    {
      icon: MessageSquareWarning,
      label: '打卡申诉与反馈',
      desc: '异常记录申诉、问题反馈',
      path: '/feedback',
      color: 'text-orange-500 bg-orange-50',
    },
    {
      icon: Layout,
      label: '原型功能说明',
      desc: '查看当前原型功能范围',
      path: '/overview',
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      icon: ShieldCheck,
      label: '隐私与权限管理',
      desc: '定位、通知、数据权限说明',
      path: '#',
      color: 'text-blue-500 bg-blue-50',
    },
    {
      icon: HelpCircle,
      label: '常见问题手册',
      desc: '打卡规则与使用帮助',
      path: '#',
      color: 'text-purple-500 bg-purple-50',
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Compact Profile Header */}
      <div className="bg-white px-5 pt-12 pb-5 rounded-b-[2rem] shadow-sm border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-emerald-50 shadow-md">
              <AvatarImage src="https://modao.cc/agent-py/media/generated_images/2026-04-30/de22569297eb4427ae299996e70dc5f9.jpg#desc=High%20Quality%20Portrait%20of%20a%20Handsome%20Asian%20Male%20Student%20with%20Athletic%20Build" />
              <AvatarFallback className="font-black text-xl">张</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  张小明
                </h2>
                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] font-black">
                  校级运动员
                </Badge>
              </div>

              <p className="text-xs font-bold text-slate-400">
                计算机学院 · 大三
              </p>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                ID: 2023010101
              </p>
            </div>
          </div>

          <button className="w-10 h-10 bg-slate-50 rounded-2xl text-slate-400 border border-slate-100 shadow-sm flex items-center justify-center active:scale-95 transition-all">
            <Settings size={20} />
          </button>
        </div>

        {/* Compact Info Cards */}
        <div className="grid grid-cols-3 gap-3">
          {profileInfo.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-3 border border-slate-100"
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-xl flex items-center justify-center mb-2',
                    item.color
                  )}
                >
                  <Icon size={16} />
                </div>

                <p className="text-[9px] font-black text-slate-400 mb-0.5">
                  {item.label}
                </p>
                <p className="text-xs font-black text-slate-800 truncate">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto pb-20">
        {/* Account Summary */}
        <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm">
                账号信息
              </p>
              <p className="text-[10px] text-slate-400 font-bold">
                当前为静态原型展示，暂不支持资料编辑
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3">
              <p className="text-[9px] text-slate-400 font-black mb-1">
                账号状态
              </p>
              <p className="text-xs font-black text-emerald-600">
                正常
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3">
              <p className="text-[9px] text-slate-400 font-black mb-1">
                绑定身份
              </p>
              <p className="text-xs font-black text-slate-800">
                本科生
              </p>
            </div>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-[2rem] p-2 border border-slate-100 shadow-sm overflow-hidden">
          {menuItems.map((item, i) => {
            const Icon = item.icon;

            return (
              <button
                key={i}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className="w-full flex items-center justify-between px-3 py-3 hover:bg-slate-50 rounded-[1.5rem] transition-colors active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-2xl flex items-center justify-center shrink-0',
                      item.color
                    )}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <ChevronRight className="text-slate-200 shrink-0" size={18} />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full h-13 bg-rose-50 text-rose-500 rounded-[1.75rem] font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <LogOut size={18} />
          退出当前登录
        </button>
      </div>
    </div>
  );
};

export default Profile;
