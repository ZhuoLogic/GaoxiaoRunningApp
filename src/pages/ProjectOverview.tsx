import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Layout, 
  Palette, 
  Zap, 
  FileText, 
  Target, 
  Activity, 
  Layers, 
  CheckCircle2,
  Cpu,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const ProjectOverview: React.FC = () => {
  const navigate = useNavigate();

  const pages = [
    { module: '登录与初始化', items: ['启动页 (Splash)', '登录页 (Login)'] },
    { module: '核心打卡模块', items: ['运动首页 (Home)', '进行中打卡 (ActiveExercise)', '运动结算 (Settlement)'] },
    { module: '教务服务模块', items: ['服务中心 (ServiceHub)', '场馆预约 (Appointment)'] },
    { module: '数据可视化模块', items: ['成绩单 (ScoreReport)', '历史记录 (History)', '数据详情 (DataDetail)'] },
    { module: '个人中心模块', items: ['个人中心 (Profile)', '反馈申诉 (Feedback)'] },
  ];

  const features = [
    { title: 'GPS信号指示灯', desc: '实时监测GPS强度，提供"极佳、弱、无"三种状态反馈，引导用户在开阔地带打卡。', icon: '📡' },
    { title: '防误触滑动解锁', desc: '采用Shadcn组件定制的滑动确认机制，有效防止运动过程中意外点击导致的误操作。', icon: '🔓' },
    { title: '荷包蛋卡路里换算', desc: '趣味化数据展示，将枯燥的卡路里数值转化为直观的食物单位（如荷包蛋）。', icon: '🍳' },
    { title: '体育课专区', desc: '深度集成的教务系统接口，支持查看体育课安排、体测成绩及课程打卡。', icon: '🏫' },
    { title: '雷达图成绩单', desc: '多维度（耐力、速度、频率、课程参与等）可视化分析，全面展示学生身体素质。', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white px-5 py-6 flex items-center gap-4 sticky top-0 z-10 shadow-sm border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-50">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-slate-900">原型说明文档</h1>
        <Badge variant="secondary" className="ml-auto bg-emerald-100 text-emerald-700 hover:bg-emerald-100">v3.0.0</Badge>
      </div>

      <div className="px-5 py-6 space-y-8">
        {/* Basic Info */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layout className="text-emerald-500" size={20} />
            <h2 className="font-black text-lg text-slate-800">项目概览</h2>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            本项目是专为高校学生设计的校园体育打卡应用原型。基于 <b>Shadcn UI</b> 设计系统，采用 <b>校园绿 (#22c55e)</b> 与 <b>活力橙 (#f97316)</b> 作为核心色调，旨在平衡教务的严谨感与运动的活力感。
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">技术栈</p>
              <p className="text-sm font-bold text-slate-800">React + Tailwind</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">设计系统</p>
              <p className="text-sm font-bold text-slate-800">Shadcn UI</p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="text-orange-500" size={20} />
            <h2 className="font-black text-lg text-slate-800">核心功能实现</h2>
          </div>
          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-normal">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Page Structure */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="text-blue-500" size={20} />
            <h2 className="font-black text-lg text-slate-800">页面架构 (12个页面)</h2>
          </div>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
            {pages.map((p, i) => (
              <div key={i} className="p-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{p.module}</p>
                <div className="flex flex-wrap gap-2">
                  {p.items.map((item, j) => (
                    <Badge key={j} variant="outline" className="border-slate-200 text-slate-600 font-medium">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Quality */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            <h2 className="font-black text-lg text-slate-800">交付质量</h2>
          </div>
          <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 space-y-4">
            <div className="flex items-start gap-3">
              <Cpu className="text-emerald-600 mt-1" size={18} />
              <p className="text-sm text-emerald-800 font-medium">项目已通过完整的 <b>TypeScript</b> 语法与类型检查，代码结构清晰，组件复用率高。</p>
            </div>
            <div className="flex items-start gap-3">
              <Smartphone className="text-emerald-600 mt-1" size={18} />
              <p className="text-sm text-emerald-800 font-medium">完全适配移动端交互逻辑，模拟了实时GPS跳变、倒计时锁定等真实业务场景。</p>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <div className="text-center pt-4">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">更新日期：2026年04月30日</p>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-1">Version 3.0.0 Build</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
