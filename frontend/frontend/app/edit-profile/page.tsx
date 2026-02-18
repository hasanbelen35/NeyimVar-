"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateProfile, resetProfileStatus } from "@/store/profileSlice";
import ThemeToggle from "@/components/themeButton";
import { UpdateProfilePayload } from "@/types/profile.type";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { username, university, department, avatarUrl, bio, loading, error } = useSelector(
    (state: RootState) => state.profile
  );

  const [formData, setFormData] = useState<UpdateProfilePayload>({
    username: username || "",
    university: university || "",
    department: department || "",
    avatarUrl: avatarUrl || "",
    bio: bio || "",
  });

  useEffect(() => {
    setFormData({
      username: username || "",
      university: university || "",
      department: department || "",
      avatarUrl: avatarUrl || "",
      bio: bio || "",
    });
  }, [username, university, department, avatarUrl, bio]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <form className="w-full max-w-md p-8 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl space-y-6 border border-transparent dark:border-slate-700 transition-all">

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Edit Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Update your personal information
          </p>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>

        <div className="flex flex-col items-center space-y-3">
          <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-md border-2 border-blue-500 flex items-center justify-center text-slate-400 text-sm italic">
            Avatar
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="yourusername"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">University</label>
            <input
              name="university"
              value={formData.university}
              onChange={handleChange}
              type="text"
              placeholder="Your University"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              type="text"
              placeholder="Your Department"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Avatar URL</label>
            <input
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              type="text"
              placeholder="https://example.com/avatar.jpg"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Tell something about yourself..."
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          type="button"
          className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transition-all transform active:scale-95 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
