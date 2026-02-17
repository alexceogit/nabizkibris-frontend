'use client';

import { useState, useEffect } from 'react';

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
  change: number;
  icon: string;
}

export function ExchangeRateWidget() {
  const [rates, setRates] = useState<ExchangeRate[]>([
    { code: 'USD', name: 'Dolar', rate: 43.45, change: 0.12, icon: '$' },
    { code: 'EUR', name: 'Euro', rate: 47.12, change: -0.05, icon: '€' },
    { code: 'GBP', name: 'Sterlin', rate: 55.89, change: 0.23, icon: '£' },
    { code: 'TRY', name: 'Türk Lirası', rate: 1.00, change: 0.00, icon: '₺' },
  ]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // Simulate API call to fetch exchange rates
    // In production, this would call a real exchange rate API
    const fetchRates = async () => {
      setLoading(true);
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setLastUpdated(new Date());
      setLoading(false);
    };

    fetchRates();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2">
            <span className="text-lg">💱</span>
            Döviz Kurları
          </h3>
          {lastUpdated && !loading && (
            <span className="text-xs text-white/80">
              {formatTime(lastUpdated)}
            </span>
          )}
        </div>
      </div>

      {/* Rates */}
      <div className="p-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {rates.map((rate) => (
              <div 
                key={rate.code}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg font-bold text-text-primary dark:text-white">
                    {rate.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary dark:text-white">
                      {rate.code}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">
                      {rate.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text-primary dark:text-white">
                    {rate.rate.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-end gap-1">
                    {rate.change > 0 ? (
                      <span className="text-xs text-green-600 dark:text-green-400">
                        ▲ {rate.change.toFixed(2)}
                      </span>
                    ) : rate.change < 0 ? (
                      <span className="text-xs text-red-600 dark:text-red-400">
                        ▼ {Math.abs(rate.change).toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">−</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 text-xs text-center text-text-muted dark:text-gray-400">
        Merkez Bankası Kuru
      </div>
    </div>
  );
}

// Compact version for sidebar
export function ExchangeRateCompact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm animate-pulse">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-1">
        <span className="font-bold text-green-600">$</span>
        <span className="font-semibold text-text-primary dark:text-white">43.45</span>
      </div>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <div className="flex items-center gap-1">
        <span className="font-bold text-blue-600">€</span>
        <span className="font-semibold text-text-primary dark:text-white">47.12</span>
      </div>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <div className="flex items-center gap-1">
        <span className="font-bold text-purple-600">£</span>
        <span className="font-semibold text-text-primary dark:text-white">55.89</span>
      </div>
    </div>
  );
}
