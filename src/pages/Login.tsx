import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { MessageSquare, Phone, ArrowLeft } from 'lucide-react';

type ViewMode = 'login_pwd' | 'login_phone' | 'register';
type RegMethod = 'phone' | 'wechat';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('login_pwd');
  const [regMethod, setRegMethod] = useState<RegMethod>('phone');
  const [showSplash, setShowSplash] = useState(false);

  // 处理登录/注册成功后的跳转（包含开屏页逻辑）
  const handleSuccess = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!agreed) {
      alert("请先仔细阅读并同意《用户使用协议》及相关规定");
      return;
    }
    // 触发开屏页展示
    setShowSplash(true);
  };

  // 模拟开屏页倒计时后跳转首页
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000); // 开屏页展示 2 秒后进入首页
      return () => clearTimeout(timer);
    }
  }, [showSplash, navigate]);

  // --- 1. 开屏页视图 ---
  if (showSplash) {
    return (
      <div className="min-h-screen bg-emerald-500 flex flex-col items-center justify-center text-white">
        <div className="animate-pulse text-center">
          <div className="w-24 h-24 bg-white/20 rounded-3xl mx-auto mb-6 flex items-center justify-center backdrop-blur-sm">
            <span className="text-4xl font-black">校</span>
          </div>
          <h1 className="text-3xl font-black tracking-widest mb-2">健康校园</h1>
          <p className="text-emerald-100 font-medium">正在开启您的专属运动生活...</p>
        </div>
      </div>
    );
  }

  // --- 协议复选框组件（复用） ---
  const AgreementCheckbox = () => (
    <div className="flex items-start gap-3 py-2">
      <div className="relative flex items-center mt-0.5">
        <input 
          type="checkbox" 
          id="agree" 
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="peer appearance-none w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer"
        />
        <div className="absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none left-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      </div>
      <label htmlFor="agree" className="text-xs text-slate-400 leading-normal cursor-pointer font-medium select-none">
        我已详细阅读并同意 <span className="text-emerald-600 font-bold underline underline-offset-4">《用户使用协议》</span>、<span className="text-emerald-600 font-bold underline underline-offset-4">《隐私保护政策》</span> 及校园体育相关管理规定
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-white px-8 pt-16 flex flex-col pb-10">
      
      {/* 顶部导航与返回按钮 */}
      <div className="h-10 mb-6 flex items-center justify-between">
        {viewMode !== 'login_pwd' ? (
          <button onClick={() => setViewMode('login_pwd')} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={24} />
          </button>
        ) : <div /> /* 占位 */}
        
        {viewMode === 'login_pwd' && (
          <button onClick={() => setViewMode('register')} className="text-emerald-600 font-bold text-sm">
            新用户注册
          </button>
        )}
      </div>

      {/* --- 2. 密码登录视图 (默认) --- */}
      {viewMode === 'login_pwd' && (
        <div className="flex-1 flex flex-col">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900">立即登录</h2>
            <p className="text-slate-400 mt-3 font-medium text-sm leading-relaxed">请使用学号/工号进行身份验证<br/>开启您的健康校园生活</p>
          </div>

          <form onSubmit={handleSuccess} className="space-y-6">
            <div className="space-y-4">
              <Input placeholder="学号 / 工号" className="h-16 bg-slate-50 border-slate-100 px-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300" required />
              <Input type="password" placeholder="登录密码" className="h-16 bg-slate-50 border-slate-100 px-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300" required />
            </div>
            <AgreementCheckbox />
            <Button type="submit" className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] text-lg font-black shadow-xl shadow-emerald-500/30 transition-all active:scale-95">
              安全登录
            </Button>
          </form>

          <div className="mt-auto pt-16 text-center">
            <div className="relative mb-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-slate-300 font-bold">其他登录方式</span></div>
            </div>
            <div className="flex justify-center gap-12">
              <button type="button" onClick={() => handleSuccess()} className="flex flex-col items-center gap-3 group">
                <div className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-600 transition-all shadow-sm">
                  <MessageSquare size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">微信一键登录</span>
              </button>
              <button type="button" onClick={() => setViewMode('login_phone')} className="flex flex-col items-center gap-3 group">
                <div className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all shadow-sm">
                  <Phone size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">手机号登录</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. 手机号登录视图 --- */}
      {viewMode === 'login_phone' && (
        <div className="flex-1 flex flex-col">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900">手机号登录</h2>
            <p className="text-slate-400 mt-3 font-medium text-sm leading-relaxed">未注册的手机号验证后将自动创建账号</p>
          </div>

          <form onSubmit={handleSuccess} className="space-y-6">
            <div className="space-y-4">
              <Input type="tel" placeholder="请输入手机号" className="h-16 bg-slate-50 border-slate-100 px-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300" required />
              <div className="flex gap-3">
                <Input placeholder="验证码" className="flex-1 h-16 bg-slate-50 border-slate-100 px-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300" required />
                <Button type="button" className="w-32 h-16 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-2xl font-bold">
                  获取验证码
                </Button>
              </div>
            </div>
            <AgreementCheckbox />
            <Button type="submit" className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] text-lg font-black shadow-xl shadow-emerald-500/30 transition-all active:scale-95">
              验证并登录
            </Button>
          </form>
        </div>
      )}

      {/* --- 4. 新用户注册视图 --- */}
      {viewMode === 'register' && (
        <div className="flex-1 flex flex-col">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-slate-900">新用户注册</h2>
            <p className="text-slate-400 mt-3 font-medium text-sm leading-relaxed">完善您的学籍信息以开启服务</p>
          </div>

          <form onSubmit={handleSuccess} className="space-y-6">
            <div className="space-y-4">
              {/* 学籍信息 */}
              <Input placeholder="输入学校全称" className="h-16 bg-slate-50 border-slate-100 px-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300" required />
              <Input placeholder="学号 / 工号" className="h-16 bg-slate-50 border-slate-100 px-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300" required />
              
              {/* 注册方式切换 */}
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-400 mb-3 px-2">选择绑定方式</p>
                <div className="flex p-1 bg-slate-50 rounded-2xl">
                  <button type="button" onClick={() => setRegMethod('phone')} className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${regMethod === 'phone' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}>
                    手机号注册
                  </button>
                  <button type="button" onClick={() => setRegMethod('wechat')} className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${regMethod === 'wechat' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}>
                    微信快捷注册
                  </button>
                </div>
              </div>

              {/* 动态输入区域 */}
              {regMethod === 'phone' ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <Input type="tel" placeholder="请输入手机号" className="h-16 bg-slate-50 border-slate-100 px-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300" required />
                  <div className="flex gap-3">
                    <Input placeholder="验证码" className="flex-1 h-16 bg-slate-50 border-slate-100 px-6 rounded-2xl focus-visible:ring-emerald-500 text-lg font-bold placeholder:font-medium placeholder:text-slate-300" required />
                    <Button type="button" className="w-32 h-16 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-2xl font-bold">获取验证码</Button>
                  </div>
                </div>
              ) : (
                <div className="h-24 border-2 border-dashed border-emerald-100 bg-emerald-50/50 rounded-2xl flex items-center justify-center animate-in fade-in slide-in-from-bottom-2">
                  <Button type="button" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl gap-2 font-bold px-6">
                    <MessageSquare size={18} />
                    点击获取微信授权
                  </Button>
                </div>
              )}
            </div>

            <AgreementCheckbox />
            
            <Button type="submit" className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] text-lg font-black shadow-xl shadow-emerald-500/30 transition-all active:scale-95">
              注册并登录
            </Button>
          </form>
        </div>
      )}

    </div>
  );
};

export default Login;