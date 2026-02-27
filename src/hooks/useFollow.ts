import { useState, useEffect, useCallback } from 'react';

interface UseFollowResult {
  isFollowing: boolean;
  followerCount: number;
  isLoading: boolean;
  toggleFollow: () => Promise<void>;
}

export function useFollow(authorId: string): UseFollowResult {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/follow?authorId=${authorId}`);
      const data = await res.json();
      setIsFollowing(data.isFollowing);
      setFollowerCount(data.followerCount);
    } catch (error) {
      console.error('Error fetching follow status:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authorId]);

  useEffect(() => {
    fetchFollowStatus();
  }, [fetchFollowStatus]);

  const toggleFollow = async () => {
    try {
      const action = isFollowing ? 'unfollow' : 'follow';
      const res = await fetch('/api/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId, action }),
      });
      const data = await res.json();
      setIsFollowing(data.isFollowing);
      setFollowerCount(data.followerCount);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  return { isFollowing, followerCount, isLoading, toggleFollow };
}
