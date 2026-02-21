'use client';

import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface InterestsSelectorProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
}

const ALL_INTERESTS = [
  { id: 'politika', label: 'Politika', emoji: '🏛️' },
  { id: 'ekonomi', label: 'Ekonomi', emoji: '💰' },
  { id: 'spor', label: 'Spor', emoji: '⚽' },
  { id: 'kultur', label: 'Kültür', emoji: '🎭' },
  { id: 'teknoloji', label: 'Teknoloji', emoji: '💻' },
  { id: 'saglik', label: 'Sağlık', emoji: '🏥' },
  { id: 'egitim', label: 'Eğitim', emoji: '📚' },
  { id: 'turizm', label: 'Turizm', emoji: '✈️' },
  { id: 'magazin', label: 'Magazin', emoji: '🌟' },
  { id: 'dunya', label: 'Dünya', emoji: '🌍' },
  { id: 'kibris', label: 'Kıbrıs', emoji: '🏝️' },
  { id: 'is-dunya', label: 'İş Dünyası', emoji: '💼' },
  { id: 'teknoloji', label: 'Bilim', emoji: '🔬' },
  { id: 'cevre', label: 'Çevre', emoji: '🌿' },
  { id: 'yasaray', label: 'Yaşam', emoji: '🏠' },
];

export default function InterestsSelector({ selectedInterests, onChange }: InterestsSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState<string[]>(selectedInterests);

  useEffect(() => {
    setLocalSelected(selectedInterests);
  }, [selectedInterests]);

  const toggleInterest = (id: string) => {
    setLocalSelected(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    onChange(localSelected);
    setIsOpen(false);
  };

  const selectedLabels = ALL_INTERESTS
    .filter(i => selectedInterests.includes(i.id))
    .map(i => i.label)
    .slice(0, 3);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
      >
        <span className="font-medium">İlgi Alanları</span>
        <span className="text-gray-500">
          {selectedInterests.length > 0 
            ? `(${selectedInterests.length})` 
            : '(Seçilmedi)'}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                İlgi Alanlarınızı Seçin
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                İlgi alanlarınızı seçerek kişiselleştirilmiş haber akışı oluşturun.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALL_INTERESTS.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                      localSelected.includes(interest.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <span className="text-lg">{interest.emoji}</span>
                    <span className="text-sm font-medium">{interest.label}</span>
                    {localSelected.includes(interest.id) && (
                      <Check className="w-4 h-4 ml-auto text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium
                         hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium
                         hover:bg-blue-600 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
