'use client';

import { useState } from 'react';
import { MessageSquare, Send, User, Clock, ThumbsUp, Flag, MoreHorizontal } from 'lucide-react';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsProps {
  articleId?: string;
  articleSlug?: string;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Ahmet K.',
      avatar: 'https://picsum.photos/100/100?random=1',
    },
    content: 'Çok güzel bir haber olmuş. KKTC için umut verici gelişmeler. Takipteyiz!',
    date: '2 saat önce',
    likes: 24,
    replies: [
      {
        id: '1-1',
        author: {
          name: 'NabızKıbrıs',
          avatar: 'https://picsum.photos/100/100?random=100',
        },
        content: 'Yorumunuz için teşekkürler! En güncel haberler için takipte kalın.',
        date: '1 saat önce',
        likes: 5,
      },
    ],
  },
  {
    id: '2',
    author: {
      name: 'Mehmet B.',
      avatar: 'https://picsum.photos/100/100?random=2',
    },
    content: 'Bu konuda daha detaylı bilgi bekliyoruz. Yazınızı beğendim.',
    date: '3 saat önce',
    likes: 12,
  },
  {
    id: '3',
    author: {
      name: 'Ayşe T.',
      avatar: 'https://picsum.photos/100/100?random=3',
    },
    content: 'Harika bir çalışma olmuş. Tebrikler!',
    date: '5 saat önce',
    likes: 8,
  },
];

export function Comments({ articleId, articleSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: name,
        avatar: `https://picsum.photos/100/100?random=${Date.now()}`,
      },
      content: newComment,
      date: 'Az önce',
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setName('');
    setEmail('');
    setSubmitting(false);
  };

  return (
    <section className="py-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-text-primary dark:text-white mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-primary" />
        Yorumlar ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <h4 className="font-semibold text-text-primary dark:text-white mb-4">
          Yorum Yazın
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Adınız *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="E-posta (yayınlanmaz)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
              />
            </div>
          </div>
          <div>
            <textarea
              placeholder="Yorumunuz..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="input w-full resize-none"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={submitting}
          >
            <Send className="w-4 h-4 mr-2" />
            {submitting ? 'Gönderiliyor...' : 'Yorum Gönder'}
          </button>
        </form>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-text-secondary dark:text-gray-400">
          {comments.length} yorum
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              sortBy === 'newest' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            En Yeni
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              sortBy === 'popular' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            En Beğenilen
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-text-secondary dark:text-gray-400">
            Henüz yorum yapılmamış. İlk yorumu siz yapın!
          </p>
        </div>
      )}
    </section>
  );
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [showReply, setShowReply] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className={`${isReply ? 'ml-8 mt-4' : ''}`}>
      <div className="flex gap-3">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary dark:text-white">
                  {comment.author.name}
                </span>
                <span className="text-xs text-text-muted dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {comment.date}
                </span>
              </div>
              <button className="text-text-muted dark:text-gray-400 hover:text-text-primary dark:hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <p className="text-text-secondary dark:text-gray-300 text-sm">
              {comment.content}
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                liked 
                  ? 'text-primary' 
                  : 'text-text-muted dark:text-gray-400 hover:text-primary'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likes > 0 ? likes : 'Beğen'}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => setShowReply(!showReply)}
                className="flex items-center gap-1 text-sm text-text-muted dark:text-gray-400 hover:text-primary transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Yanıtla</span>
              </button>
            )}
            <button className="flex items-center gap-1 text-sm text-text-muted dark:text-gray-400 hover:text-red-500 transition-colors">
              <Flag className="w-4 h-4" />
              <span>Şikayet</span>
            </button>
          </div>

          {/* Reply Form */}
          {showReply && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Yanıtınız..."
                className="input flex-1"
              />
              <button className="btn-primary px-4">
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Compact version for sidebar
export function CommentsCompact({ articleId }: CommentsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <h4 className="font-bold text-text-primary dark:text-white mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        Son Yorumlar
      </h4>
      <div className="space-y-4">
        {mockComments.slice(0, 3).map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-3 last:pb-0">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium text-sm text-text-primary dark:text-white">
                {comment.author.name}
              </span>
              <span className="text-xs text-text-muted dark:text-gray-400">
                {comment.date}
              </span>
            </div>
            <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-2">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm text-primary hover:underline font-medium">
        Tüm Yorumları Göster →
      </button>
    </div>
  );
}
