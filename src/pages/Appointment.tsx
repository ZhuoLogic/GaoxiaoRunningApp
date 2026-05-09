import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Info,
  Check,
  ChevronRight,
  Ruler,
  Wind,
  Zap,
  Dumbbell,
  Timer,
  Scale,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

const Appointment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(12);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(0);

  const dates = [
    { day: '一', date: 11 },
    { day: '二', date: 12 },
    { day: '三', date: 13 },
    { day: '四', date: 14 },
    { day: '五', date: 15 },
    { day: '六', date: 16 },
  ];

  const slots = [
    { time: '08:30 - 10:00', remain: 5 },
    { time: '10:15 - 11:45', remain: 0 },
    { time: '13:30 - 15:00', remain: 12 },
    { time: '15:15 - 16:45', remain: 8 },
    { time: '18:30 - 20:00', remain: 20 },
  ];

  const testProjects = [
    {
      title: '身体形态',
      icon: Scale,
      color: 'bg-emerald-100 text-emerald-600',
      desc: '身高 / 体重 / BMI',
      detail:
        '现场测量身高和体重，系统自动计算 BMI。测试时请脱帽、脱厚外套，保持自然站立，避免影响测量结果。',
      standards: [
        {
          label: '女生 BMI 正常范围',
          value: '17.2 - 23.9 kg/m²',
        },
        {
          label: '男生 BMI 正常范围',
          value: '17.9 - 23.9 kg/m²',
        },
        {
          label: '注意事项',
          value: '低体重、超重、肥胖均会影响身体形态项目得分。',
        },
      ],
    },
    {
      title: '肺活量',
      icon: Wind,
      color: 'bg-blue-100 text-blue-600',
      desc: '肺活量测试，单位 ml',
      detail:
        '使用肺活量计测试。测试前深吸气，含紧吹嘴后一次性尽力呼出，中途不要漏气，不要二次吸气。',
      standards: [
        {
          label: '女生及格参考',
          value: '大一/大二 ≥ 2000 ml；大三/大四 ≥ 2050 ml',
        },
        {
          label: '男生及格参考',
          value: '大一/大二 ≥ 3100 ml；大三/大四 ≥ 3200 ml',
        },
        {
          label: '测试技巧',
          value: '测试前可做几次深呼吸，吹气时保持连续、稳定、尽力呼出。',
        },
      ],
    },
    {
      title: '柔韧与爆发力',
      icon: Ruler,
      color: 'bg-purple-100 text-purple-600',
      desc: '坐位体前屈 / 立定跳远',
      detail:
        '坐位体前屈主要测试柔韧性；立定跳远主要测试下肢爆发力。测试前建议充分热身，避免拉伤。',
      standards: [
        {
          label: '坐位体前屈',
          value: '双腿伸直，双手向前推动测试板，不得屈膝或突然冲击测试板。',
        },
        {
          label: '立定跳远',
          value: '双脚同时起跳，不得助跑，不得踩线，落地后以最近触地点计成绩。',
        },
        {
          label: '成绩记录',
          value: '通常每项有多次测试机会，取最好成绩；具体次数以现场安排为准。',
        },
      ],
    },
    {
      title: '速度与耐力',
      icon: Zap,
      color: 'bg-orange-100 text-orange-600',
      desc: '50 米跑 / 女生 800 米 / 男生 1000 米',
      detail:
        '50 米跑测试短距离速度；800 米或 1000 米测试耐力。长跑项目建议提前热身，合理分配体力。',
      standards: [
        {
          label: '50 米跑',
          value: '听到起跑口令后起跑，冲过终点线计时，成绩越短越好。',
        },
        {
          label: '女生耐力项目',
          value: '800 米跑，建议保持稳定配速，避免前半程冲刺过猛。',
        },
        {
          label: '男生耐力项目',
          value: '1000 米跑，建议测试前充分热身，测试后慢走放松。',
        },
      ],
    },
    {
      title: '力量测试',
      icon: Dumbbell,
      color: 'bg-rose-100 text-rose-600',
      desc: '女生仰卧起坐 / 男生引体向上',
      detail:
        '女生通常测试 1 分钟仰卧起坐；男生通常测试引体向上。动作不规范可能不计入有效次数。',
      standards: [
        {
          label: '女生：1 分钟仰卧起坐',
          value: '记录 1 分钟内完成的有效次数，肩背触垫、起身动作需符合现场要求。',
        },
        {
          label: '男生：引体向上',
          value: '从悬垂开始，上拉至下颌超过杠面，身体摆动过大可能不计数。',
        },
        {
          label: '注意事项',
          value: '测试前活动肩、腰、腹和手腕，避免因动作过猛造成不适。',
        },
      ],
    },
  ];

  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="px-5 pt-12 pb-5 border-b border-slate-50 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-900"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-lg font-black text-slate-900">体测预约</h2>

        <button className="p-2 -mr-2 text-slate-400">
          <Info size={20} />
        </button>
      </div>

      <div className="flex-1 px-5 py-5 space-y-6 overflow-y-auto">
        {/* Project Requirements */}
        <section className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 font-black text-sm flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              体测项目清单及考试要求
            </h3>

            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[10px]">
              点击查看标准
            </Badge>
          </div>

          <div className="space-y-3">
            {testProjects.map((item, i) => {
              const Icon = item.icon;
              const isExpanded = expandedProject === i;

              return (
                <div
                  key={i}
                  className={cn(
                    'rounded-2xl border transition-all overflow-hidden',
                    isExpanded
                      ? 'bg-white border-emerald-100 shadow-sm'
                      : 'bg-slate-50 border-slate-100'
                  )}
                >
                  <button
                    onClick={() => setExpandedProject(isExpanded ? null : i)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                          item.color
                        )}
                      >
                        <Icon size={22} />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900 mb-0.5">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className={cn(
                        'text-slate-300 transition-transform shrink-0',
                        isExpanded && 'rotate-90 text-emerald-500'
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-3">
                      <div className="bg-slate-50 rounded-2xl p-3">
                        <p className="text-[10px] text-slate-400 font-black mb-1">
                          考试说明
                        </p>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {item.detail}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] text-slate-400 font-black">
                          具体达标范围 / 评分参考
                        </p>

                        {item.standards.map((standard, index) => (
                          <div
                            key={index}
                            className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-100/60"
                          >
                            <div className="flex items-start gap-2">
                              <Check
                                size={14}
                                className="text-emerald-500 shrink-0 mt-0.5"
                              />
                              <div>
                                <p className="text-[10px] text-emerald-600 font-black mb-0.5">
                                  {standard.label}
                                </p>
                                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                                  {standard.value}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-3 flex gap-2">
            <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              页面展示为预约前参考信息。不同年级、性别的评分线可能不同，最终成绩以学校体测系统和现场测试结果为准。
            </p>
          </div>
        </section>

        {/* Date Selector */}
        <section className="space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full" />
              日历视图
            </h3>

            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
              2026年5月
            </span>
          </div>

          <div className="flex justify-between gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
            {dates.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(d.date)}
                className={cn(
                  'flex-shrink-0 flex flex-col items-center gap-2 w-14 py-4 rounded-2xl transition-all border',
                  selectedDate === d.date
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-200 scale-105'
                    : 'bg-white border-slate-100 text-slate-400'
                )}
              >
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {d.day}
                </span>
                <span className="text-xl font-black">{d.date}</span>
                {selectedDate === d.date && (
                  <div className="w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Time Slots */}
        <section className="space-y-4">
          <h3 className="font-black text-slate-900 flex items-center gap-2">
            <Timer size={16} className="text-emerald-500" />
            选择时段
          </h3>

          <div className="space-y-3">
            {slots.map((s, i) => (
              <button
                key={i}
                disabled={s.remain === 0}
                onClick={() => setSelectedSlot(s.time)}
                className={cn(
                  'w-full flex items-center justify-between p-4 rounded-2xl border transition-all',
                  s.remain === 0
                    ? 'bg-slate-50 border-slate-100 opacity-60'
                    : selectedSlot === s.time
                      ? 'bg-white border-emerald-500 shadow-sm'
                      : 'bg-white border-slate-100'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border flex items-center justify-center transition-colors',
                      selectedSlot === s.time
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-200'
                    )}
                  >
                    {selectedSlot === s.time && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>

                  <span
                    className={cn(
                      'text-sm font-bold',
                      selectedSlot === s.time
                        ? 'text-emerald-600'
                        : 'text-slate-700'
                    )}
                  >
                    {s.time}
                  </span>
                </div>

                <Badge
                  variant={s.remain === 0 ? 'secondary' : 'outline'}
                  className={cn(
                    'text-[10px] font-bold',
                    s.remain > 0
                      ? 'text-emerald-600 border-emerald-100 bg-emerald-50'
                      : 'text-slate-400'
                  )}
                >
                  {s.remain === 0 ? '已满' : `剩 ${s.remain} 名额`}
                </Badge>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="p-6 border-t border-slate-50 bg-white">
        <Button
          disabled={!selectedSlot}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/20"
        >
          确认预约
        </Button>
      </div>
    </div>
  );
};

export default Appointment;