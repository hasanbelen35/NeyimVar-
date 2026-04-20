const UserAvatar = ({ avatarUrl, username, size = "sm" }: {
  avatarUrl?: string | null;
  username?: string | null;
  size?: "sm" | "lg";
}) => {
  const sizeClass = size === "lg" ? "w-16 h-16 text-xl" : "w-10 h-10 text-sm";
  const initial = username?.charAt(0).toUpperCase() || "U";

  return (
    <div className={`${sizeClass} rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="font-bold text-slate-500 dark:text-slate-400">{initial}</span>
      )}
    </div>
  );
};

export default UserAvatar;