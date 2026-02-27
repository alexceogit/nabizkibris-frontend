'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, ChevronRight } from 'lucide-react';
import { WP_Post } from '@/types';
import { TRANSLATIONS } from '@/lib/constants';
import type { Language } from '@/types';

interface BreakingNewsProps {
  posts?: WP_Post[];
  lang?: string;
}

export function BreakingNews({ posts = [], lang = 'tr' }: BreakingNewsProps) {
  const t = TRANSLATIONS[lang as Language] || TRANSLATIONS.tr;
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || posts.length === 0) return null;

  // Create a concatenated string of all headlines for marquee
  const headlines = posts.map(post => post?.title?.rendered || t.breakingNews || 'Son dakika haberi').join(' • ');
  const slug = posts[0]?.slug || '#';

  return (
    <div className="w-full relative bg-[#0a0a0f] overflow-hidden">
      {/* Top red glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DC2626] to-transparent shadow-[0_0_10px_#DC2626,0_0_20px_#DC2626]" />
      
      {/* Bottom red glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DC2626] to-transparent shadow-[0_0_10px_#DC2626,0_0_20px_#DC2626]" />
      
      <div className="flex items-center py-1.5 px-3">
        {/* Live indicator dot */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]" />
          </span>
          <span className="font-bold text-white tracking-wide text-xs">{t.breakingNews || 'SON DAKİKA'}</span>
        </div>

        {/* Settings icon */}
        <button className="mx-3 shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Ayarlar">
          <Settings className="h-4 w-4 text-gray-400" />
        </button>

        {/* Separator */}
        <div className="w-[1px] h-4 bg-white/30 mx-2 shrink-0" />

        {/* Scrolling marquee */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap">
            <Link href={`/${lang}/haber/${slug}`} className="inline-flex items-center text-white/90 hover:text-white transition-colors">
              <span className="text-sm font-medium">{headlines}</span>
              <ChevronRight className="h-4 w-4 ml-1 opacity-60" />
            </Link>
          </div>
        </div>
      </div>

      {/* Close button */}
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors z-10"
        aria-label={t.close || 'Kapat'}
      >
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
