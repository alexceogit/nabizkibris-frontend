'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = (params?.lang as string) || 'tr';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    tr: {
      title: 'İletişim',
      subtitle: 'Bizimle iletişime geçin',
      formTitle: 'Bize Yazın',
      namePlaceholder: 'Adınız Soyadınız',
      emailPlaceholder: 'E-posta Adresiniz',
      subjectPlaceholder: 'Konu',
      messagePlaceholder: 'Mesajınız...',
      sendButton: 'Gönder',
      successTitle: 'Mesajınız Gönderildi!',
      successText: 'En kısa sürede size dönüş yapacağız.',
      contactInfo: 'İletişim Bilgileri',
      address: 'Lefkoşa, Kuzey Kıbrıs Türk Cumhuriyeti',
      phone: '+90 392 123 45 67',
      email: 'info@nabizkibris.com',
      hours: 'Pazartesi - Cuma: 09:00 - 18:00',
    },
    en: {
      title: 'Contact',
      subtitle: 'Get in touch with us',
      formTitle: 'Write to Us',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Email Address',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Your message...',
      sendButton: 'Send',
      successTitle: 'Your Message Sent!',
      successText: 'We will get back to you as soon as possible.',
      contactInfo: 'Contact Information',
      address: 'North Nicosia, Turkish Republic of Northern Cyprus',
      phone: '+90 392 123 45 67',
      email: 'info@nabizkibris.com',
      hours: 'Monday - Friday: 09:00 - 18:00',
    },
    el: {
      title: 'Επικοινωνία',
      subtitle: 'Επικοινωνήστε μαζί μας',
      formTitle: 'Γράψτε μας',
      namePlaceholder: 'Το Όνομά σας',
      emailPlaceholder: 'Η Διεύθυνση Email',
      subjectPlaceholder: 'Θέμα',
      messagePlaceholder: 'Το μήνυμά σας...',
      sendButton: 'Αποστολή',
      successTitle: 'Το Μήνυμά σας Εστάλη!',
      successText: 'Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.',
      contactInfo: 'Στοιχεία Επικοινωνίας',
      address: 'Βόρεια Λευκωρία, Τουρκική Δημοκρατία της Βόρειας Κύπρου',
      phone: '+90 392 123 45 67',
      email: 'info@nabizkibris.com',
      hours: 'Δευτέρα - Παρασκευή: 09:00 - 18:00',
    },
  };

  const t = content[lang as keyof typeof content] || content.tr;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6">
              {t.formTitle}
            </h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">
                  {t.successTitle}
                </h3>
                <p className="text-text-secondary dark:text-gray-400">
                  {t.successText}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-primary hover:underline"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                    {t.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input w-full"
                    placeholder={t.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                    {t.emailPlaceholder}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input w-full"
                    placeholder={t.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                    {t.subjectPlaceholder}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input w-full"
                    placeholder={t.subjectPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                    {t.messagePlaceholder}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input w-full resize-none"
                    placeholder={t.messagePlaceholder}
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="w-5 h-5 mr-2" />
                  {t.sendButton}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6">
              {t.contactInfo}
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-white mb-1">
                    {lang === 'tr' ? 'Adres' : lang === 'en' ? 'Address' : 'Διεύθυνση'}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400">
                    {t.address}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-white mb-1">
                    {lang === 'tr' ? 'Telefon' : 'Phone'}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400">
                    {t.phone}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-white mb-1">
                    E-posta
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400">
                    {t.email}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-white mb-1">
                    {lang === 'tr' ? 'Çalışma Saatleri' : 'Working Hours'}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400">
                    {t.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-text-primary dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Sosyal Medya
              </h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9-.6-1.1-1-1.1H11V.5h2.5a1,1,0,0,0,1-1V0a1,1,0,0,0-1-1H8.5a1,1,0,0,0-1,1v1.5h2.3a1,1,0,0,0,1-1.1V0a1,1,0,0,0-1-1H5.5A1,1,0,0,0,4.5,0V1.5a1,1,0,0,0,1,1H6.5V7.46h-2a1,1,0,0,0-1,1V20.5a1,1,0,0,0,1,1h2v1.5a1,1,0,0,0,1,1h2.5a1,1,0,0,0,1-1V21.5h2.5a1,1,0,0,0,1-1V20.5a1,1,0,0,0-1-1H16.77a1,1,0,0,0-1,1v1.5h-2V21.5h2a1,1,0,0,0,1-1V20.5A1,1,0,0,0,16.77,18H14.5v-1.9a1,1,0,0,1,1-1h2.77Z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="sr-only">Telegram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
