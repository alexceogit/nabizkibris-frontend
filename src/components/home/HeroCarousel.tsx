'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselNews {
  id: string;
  title: string;
  excerpt?: string;
  image: string;
  slug: string;
  category?: string;
  isBreaking?: boolean;
}

interface HeroCarouselProps {
  news: CarouselNews[];
  currentLang?: string;
}

export function HeroCarousel({ news, currentLang = 'tr' }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || isHovered || news.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, news.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (news.length === 0) {
    return null;
  }

  if (news.length === 1) {
    const item = news[0];
    return (
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl">
        <Image
          src={item.image || '/placeholder-news.jpg'}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {item.category && (
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase bg-flash text-white rounded-full">
              {item.category}
            </span>
          )}
          <Link href={`/${currentLang}/${item.slug}`}>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight hover:text-gray-200 transition-colors">
              {item.title}
            </h1>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {news.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={item.image || '/placeholder-news.jpg'}
            alt={item.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {item.category && (
              <span className={`inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full ${
                item.isBreaking 
                  ? 'bg-flash text-white animate-pulse' 
                  : 'bg-primary text-white'
              }`}>
                {item.isBreaking ? '🔥 SON DAKİKA' : item.category}
              </span>
            )}
            <Link href={`/${currentLang}/${item.slug}`}>
              <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight hover:text-gray-200 transition-colors">
                {item.title}
              </h2>
            </Link>
            {item.excerpt && (
              <p className="mt-3 text-gray-200 text-sm md:text-base line-clamp-2 max-w-3xl">
                {item.excerpt}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto Play Toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
      >
        {isAutoPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
