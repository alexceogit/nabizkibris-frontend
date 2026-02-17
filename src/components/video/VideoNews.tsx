'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, Eye, Volume2, VolumeX, Maximize, Share2 } from 'lucide-react';

interface VideoArticle {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  duration: string;
  views: string;
  date: string;
  category: string;
}

interface VideoNewsProps {
  title?: string;
  videos?: VideoArticle[];
  variant?: 'default' | 'compact' | 'slider';
  limit?: number;
}

const defaultVideos: VideoArticle[] = [
  {
    id: '1',
    title: 'KKTC Başbakanı\'ndan önemli açıklamalar',
    slug: 'kkte-basbakan-aciklama',
    thumbnail: 'https://picsum.photos/640/360?random=1',
    duration: '15:42',
    views: '125K',
    date: '2 saat önce',
    category: 'Politika',
  },
  {
    id: '2',
    title: 'Girne Marina sezon açılışı canlı yayını',
    slug: 'girne-marina-acilis',
    thumbnail: 'https://picsum.photos/640/360?random=2',
    duration: '45:30',
    views: '89K',
    date: '5 saat önce',
    category: 'Turizm',
  },
  {
    id: '3',
    title: 'Milli takım son çalışması',
    slug: 'milli-takim-son-calisma',
    thumbnail: 'https://picsum.photos/640/360?random=3',
    duration: '08:15',
    views: '67K',
    date: '8 saat önce',
    category: 'Spor',
  },
  {
    id: '4',
    title: 'Hava durumu detaylı analiz',
    slug: 'hava-durumu-analiz',
    thumbnail: 'https://picsum.photos/640/360?random=4',
    duration: '12:00',
    views: '45K',
    date: '1 gün önce',
    category: 'Hava',
  },
  {
    id: '5',
    title: 'Kıbrıs mutfağı lezzetleri',
    slug: 'kibris-mutfagi',
    thumbnail: 'https://picsum.photos/640/360?random=5',
    duration: '22:30',
    views: '156K',
    date: '2 gün önce',
    category: 'Kültür',
  },
];

export function VideoNews({
  title = 'Video Haberler',
  videos = defaultVideos,
  variant = 'default',
  limit = 6,
}: VideoNewsProps) {
  const displayVideos = videos.slice(0, limit);

  if (variant === 'slider') {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary dark:text-white flex items-center gap-2">
            <span className="text-red-500">▶</span>
            {title}
          </h2>
          <Link href="/tr/video" className="text-sm text-primary hover:underline">
            Tümü →
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-4">
        {displayVideos.map((video) => (
          <CompactVideoCard key={video.id} video={video} />
        ))}
      </div>
    );
  }

  return (
    <section className="py-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6 flex items-center gap-2">
        <span className="text-red-500">▶</span>
        {title}
      </h2>
      
      {/* Featured Video */}
      {videos[0] && (
        <FeaturedVideo video={videos[0]} />
      )}
      
      {/* Video Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {videos.slice(1, 5).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}

function FeaturedVideo({ video }: { video: VideoArticle }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video group">
      {!isPlaying ? (
        <>
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <Play className="w-10 h-10 text-red-500 ml-1" fill="currentColor" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded">
              {video.category}
            </span>
            <span className="px-3 py-1 bg-black/70 text-white text-sm rounded flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {video.duration}
            </span>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <p className="text-white">Video Player Placeholder</p>
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded"
          >
            ✕
          </button>
        </div>
      )}
      
      <Link href={`/tr/video/${video.slug}`} className="absolute inset-0">
        <span className="sr-only">{video.title}</span>
      </Link>
    </div>
  );
}

function VideoCard({ video }: { video: VideoArticle }) {
  return (
    <article className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all">
      <Link href={`/tr/video/${video.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-red-500 ml-0.5" fill="currentColor" />
            </div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
            {video.category}
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-text-primary dark:text-white line-clamp-2 group-hover:text-primary transition-colors text-sm">
            {video.title}
          </h3>
          <div className="flex items-center justify-between mt-2 text-xs text-text-muted dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views}
            </span>
            <span>{video.date}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function CompactVideoCard({ video }: { video: VideoArticle }) {
  return (
    <Link 
      href={`/tr/video/${video.slug}`}
      className="flex gap-3 p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
    >
      <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Play className="w-6 h-6 text-white" fill="currentColor" />
        </div>
        <span className="absolute bottom-0.5 right-0.5 px-1 bg-black/70 text-white text-xs">
          {video.duration}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text-primary dark:text-white text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-xs text-text-muted dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.views}
          </span>
          <span>{video.category}</span>
        </div>
      </div>
    </Link>
  );
}

// Video sidebar widget
export function VideoWidget({ videos = defaultVideos.slice(0, 3) }: { videos?: VideoArticle[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-text-primary dark:text-white mb-4 flex items-center gap-2">
        <span className="text-red-500">▶</span>
        Video Galeri
      </h3>
      <div className="space-y-3">
        {videos.map((video) => (
          <CompactVideoCard key={video.id} video={video} />
        ))}
      </div>
      <Link 
        href="/tr/video" 
        className="block mt-4 text-center text-sm text-primary hover:underline font-medium py-2 border-t border-gray-100 dark:border-gray-700"
      >
        Tüm Videolar →
      </Link>
    </div>
  );
}
