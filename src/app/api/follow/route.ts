import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import pool, { getClientIp } from '@/lib/db';

// GET /api/follow - Get follow status for a user/author
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get('authorId');

  if (!authorId) {
    return NextResponse.json({ error: 'Author ID required' }, { status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id ? parseInt((session.user as any).id) : null : null;
    const ipAddress = getClientIp(request);

    // Get follower count
    const [countResult]: any = await pool.query(
      'SELECT COUNT(*) as count FROM wp_author_follows WHERE author_id = ?',
      [authorId]
    );
    const followerCount = parseInt(countResult[0]?.count || '0', 10);

    // Check if current user is following
    let isFollowing = false;
    if (userId) {
      const [userFollows]: any = await pool.query(
        'SELECT id FROM wp_author_follows WHERE author_id = ? AND follower_id = ?',
        [authorId, userId]
      );
      isFollowing = userFollows.length > 0;
    } else {
      const [ipFollows]: any = await pool.query(
        'SELECT id FROM wp_author_follows WHERE author_id = ? AND follower_ip = ? AND follower_id IS NULL',
        [authorId, ipAddress]
      );
      isFollowing = ipFollows.length > 0;
    }

    // Get following count for current user
    let followingCount = 0;
    if (userId) {
      const [followingResult]: any = await pool.query(
        'SELECT COUNT(*) as count FROM wp_author_follows WHERE follower_id = ?',
        [userId]
      );
      followingCount = parseInt(followingResult[0]?.count || '0', 10);
    }

    return NextResponse.json({
      authorId,
      isFollowing,
      followerCount,
      followingCount,
    });
  } catch (error) {
    console.error('Follow GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/follow - Toggle follow for a user/author
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id ? parseInt((session.user as any).id) : null : null;
    const ipAddress = getClientIp(request);

    const body = await request.json();
    const { authorId, action } = body;

    if (!authorId) {
      return NextResponse.json({ error: 'Author ID required' }, { status: 400 });
    }

    if (userId && authorId === userId.toString()) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    // Check if already following
    let existingFollow: any = [];
    if (userId) {
      [existingFollow] = await pool.query(
        'SELECT id FROM wp_author_follows WHERE author_id = ? AND follower_id = ?',
        [authorId, userId]
      );
    } else {
      [existingFollow] = await pool.query(
        'SELECT id FROM wp_author_follows WHERE author_id = ? AND follower_ip = ? AND follower_id IS NULL',
        [authorId, ipAddress]
      );
    }
    const isAlreadyFollowing = existingFollow.length > 0;

    if (action === 'follow' || action === 'toggle') {
      if (!isAlreadyFollowing) {
        await pool.query(
          'INSERT INTO wp_author_follows (author_id, follower_id, follower_ip) VALUES (?, ?, ?)',
          [authorId, userId, userId ? null : ipAddress]
        );
      }
    } else if (action === 'unfollow') {
      if (isAlreadyFollowing) {
        if (userId) {
          await pool.query(
            'DELETE FROM wp_author_follows WHERE author_id = ? AND follower_id = ?',
            [authorId, userId]
          );
        } else {
          await pool.query(
            'DELETE FROM wp_author_follows WHERE author_id = ? AND follower_ip = ? AND follower_id IS NULL',
            [authorId, ipAddress]
          );
        }
      }
    }

    // Get updated counts
    const [countResult]: any = await pool.query(
      'SELECT COUNT(*) as count FROM wp_author_follows WHERE author_id = ?',
      [authorId]
    );
    const followerCount = parseInt(countResult[0]?.count || '0', 10);

    let followingCount = 0;
    if (userId) {
      const [followingResult]: any = await pool.query(
        'SELECT COUNT(*) as count FROM wp_author_follows WHERE follower_id = ?',
        [userId]
      );
      followingCount = parseInt(followingResult[0]?.count || '0', 10);
    }

    return NextResponse.json({
      authorId,
      isFollowing: action === 'unfollow' ? false : true,
      followerCount,
      followingCount,
    });
  } catch (error) {
    console.error('Follow POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
