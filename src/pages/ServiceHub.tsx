import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck,
  Search,
  Trophy,
  MapPin,
  Bell,
  ChevronRight,
  Building2,
  ClipboardCheck,
  HeartPulse,
  Megaphone,
  Sparkles,
  UserRound,
  Navigation,
  X,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Star,
  ThumbsUp,
  Backpack,
  ClipboardList,
  UserCheck,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import ExerciseRouteMap, { LatLngPoint } from '../components/ExerciseRouteMap';

type ModalType = 'notice' | 'map' | 'teacher' | 'reviews' | null;

const CLASS_ROUTE: LatLngPoint[] = [
  { lat: 31.22967, lng: 121.40385 },
  { lat: 31.22982, lng: 121.40412 },
  { lat: 31.23002, lng: 121.40443 },
  { lat: 31.23022, lng: 121.40476 },
  { lat: 31.23012, lng: 121.40508 },
  { lat: 31.22985, lng: 121.40532 },
];

const ServiceHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = React.useState<ModalType>(null);

  const quickServices = [
    {
      icon: CalendarCheck,
      label: '体测预约',
      color: 'bg-emerald-100 text-emerald-600',
      path: '/appointment',
    },
    {
      icon: Search,
      label: '成绩查询',
      color: 'bg-blue-100 text-blue-600',
      path: '/report',
    },
    {
      icon: Trophy,
      label: '校运会',
      color: 'bg-orange-100 text-orange-600',
      path: '#',
    },
    {
      icon: Bell,
      label: '课程通知',
      color: 'bg-rose-100 text-rose-600',
      action: () => setActiveModal('notice'),
    },
  ];

  const lowFrequencyServices = [
    {
      icon: ClipboardCheck,
      label: '免修申请',
      desc: '体质健康测试免测申请',
      color: 'bg-slate-100 text-slate-500',
    },
    {
      icon: HeartPulse,
      label: '运动康复',
      desc: '运动损伤咨询与恢复建议',
      color: 'bg-slate-100 text-slate-500',
    },
    {
      icon: Megaphone,
      label: '失物招领',
      desc: '体育场馆物品拾取公示',
      color: 'bg-slate-100 text-slate-500',
    },
  ];

  const handleQuickServiceClick = (service: typeof quickServices[number]) => {
    if ('action' in service && service.action) {
      service.action();
      return;
    }

    if ('path' in service && service.path && service.path !== '#') {
      navigate(service.path);
    }
  };

  return (
    <div className="px-5 pt-5 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
            Campus Sports
          </p>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            服务大厅
          </h2>
        </div>

        <button
          onClick={() => setActiveModal('notice')}
          className="relative w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-50 text-slate-400 flex items-center justify-center active:scale-95 transition-all"
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </button>
      </div>

      {/* High Priority: Venue Booking */}
      <button
        onClick={() => navigate('/venue-reservation')}
        className="w-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-[2rem] p-5 shadow-xl shadow-purple-100 active:scale-[0.98] transition-all relative overflow-hidden text-left"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/15 rounded-full blur-xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 translate-y-8" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-sm">
              <Building2 size={28} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-black text-xl">场馆预约</h3>
                <Badge className="bg-white/20 text-white border-white/20 text-[9px] h-5 px-2">
                  高频必要
                </Badge>
              </div>
              <p className="text-xs text-purple-100 font-bold">
                羽毛球馆 / 网球场 / 篮球场在线预约
              </p>
            </div>
          </div>

          <ChevronRight size={22} className="text-white/80 shrink-0" />
        </div>
      </button>

      {/* Quick Access */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-500" />
            便捷入口
          </h3>
          <p className="text-[10px] text-slate-400 font-bold">
            常用功能优先展示
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {quickServices.map((s, i) => {
            const Icon = s.icon;

            return (
              <button
                key={i}
                onClick={() => handleQuickServiceClick(s)}
                className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow',
                    s.color
                  )}
                >
                  <Icon size={22} />
                </div>
                <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* PE Class Zone */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-emerald-500 rounded-full" />
            体育课专区
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] font-black text-emerald-600 border-emerald-100 bg-emerald-50 px-2.5 py-0.5 uppercase"
          >
            Spring 2026
          </Badge>
        </div>

        <Card className="border-none shadow-md shadow-slate-200/50 bg-white rounded-[2rem] overflow-hidden">
          <CardContent className="p-0">
            <div className="p-5 bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-14 -mt-14 blur-2xl" />

              <div className="relative z-10 flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-100 mb-1 opacity-80">
                    当前绑定课程
                  </p>
                  <h4 className="text-lg font-black truncate">
                    大学体育 (IV) · 网球基础
                  </h4>
                </div>

                <div className="bg-white/20 backdrop-blur-xl px-3 py-1.5 rounded-xl text-[10px] font-black shrink-0">
                  周三 1-2 节
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveModal('map')}
                  className="bg-slate-50 px-4 py-3 rounded-2xl text-left active:scale-[0.98] transition-all border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                      <Navigation size={18} className="text-emerald-500" />
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>

                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    上课地点
                  </p>
                  <p className="text-xs font-black text-slate-900 leading-tight">
                    东校区网球场 A2
                  </p>
                  <p className="text-[9px] text-emerald-500 font-bold mt-1">
                    点击查看地图
                  </p>
                </button>

                <button
                  onClick={() => setActiveModal('teacher')}
                  className="bg-slate-50 px-4 py-3 rounded-2xl text-left active:scale-[0.98] transition-all border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                      <UserRound size={18} className="text-blue-500" />
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>

                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    授课教师
                  </p>
                  <p className="text-xs font-black text-slate-900 leading-tight">
                    李教授
                  </p>
                  <p className="text-[9px] text-blue-500 font-bold mt-1">
                    查看简介
                  </p>
                </button>
              </div>

              <button
                onClick={() => setActiveModal('notice')}
                className="w-full flex items-center justify-between gap-3 text-xs font-black text-emerald-600 bg-emerald-50 px-4 py-3 rounded-2xl hover:bg-emerald-100 transition-colors active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <Bell size={15} />
                  <span>查看课程通知</span>
                  <span className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black border-2 border-white">
                    2
                  </span>
                </div>

                <ChevronRight size={16} className="text-emerald-500" />
              </button>

              <button
                onClick={() => setActiveModal('reviews')}
                className="w-full flex items-center justify-between gap-3 text-xs font-black text-orange-600 bg-orange-50 px-4 py-3 rounded-2xl hover:bg-orange-100 transition-colors active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={15} />
                  <span>查看学长学姐课程评价</span>
                  <span className="bg-orange-100 text-orange-600 border border-orange-200 rounded-full px-2 py-0.5 text-[9px] font-black">
                    38 条
                  </span>
                </div>

                <ChevronRight size={16} className="text-orange-500" />
              </button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* More Services - lower priority */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">
            更多服务
          </h3>
          <span className="text-[10px] text-slate-400 font-bold">
            低频功能
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {lowFrequencyServices.map((item, i) => {
            const Icon = item.icon;

            return (
              <button
                key={i}
                className="bg-white rounded-2xl border border-slate-50 shadow-sm p-3 active:bg-slate-50 transition-colors text-center"
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2',
                    item.color
                  )}
                >
                  <Icon size={18} />
                </div>

                <p className="font-black text-slate-700 text-xs mb-1">
                  {item.label}
                </p>
                <p className="text-[9px] text-slate-400 font-medium leading-tight line-clamp-2">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', damping: 20, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <h3 className="font-black text-slate-900">
                  {activeModal === 'notice' && '课程通知'}
                  {activeModal === 'map' && '上课地点导航'}
                  {activeModal === 'teacher' && '教师简介'}
                  {activeModal === 'reviews' && '课程评价'}
                </h3>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 active:scale-95"
                >
                  <X size={18} />
                </button>
              </div>

              {activeModal === 'notice' && (
                <div className="p-5 space-y-3">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle size={16} className="text-emerald-600" />
                      <p className="text-sm font-black text-emerald-700">
                        本周课程场地调整
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      因东校区网球场 A2 临时维护，本周三 1-2 节课程调整至东校区网球场 A4，请同学们提前 10 分钟到达。
                    </p>
                    <p className="text-[10px] text-slate-400 mt-3 font-bold">
                      2026.04.30 08:30
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-blue-500" />
                      <p className="text-sm font-black text-slate-800">
                        体能测试提醒
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      下周课程将进行基础体能测试，请穿着运动鞋并携带校园卡。
                    </p>
                    <p className="text-[10px] text-slate-400 mt-3 font-bold">
                      2026.04.28 17:20
                    </p>
                  </div>
                </div>
              )}

              {activeModal === 'map' && (
                <div className="p-5 space-y-4">
                  <div className="h-64 rounded-[1.5rem] overflow-hidden bg-slate-100 border border-slate-100">
                    <ExerciseRouteMap route={CLASS_ROUTE} isFinished />
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black mb-1">
                      上课地点
                    </p>
                    <p className="text-sm font-black text-slate-900">
                      东校区网球场 A2
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      建议从体育馆东门进入，沿主路步行约 5 分钟到达网球场区域。
                    </p>
                  </div>

                  <button className="w-full h-12 rounded-2xl bg-emerald-500 text-white font-black active:scale-95 transition-all">
                    开始模拟导航
                  </button>
                </div>
              )}

              {activeModal === 'teacher' && (
                <div className="p-5">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center">
                      <UserRound size={32} />
                    </div>
                    <div>
                      <p className="text-xl font-black text-slate-900">
                        李教授
                      </p>
                      <p className="text-xs text-slate-400 font-bold">
                        公共体育教学部 · 网球课程教师
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-black mb-1">
                        教学方向
                      </p>
                      <p className="text-sm text-slate-700 font-bold leading-relaxed">
                        网球基础教学、学生体能训练、运动损伤预防与恢复。
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <Phone size={16} className="text-emerald-500 mb-2" />
                        <p className="text-[10px] text-slate-400 font-black">
                          办公电话
                        </p>
                        <p className="text-xs font-black text-slate-800 mt-1">
                          021-88886666
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <Mail size={16} className="text-blue-500 mb-2" />
                        <p className="text-[10px] text-slate-400 font-black">
                          邮箱
                        </p>
                        <p className="text-xs font-black text-slate-800 mt-1">
                          tennis@school.edu
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'reviews' && (
                <div className="p-5 space-y-4 max-h-[72vh] overflow-y-auto">
                  {/* Rating Summary */}
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-[1.5rem] p-5 text-white relative overflow-hidden">
                    <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/20 rounded-full blur-xl" />

                    <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-100 mb-1">
                        Course Reviews
                      </p>

                      <div className="flex items-end gap-2 mb-3">
                        <p className="text-4xl font-black leading-none">4.7</p>

                        <div className="pb-1">
                          <div className="flex gap-0.5 mb-1">
                            {[1, 2, 3, 4, 5].map(i => (
                              <Star
                                key={i}
                                size={14}
                                className="fill-white text-white"
                              />
                            ))}
                          </div>
                          <p className="text-xs text-orange-100 font-bold">
                            38 条学长学姐评价
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/15 rounded-2xl p-3 text-center">
                          <p className="text-[9px] text-orange-100 font-bold mb-1">
                            难度
                          </p>
                          <p className="text-sm font-black">适中</p>
                        </div>

                        <div className="bg-white/15 rounded-2xl p-3 text-center">
                          <p className="text-[9px] text-orange-100 font-bold mb-1">
                            给分
                          </p>
                          <p className="text-sm font-black">友好</p>
                        </div>

                        <div className="bg-white/15 rounded-2xl p-3 text-center">
                          <p className="text-[9px] text-orange-100 font-bold mb-1">
                            出勤
                          </p>
                          <p className="text-sm font-black">较严</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                      <UserCheck size={18} className="text-blue-500 mb-2" />
                      <p className="text-[10px] text-slate-400 font-black mb-1">
                        老师风格
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        认真负责，讲解清楚
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                      <Backpack size={18} className="text-emerald-500 mb-2" />
                      <p className="text-[10px] text-slate-400 font-black mb-1">
                        需带物品
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        球拍、水、运动鞋
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                      <ClipboardList size={18} className="text-purple-500 mb-2" />
                      <p className="text-[10px] text-slate-400 font-black mb-1">
                        考核方式
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        技术动作 + 出勤
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                      <ThumbsUp size={18} className="text-orange-500 mb-2" />
                      <p className="text-[10px] text-slate-400 font-black mb-1">
                        推荐指数
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        适合新手选
                      </p>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">
                        学长学姐留言
                      </h4>
                      <button className="text-xs font-black text-orange-500">
                        写评价
                      </button>
                    </div>

                    {[
                      {
                        name: '2024级 · 匿名同学',
                        rating: 5,
                        tag: '推荐新手',
                        content:
                          '李老师人很好，前几节课会从握拍、站位这些基础开始讲，不会一上来就要求对打。没基础也能跟上，但出勤会认真点名。',
                        tips: '建议带自己的球拍，学校球拍数量不一定够。',
                      },
                      {
                        name: '2023级 · 学长',
                        rating: 4,
                        tag: '考核友好',
                        content:
                          '课程内容主要是正手、反手、发球和简单对打。期末考核不算难，重点看动作规范和出勤，平时认真练基本没问题。',
                        tips: '夏天上课一定要带水，网球场比较晒。',
                      },
                      {
                        name: '2022级 · 学姐',
                        rating: 5,
                        tag: '老师负责',
                        content:
                          '老师会逐个纠正动作，比较适合想认真学一点网球的同学。课堂氛围不错，但迟到会被记录。',
                        tips: '最好穿防滑运动鞋，不建议穿板鞋。',
                      },
                    ].map((review, index) => (
                      <div
                        key={index}
                        className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-black text-slate-800">
                              {review.name}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map(i => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={
                                    i <= review.rating
                                      ? 'fill-orange-400 text-orange-400'
                                      : 'text-slate-200'
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          <Badge className="bg-orange-50 text-orange-600 border-orange-100 text-[9px]">
                            {review.tag}
                          </Badge>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {review.content}
                        </p>

                        <div className="bg-slate-50 rounded-xl p-3">
                          <p className="text-[10px] text-slate-400 font-black mb-1">
                            上课小提示
                          </p>
                          <p className="text-xs text-slate-600 font-bold leading-relaxed">
                            {review.tips}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceHub;