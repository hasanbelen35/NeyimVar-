'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LeftMenu = () => {
  const { username, avatarUrl, department } = useSelector(
    (state: RootState) => state.profile
  );
  
  const pathname = usePathname();

  const menuItems = [
    { icon: '🏠', label: 'Ana Sayfa', path: '/' },
    { icon: '📝', label: 'Notlarım', path: '/my-notes' },
    { icon: '➕', label: 'Yeni Not', path: '/create' },
    { icon: '🔖', label: 'Kaydettiklerim', path: '/bookmarks' },
    { icon: '⚙️', label: 'Ayarlar', path: '/settings' },
  ];

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={username || 'Profil'}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shrink-0 flex items-center justify-center text-white font-bold border-2 border-white dark:border-slate-700">
              {username?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
          
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
              @{username || 'kullanici'}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-medium uppercase tracking-wider">
              {department || 'Öğrenci'}
            </p>
          </div>
        </div>
      </div>

      <nav className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              href={item.path} 
              key={item.label}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 w-full text-left
                ${isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-4">
          İstatistikler
        </p>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Toplam Not', value: '0' },
            { label: 'Beğeni', value: '0' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;