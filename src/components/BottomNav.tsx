import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, History, User } from 'lucide-react';
import { cn } from '../lib/utils';

const BottomNav: React.FC = () => {
  const navItems = [
    { icon: Home, label: '首页', path: '/home' },
    { icon: LayoutGrid, label: '服务', path: '/services' },
    { icon: History, label: '记录', path: '/history' },
    { icon: User, label: '我的', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full max-w-md flex items-center justify-around bg-white border-t border-slate-100 py-2 px-4 pb-8 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 transition-colors duration-200",
              isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
