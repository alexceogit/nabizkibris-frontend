'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Type, Minus, Plus, RotateCcw } from 'lucide-react';

type FontSize = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  resetFontSize: () => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

const fontSizeClasses: Record<FontSize, string> = {
  small: 'text-sm leading-relaxed',
  medium: 'text-base leading-relaxed',
  large: 'text-lg leading-relaxed',
};

const fontSizeMultipliers: Record<FontSize, number> = {
  small: 0.875,
  medium: 1,
  large: 1.125,
};

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('fontSize') as FontSize;
    if (saved && ['small', 'medium', 'large'].includes(saved)) {
      setFontSize(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('fontSize', fontSize);
      document.documentElement.style.setProperty(
        '--base-font-size',
        `${fontSizeMultipliers[fontSize]}rem`
      );
    }
  }, [fontSize, mounted]);

  const resetFontSize = () => {
    setFontSize('medium');
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, resetFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
}

interface FontSizeToggleProps {
  showLabel?: boolean;
  variant?: 'default' | 'compact';
}

export function FontSizeToggle({ showLabel = true, variant = 'default' }: FontSizeToggleProps) {
  const { fontSize, setFontSize, resetFontSize } = useFontSize();

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setFontSize('small')}
          className={`p-1.5 rounded ${fontSize === 'small' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          aria-label="Small font"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setFontSize('medium')}
          className={`p-1.5 rounded ${fontSize === 'medium' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          aria-label="Medium font"
        >
          <Type className="w-4 h-4" />
        </button>
        <button
          onClick={() => setFontSize('large')}
          className={`p-1.5 rounded ${fontSize === 'large' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          aria-label="Large font"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className="text-sm text-text-secondary dark:text-gray-400">Yazı Boyutu:</span>
      )}
      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setFontSize('small')}
          className={`p-2 rounded transition-colors ${
            fontSize === 'small' 
              ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary dark:text-gray-400'
          }`}
          aria-label="Small font"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setFontSize('medium')}
          className={`p-2 rounded transition-colors ${
            fontSize === 'medium' 
              ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary dark:text-gray-400'
          }`}
          aria-label="Medium font"
        >
          <Type className="w-4 h-4" />
        </button>
        <button
          onClick={() => setFontSize('large')}
          className={`p-2 rounded transition-colors ${
            fontSize === 'large' 
              ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary dark:text-gray-400'
          }`}
          aria-label="Large font"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={resetFontSize}
        className="text-sm text-text-muted dark:text-gray-400 hover:text-primary transition-colors"
        title="Varsayılana sıfırla"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
}

// Component that applies font size to content
export function ArticleContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { fontSize } = useFontSize();
  
  return (
    <div className={`${fontSizeClasses[fontSize]} ${className}`}>
      {children}
    </div>
  );
}

// Font size indicator badge
export function FontSizeBadge() {
  const { fontSize } = useFontSize();
  
  const labels = {
    small: 'S',
    medium: 'M',
    large: 'L',
  };
  
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-white font-medium text-sm">
      {labels[fontSize]}
    </span>
  );
}
