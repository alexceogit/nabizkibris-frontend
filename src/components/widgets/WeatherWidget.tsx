'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  icon: string;
  forecast: Array<{ day: string; high: number; low: number; icon: string }>;
}

const weatherConditions: Record<string, { icon: string; label: string }> = {
  'sunny': { icon: '☀️', label: 'Güneşli' },
  'cloudy': { icon: '☁️', label: 'Bulutlu' },
  'partly-cloudy': { icon: '⛅', label: 'Parçalı Bulutlu' },
  'rain': { icon: '🌧️', label: 'Yağmurlu' },
  'storm': { icon: '⛈️', label: 'Fırtınalı' },
  'snow': { icon: '❄️', label: 'Karlı' },
  'fog': { icon: '🌫️', label: 'Sisli' },
};

const CITIES = [
  { id: 'lefkosa', name: 'Lefkoşa' },
  { id: 'girne', name: 'Girne' },
  { id: 'gazimagusa', name: 'Gazi Mağusa' },
  { id: 'guzelyurt', name: 'Güzelyurt' },
  { id: 'iskele', name: 'İskele' },
];

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('lefkosa');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockWeather: WeatherData = {
        city: CITIES.find(c => c.id === selectedCity)?.name || 'Lefkoşa',
        temp: Math.floor(Math.random() * 10) + 15,
        condition: Object.keys(weatherConditions)[Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 30) + 40,
        wind: Math.floor(Math.random() * 20) + 5,
        icon: '☀️',
        forecast: [
          { day: 'Paz', high: 18, low: 12, icon: '☀️' },
          { day: 'Pzt', high: 17, low: 11, icon: '⛅' },
          { day: 'Sal', high: 16, low: 10, icon: '🌧️' },
          { day: 'Çar', high: 15, low: 9, icon: '🌧️' },
          { day: 'Per', high: 17, low: 10, icon: '☀️' },
        ],
      };
      
      setWeather(mockWeather);
      setLoading(false);
    };

    fetchWeather();
  }, [selectedCity]);

  if (loading || !weather) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="h-5 w-24 bg-white/30 rounded mb-2" />
            <div className="h-8 w-16 bg-white/30 rounded" />
          </div>
          <div className="w-12 h-12 bg-white/30 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-white/30 rounded" />
          <div className="h-4 w-16 bg-white/30 rounded" />
        </div>
      </div>
    );
  }

  const condition = weatherConditions[weather.condition] || weatherConditions['sunny'];

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-sm">
      {/* City Selector */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white/20 text-white text-sm rounded-lg px-3 py-1.5 border-none cursor-pointer hover:bg-white/30 transition-colors"
          >
            {CITIES.map(city => (
              <option key={city.id} value={city.id} className="text-gray-800">
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <span className="text-4xl">{condition.icon}</span>
      </div>

      {/* Current Weather */}
      <div className="mb-4">
        <div className="text-5xl font-bold">{weather.temp}°</div>
        <div className="text-white/80">{condition.label}</div>
      </div>

      {/* Details */}
      <div className="flex gap-4 text-sm text-white/80 mb-4">
        <div className="flex items-center gap-1">
          <span>💧</span>
          <span>%{weather.humidity}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>💨</span>
          <span>{weather.wind} km/s</span>
        </div>
      </div>

      {/* Forecast */}
      <div className="flex justify-between pt-4 border-t border-white/20">
        {weather.forecast.slice(0, 5).map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-white/70">{day.day}</div>
            <div className="text-lg my-1">{day.icon}</div>
            <div className="text-xs font-semibold">{day.high}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact version for header/sidebar
export function WeatherCompact() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWeather({
        city: 'Lefkoşa',
        temp: 22,
        condition: 'sunny',
        humidity: 55,
        wind: 12,
        icon: '☀️',
        forecast: [],
      });
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm animate-pulse">
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-lg">☀️</span>
      <span className="font-semibold text-text-primary dark:text-white">{weather?.temp}°</span>
      <span className="text-text-secondary dark:text-gray-400">Lefkoşa</span>
    </div>
  );
}
