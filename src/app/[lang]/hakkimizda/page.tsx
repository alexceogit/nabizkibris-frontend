'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, FileText, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = (params?.lang as string) || 'tr';

  const content = {
    tr: {
      title: 'Hakkımızda',
      subtitle: 'KKTC ve Kıbrıs haberlerinin nabzını tutuyoruz',
      missionTitle: 'Misyonumuz',
      missionText: 'Kuzey Kıbrıs Türk Cumhuriyeti\'ndeki gelişmeleri, haberleri ve olayları sizlere en hızlı, en doğru ve en tarafsız şekilde ulaştırmak temel misyonumuzdur. Doğru haber yapmanın sorumluluğunu her zaman üstleniyoruz.',
      visionTitle: 'Vizyonumuz',
      visionText: 'Kıbrıs\'ın en güvenilir haber kaynağı olmak ve bölgedeki gelişmeleri uluslararası arenaya taşımak vizyonumuzdur. Haberlerimizle köprü görevi görmeyi amaçlıyoruz.',
      valuesTitle: 'Değerlerimiz',
      values: [
        { icon: FileText, title: 'Doğruluk', desc: 'Haberlerimizin doğruluğu en önceliğimizdir.' },
        { icon: Award, title: 'Kalite', desc: 'Kaliteli habercilik anlayışıyla çalışıyoruz.' },
        { icon: Heart, title: 'Tarafsızlık', desc: 'Tarafsız ve objektif habercilik yapıyoruz.' },
      ],
      contactTitle: 'İletişim',
      address: 'Lefkoşa, Kuzey Kıbrıs Türk Cumhuriyeti',
      phone: '+90 392 123 45 67',
      email: 'info@nabizkibris.com',
      hours: 'Pazartesi - Cuma: 09:00 - 18:00',
    },
    en: {
      title: 'About Us',
      subtitle: 'We pulse the news of KKTC and Cyprus',
      missionTitle: 'Our Mission',
      missionText: 'Our core mission is to deliver the developments, news and events in the Turkish Republic of Northern Cyprus to you in the fastest, most accurate and most unbiased way. We always take responsibility for accurate reporting.',
      visionTitle: 'Our Vision',
      visionText: 'Our vision is to be the most reliable news source in Cyprus and to bring the developments in the region to the international arena. We aim to serve as a bridge with our news.',
      valuesTitle: 'Our Values',
      values: [
        { icon: FileText, title: 'Truth', desc: 'The accuracy of our news is our top priority.' },
        { icon: Award, title: 'Quality', desc: 'We work with a quality journalism understanding.' },
        { icon: Heart, title: 'Impartiality', desc: 'We provide unbiased and objective journalism.' },
      ],
      contactTitle: 'Contact',
      address: 'North Nicosia, Turkish Republic of Northern Cyprus',
      phone: '+90 392 123 45 67',
      email: 'info@nabizkibris.com',
      hours: 'Monday - Friday: 09:00 - 18:00',
    },
    el: {
      title: 'Σχετικά με Εμάς',
      subtitle: 'Χτυπούμε τον παλμό των ειδήσεων της ΚΔΤΚ και της Κύπρου',
      missionTitle: 'Η Αποστολή μας',
      missionText: 'Η βασική μας αποστολή είναι να σας παρέχουμε τις εξελίξεις, τις ειδήσεις και τα γεγονότα στο Τουρκικό Δημοκρατικό της Βόρειας Κύπρο με τον πιο γρήγορο, ακριβή και αμερόληπτο τρόπο. Πάντα αναλαμβάνουμε την ευθύνη της ακριβούς είδησης.',
      visionTitle: 'Το Όραμά μας',
      visionText: 'Το όραμά μας είναι να γίνουμε η πιο αξιόπιστη πηγή ειδήσεων στην Κύπρο και να φέρουμε τις εξελίξεις στην περιοχή στη διεθνή αρένα. Στοχεύουμε να λειτουργήσουμε ως γέφυρα με τις ειδήσεις μας.',
      valuesTitle: 'Οι Αξίες μας',
      values: [
        { icon: FileText, title: 'Αλήθεια', desc: 'Η ακρίβεια των ειδήσεών μας είναι η κορυφαία προτεραιότητά μας.' },
        { icon: Award, title: 'Ποιότητα', desc: 'Εργαζόμαστε με κατανόηση ποιοτικής δημοσιογραφίας.' },
        { icon: Heart, title: 'Αμεροληψία', desc: 'Παρέχουμε αμερόληπτη και αντικειμενική δημοσιογραφία.' },
      ],
      contactTitle: 'Επικοινωνία',
      address: 'Βόρεια Λευκωρία, Τουρκική Δημοκρατία της Βόρειας Κύπρου',
      phone: '+90 392 123 45 67',
      email: 'info@nabizkibris.com',
      hours: 'Δευτέρα - Παρασκευή: 09:00 - 18:00',
    },
  };

  const t = content[lang as keyof typeof content] || content.tr;

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-text-secondary dark:text-gray-400">
            {t.subtitle}
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6">
              {t.missionTitle}
            </h2>
            <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed">
              {t.missionText}
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6">
              {t.visionTitle}
            </h2>
            <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed">
              {t.visionText}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-8">
            {t.valuesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.values.map((value, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary dark:text-gray-400">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-8">
            {t.contactTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-text-primary dark:text-white mb-2">
                {lang === 'tr' ? 'Adres' : lang === 'en' ? 'Address' : 'Διεύθυνση'}
              </h3>
              <p className="text-text-secondary dark:text-gray-400 text-sm">
                {t.address}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-text-primary dark:text-white mb-2">
                {lang === 'tr' ? 'Telefon' : 'Phone'}
              </h3>
              <p className="text-text-secondary dark:text-gray-400 text-sm">
                {t.phone}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-text-primary dark:text-white mb-2">
                E-posta
              </h3>
              <p className="text-text-secondary dark:text-gray-400 text-sm">
                {t.email}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <Clock className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-text-primary dark:text-white mb-2">
                {lang === 'tr' ? 'Çalışma Saatleri' : 'Working Hours'}
              </h3>
              <p className="text-text-secondary dark:text-gray-400 text-sm">
                {t.hours}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
