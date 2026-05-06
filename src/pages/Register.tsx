import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ChevronLeft, School, User, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [regType, setRegType] = useState<'phone' | 'wechat' | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    setStep(3);
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-black text-slate-900">新用户注册</h2>
      </div>

      <div className="flex-1 px-8 pt-4">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">选择注册方式</h3>
              <p className="text-slate-400 text-sm font-medium">请选择您偏好的身份验证方式</p>
            </div>

            <div className="grid gap-4">
              <button 
                onClick={() => { setRegType('phone'); setStep(2); }}
                className="flex items-center gap-4 p-6 rounded-[2rem] border-2 border-slate-50 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm">
                  <Phone size={24} />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-900">手机号注册</p>
                  <p className="text-xs text-slate-400 font-medium">使用大陆手机号接收验证码</p>
                </div>
              </button>

              <button 
                onClick={() => { setRegType('wechat'); setStep(2); }}
                className="flex items-center gap-4 p-6 rounded-[2rem] border-2 border-slate-50 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm">
                  <MessageSquare size={24} />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-900">微信一键注册</p>
                  <p className="text-xs text-slate-400 font-medium">快捷同步微信身份信息</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">完善信息</h3>
              <p className="text-slate-400 text-sm font-medium">绑定您的校园身份信息</p>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                  <School size={20} />
                </div>
                <Input 
                  placeholder="选择/输入学校名称" 
                  className="h-16 bg-slate-50 border-none pl-14 pr-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                  <User size={20} />
                </div>
                <Input 
                  placeholder="您的学号/工号" 
                  className="h-16 bg-slate-50 border-none pl-14 pr-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300"
                  required
                />
              </div>

              {regType === 'phone' && (
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                    <Phone size={20} />
                  </div>
                  <Input 
                    placeholder="手机号码" 
                    className="h-16 bg-slate-50 border-none pl-14 pr-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300"
                    required
                  />
                </div>
              )}
            </div>

            <Button 
              type="submit"
              className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] text-lg font-black shadow-xl shadow-emerald-500/30 transition-all active:scale-95 mt-8"
            >
              提交注册
            </Button>
          </form>
        )}

        {step === 3 && (
          <div className="h-full flex flex-col items-center justify-center -mt-20 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">注册成功</h3>
            <p className="text-slate-400 text-sm font-medium">正在为您跳转至首页...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
