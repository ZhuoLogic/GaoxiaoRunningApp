import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('申诉');

  if (submitted) {
    return (
      <div className="h-full bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-100">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">提交成功</h2>
        <p className="text-slate-400 text-sm font-medium leading-relaxed">
          工作人员将在 1-3 个工作日内处理您的申诉，处理结果将通过系统通知告知。
        </p>
        <Button 
          onClick={() => navigate('/profile')}
          className="mt-12 w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black"
        >
          返回个人中心
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="px-5 pt-12 pb-6 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-black text-slate-900">报错与反馈</h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-5 py-6 space-y-8 overflow-y-auto">
        {/* Type Selection */}
        <section className="space-y-4">
          <h3 className="font-bold text-slate-800">反馈类型</h3>
          <div className="flex flex-wrap gap-3">
            {['定位飘移', '数据丢失', '广告误触', '申诉', '建议'].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn(
                  "px-4 py-3 rounded-2xl font-bold text-sm border transition-all",
                  type === t ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100" : "bg-white text-slate-400 border-slate-100"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* Content Input */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900">问题详情描述</h3>
            <span className="text-[10px] font-black text-slate-300 uppercase">至少 10 个字符</span>
          </div>
          <div className="relative">
            <textarea 
              placeholder="请详细描述您遇到的问题，确保证明App具有完善的用户售后通道，我们会尽快为您解决..."
              className="w-full h-48 p-6 rounded-[2rem] bg-white border border-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-sm font-medium shadow-sm transition-all placeholder:text-slate-300"
            />
            <div className="absolute bottom-6 right-6 flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full">
              <span className="text-[10px] font-black text-slate-400">0 / 500</span>
            </div>
          </div>
        </section>

        {/* Image Upload Placeholder */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900">相关证明截图 (选填)</h3>
            <span className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-50 px-2 py-0.5 rounded">最多 4 张</span>
          </div>
          <div className="flex gap-4">
            <button className="w-28 h-28 bg-white border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 hover:text-emerald-500 hover:border-emerald-200 hover:bg-emerald-50 transition-all group shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-white transition-colors">
                <Camera size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter">上传照片</span>
            </button>
            <div className="w-28 h-28 rounded-[2rem] overflow-hidden border-2 border-slate-50 shadow-sm relative group">
               <img src="https://modao.cc/agent-py/media/generated_images/2026-04-30/7b39e9dd189a4e9ea966482624481ae0.jpg#desc=Smartphone%20Screenshot%20of%20Exercise%20Error%20Message" alt="Feedback Screenshot" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white">×</div>
               </div>
            </div>
          </div>
        </section>
        {/* Contact Info */}
        <section className="space-y-4 pb-12">
          <h3 className="font-black text-slate-900">联系方式</h3>
          <div className="relative">
            <Input 
              placeholder="您的手机号或常用邮箱 (方便核实处理结果)" 
              className="h-16 bg-white border-slate-100 px-6 rounded-[1.5rem] focus-visible:ring-emerald-500 text-sm font-bold shadow-sm placeholder:font-medium placeholder:text-slate-300"
            />
          </div>
          <p className="text-[10px] text-slate-400 font-medium px-2 leading-relaxed italic">
            * 个人隐私信息将严格保密，仅用于本次问题核实。
          </p>
        </section>
      </div>

      <div className="p-6 border-t border-slate-50 bg-white">
        <Button 
          onClick={() => setSubmitted(true)}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/20 flex gap-2"
        >
          <Send size={18} /> 提交反馈
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
