"use client";

import UserAvatar from "./UserAvatar";

const MENU_ITEMS = [
  { id: "profile", label: "Profilim", icon: "👤", path: "/my-profile" },
  { id: "notes", label: "Notlarım", icon: "📝", path: "/notes" },
  { id: "settings", label: "Ayarlar", icon: "⚙️", path: "/settings" },
  { id: "favorites", label: "Favoriler", icon: "🌟", path: "/favorites" },
];

interface DropdownMenuProps {
  username: string | null;
  avatarUrl: string | null;
  department: string | null;
  isLoggingOut: boolean;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

const DropdownMenu = ({
  username,
  avatarUrl,
  department,
  isLoggingOut,
  onNavigate,
  onLogout,
  onClose,
}: DropdownMenuProps) => {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 py-4 z-20 animate-fadeIn">

        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col items-center gap-2">
          <div className="border-2 border-blue-100 dark:border-slate-700 rounded-full">
            <UserAvatar avatarUrl={avatarUrl} username={username} size="lg" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">
            @{username || "Kullanıcı"}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            {department || "Öğrenci"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 mt-4">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className="p-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-2xl transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800 text-left"
            >
              <div className="text-lg mb-1">{item.icon}</div>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tighter">
                {item.label}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-4 px-4">
          <button
            onClick={onLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>🚪</span>
            )}
            <span>{isLoggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}</span>
          </button>
        </div>

      </div>
    </>
  );
};

export default DropdownMenu;