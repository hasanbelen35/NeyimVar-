'use client';

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchFeedNotes, resetFeed, toggleLike } from '@/store/noteSlice';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { feedNotes, feedLoading, feedPagination } = useSelector(
    (state: RootState) => state.notes
  );

  useEffect(() => {
    dispatch(fetchFeedNotes(1));
    return () => {
      dispatch(resetFeed());
    };
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!feedLoading && feedPagination.hasMore) {
      dispatch(fetchFeedNotes(feedPagination.currentPage + 1));
    }
  }, [dispatch, feedLoading, feedPagination]);

  const handleLike = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation(); 
    dispatch(toggleLike(noteId));
  };

  const { triggerRef } = useInfiniteScroll(loadMore, feedPagination.hasMore, feedLoading);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 p-6">
      <div className="max-w-2xl mx-auto">

        {/* LOADING SKELETON */}
        {feedLoading && feedNotes.length === 0 && (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="w-28 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="w-3/4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 mb-3" />
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 mb-2" />
                <div className="w-2/3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        )}

        {/* NOTE LIST */}
        <div className="flex flex-col gap-4">
          {feedNotes.map((note, index) => (
            <div
              key={note.id}
              className="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-fadeSlideIn"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5 shrink-0">
                  {note.user?.profile?.avatarUrl ? (
                    <img
                      src={note.user.profile.avatarUrl}
                      alt={note.user.profile.username}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {note.user?.name?.charAt(0).toUpperCase() ?? '?'}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    @{note.user?.profile?.username ?? 'kullanıcı'}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 shrink-0">
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleDateString('tr-TR')
                    : 'Yeni'}
                </span>
              </div>

              <div className="my-3 border-t border-slate-100 dark:border-slate-700/50" />

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {note.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {note.content}
                </p>
              </div>

              {/* DOWN DATA & LIKE BUTTON */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {note.user?.profile?.department ?? ''}
                  </span>
                  {note.isPublic && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                      Herkese Açık
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => handleLike(e, note.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all duration-300 ${
                    note.isLiked 
                      ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={note.isLiked ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    className={`w-5 h-5 transition-transform duration-300 ${note.isLiked ? 'scale-110' : 'group-hover:scale-110'}`}
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span className="text-xs font-bold">{note.likeCount ?? 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* INFINITE SCROLL TRIGGER */}
        {feedPagination.hasMore && (
          <div ref={triggerRef} className="flex justify-center py-10">
            {feedLoading && (
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        )}

        {!feedPagination.hasMore && feedNotes.length > 0 && (
          <p className="text-center text-slate-400 dark:text-slate-500 text-sm py-8">
            Tüm notlar yüklendi ✓
          </p>
        )}

        {!feedLoading && feedNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4 opacity-20">📝</div>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">
              Henüz hiç not yok.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}