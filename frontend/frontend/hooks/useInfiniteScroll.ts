import { useEffect, useRef, useCallback } from 'react';

export const useInfiniteScroll = (
    onLoadMore: () => void,
    hasMore: boolean,
    loading: boolean
) => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const triggerRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    onLoadMore();
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [loading, hasMore, onLoadMore]
    );

    return { triggerRef };
};