# NabızKıbrıs News Platform

## 📰 Proje Hakkında

NabızKıbrıs, KKTC (Kuzey Kıbrıs Türk Cumhuriyeti) için geliştirilen modern, hızlı ve güvenilir bir haber platformudur.

### Özellikler

- 🌙 Dark Mode
- 🌐 Multi-language Support (TR, EN, EL)
- 📱 PWA - Progressive Web App
- ⚡ Next.js 14 + TypeScript
- 🎨 Tailwind CSS
- 🔌 WordPress Headless CMS
- 🔔 Push Notifications
- 📊 Offline Support

## 🚀 Hızlı Başlangıç

### 1. Repository Klonlama

```bash
git clone https://github.com/your-username/nabizkibris-frontend.git
cd nabizkibris-frontend
```

### 2. Bağımlılıkları Yükleme

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlama

```bash
cp .env.example .env.local
# .env.local dosyasını düzenle
```

### 4. Geliştirme Sunucusunu Başlatma

```bash
npm run dev
```

Tarayıcıda aç: [http://localhost:3000](http://localhost:3000)

## 📁 Proje Yapısı

```
nabizkibris-frontend/
├── public/                 # Statik dosyalar
│   ├── icons/             # PWA ikonları
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO robots
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Ana layout
│   │   ├── page.tsx      # Ana sayfa
│   │   ├── globals.css   # Global stiller
│   │   └── [lang]/      # Dil klasörleri
│   ├── components/        # React bileşenleri
│   │   ├── ui/          # UI bileşenleri
│   │   ├── news/        # Haber bileşenleri
│   │   └── features/    # Özellik bileşenleri
│   ├── lib/              # Yardımcı fonksiyonlar
│   │   ├── wordpress.ts # WordPress API
│   │   ├── utils.ts     # Util fonksiyonlar
│   │   └── constants.ts # Sabitler
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS stilleri
│   └── types/            # TypeScript tipleri
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 🛠️ Komutlar

| Komut | Açıklama |
|-------|-----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm run start` | Production sunucusu |
| `npm run lint` | Lint kontrolü |
| `npm run format` | Prettier format |
| `npm run type-check` | TypeScript kontrolü |

## 🌐 Dil Desteği

Desteklenen diller:
- 🇹🇷 Türkçe (tr) - Varsayılan
- 🇬🇧 English (en)
- 🇬🇷 Ελληνικά (el)

## 📱 PWA Kurulumu

1. Tarayıcıda adres çubuğunun sağındaki yükle ikonuna tıkla
2. "Uygulama olarak yükle" seçeneğini seç
3. Onay ver

## 🔧 WordPress Entegrasyonu

WordPress tarafı için:
1. WordPress kurulumu yap
2. Aşağıdaki eklentileri yükle:
   - WP REST API (varsayılan)
   - ACF (Advanced Custom Fields)
   - Polylang veya WPML (çoklu dil)
   - Yoast SEO
   - WP Rocket (cache)

## 📊 Performans

Hedef metrikler:
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Lighthouse: > 90

## 📝 Lisans

MIT License

## 👨‍💻 Geliştirici

[Your Name]
