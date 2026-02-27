import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import pool, { getClientIp } from '@/lib/db';

// GET /api/likes - Get likes for a post
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
  }

  try {
    // Get total likes count
    const [countResult]: any = await pool.query(
      'SELECT COUNT(*) as count FROM wp_post_likes WHERE post_id = ?',
      [postId]
    );
    const count = parseInt(countResult[0]?.count || '0', 10);

    // Check if user has liked
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id ? parseInt((session.user as any).id) : null : null;
    const ipAddress = getClientIp(request);

    let userHasLiked = false;
    if (userId) {
      const [userLikes]: any = await pool.query(
        'SELECT id FROM wp_post_likes WHERE post_id = ? AND user_id = ?',
        [postId, userId]
      );
      userHasLiked = userLikes.length > 0;
    } else {
      const [ipLikes]: any = await pool.query(
        'SELECT id FROM wp_post_likes WHERE post_id = ? AND ip_address = ? AND user_id IS NULL',
        [postId, ipAddress]
      );
      userHasLiked = ipLikes.length > 0;
    }

    return NextResponse.json({
      postId,
      count,
      userHasLiked,
    });
  } catch (error) {
    console.error('Like GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/likes - Toggle like for a post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id ? parseInt((session.user as any).id) : null : null;
    const ipAddress = getClientIp(request);

    const body = await request.json();
    const { postId, action } = body;

    if (!postId) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    // Check if already liked
    let existingLike: any = [];
    if (userId) {
      [existingLike] = await pool.query(
        'SELECT id FROM wp_post_likes WHERE post_id = ? AND user_id = ?',
        [postId, userId]
      );
    } else {
      [existingLike] = await pool.query(
        'SELECT id FROM wp_post_likes WHERE post_id = ? AND ip_address = ? AND user_id IS NULL',
        [postId, ipAddress]
      );
    }

    const isAlreadyLiked = existingLike.length > 0;

    if (action === 'like' || action === 'toggle') {
      if (!isAlreadyLiked) {
        await pool.query(
          'INSERT INTO wp_post_likes (post_id, user_id, ip_address) VALUES (?, ?, ?)',
          [postId, userId, userId ? null : ipAddress]
        );
      }
    } else if (action === 'unlike') {
      if (isAlreadyLiked) {
        if (userId) {
          await pool.query(
            'DELETE FROM wp_post_likes WHERE post_id = ? AND user_id = ?',
            [postId, userId]
          );
        } else {
          await pool.query(
            'DELETE FROM wp_post_likes WHERE post_id = ? AND ip_address = ? AND user_id IS NULL',
            [postId, ipAddress]
          );
        }
      }
    }

    // Get updated count
    const [countResult]: any = await pool.query(
      'SELECT COUNT(*) as count FROM wp_post_likes WHERE post_id = ?',
      [postId]
    );
    const count = parseInt(countResult[0]?.count || '0', 10);

    return NextResponse.json({
      postId,
      count,
      userHasLiked: action === 'unlike' ? false : true,
    });
  } catch (error) {
    console.error('Like POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
