'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {isLoginMode ? 'Üye Girişi' : 'Üye Ol'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isLoginMode
                  ? 'Haberleri paylaşmak için giriş yapın'
                  : 'Haberleri paylaşmak ve kaydetmek için üye olun'}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <button
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isLoginMode
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Giriş Yap
              </button>
              <button
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  !isLoginMode
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Üye Ol
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {!isLoginMode && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Şifreniz"
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                {isLoginMode ? 'Giriş Yap' : 'Üye Ol'}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              {isLoginMode ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="ml-1 text-blue-500 hover:text-blue-600 font-medium"
              >
                {isLoginMode ? 'Üye Ol' : 'Giriş Yap'}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-3">
              Sosyal medya ile devam et
            </p>
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl font-medium text-sm transition-colors">
                Facebook
              </button>
              <button className="flex-1 py-2.5 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white rounded-xl font-medium text-sm transition-colors">
                Twitter
              </button>
              <button className="flex-1 py-2.5 bg-[#EA4335] hover:bg-[#DD3C30] text-white rounded-xl font-medium text-sm transition-colors">
                Google
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
