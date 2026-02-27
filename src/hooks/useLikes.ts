import { useState, useEffect, useCallback } from 'react';

interface UseLikesResult {
  count: number;
  isLiked: boolean;
  isLoading: boolean;
  toggleLike: () => Promise<void>;
}

export function useLikes(postId: string): UseLikesResult {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLikes = useCallback(async () => {
    try {
      const res = await fetch(`/api/likes?postId=${postId}`);
      const data = await res.json();
      setCount(data.count);
      setIsLiked(data.userHasLiked);
    } catch (error) {
      console.error('Error fetching likes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const toggleLike = async () => {
    try {
      const action = isLiked ? 'unlike' : 'like';
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, action }),
      });
      const data = await res.json();
      setCount(data.count);
      setIsLiked(data.userHasLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return { count, isLiked, isLoading, toggleLike };
}
