# 🚀 NABIZKIBRIS PROJESİ - KURULUM KILAVUZU

## 1. GitHub Repository Oluştur

```bash
# GitHub'da yeni bir repository oluştur: nabizkibris-frontend

# Lokalde clone et
git clone https://github.com/SENI-KULLANICI-ADINIZ/nabizkibris-frontend.git
cd nabizkibris-frontend

# Dosyaları kopyala
# (Tüm dosyaları bu repo'nun içine kopyala)
```

## 2. Vercel ile Bağlantı

### Adım 1: Vercel Hesabı
1. https://vercel.com adresine git
2. GitHub ile giriş yap
3. "Add New Project" tıkla

### Adım 2: Proje Ekleme
1. GitHub repository'yi seç
2. "Import" tıkla
3. Aşağıdaki ayarları yap:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Adım 3: Environment Variables
Vercel dashboard'da:
1. Settings → Environment Variables
2. Aşağıdaki değişkenleri ekle:

```
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-domain.com/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=https://nabizkibris.com
```

## 3. Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Tarayıcıda aç: http://localhost:3000
```

## 4. WordPress Kurulumu (Ayrı)

WordPress için ayrı bir hosting alman gerekiyor:

### Önerilen Hosting: Cloudways
- WordPress özel optimize
- Fiyat: $10-25/ay
- 1 tıklamayla kurulum

### Alternatif: Hetzner Cloud
- €5-15/ay (VPS)
- WordOps ile kurulum

## 5. Deployment

### Otomatik Deploy (GitHub Actions)
1. GitHub → Settings → Secrets
2. Aşağıdaki secrets'ları ekle:
   - `VERCEL_TOKEN`: Vercel token
   - `VERCEL_ORG_ID`: Organization ID
   - `VERCEL_PROJECT_ID`: Project ID

### Manuel Deploy
```bash
# Vercel CLI kur
npm i -g vercel

# Deploy et
vercel --prod
```

## 6. Kontrol Listesi

- [ ] GitHub repo oluşturuldu
- [ ] Tüm dosyalar push edildi
- [ ] Vercel projesi bağlandı
- [ ] Environment variables eklendi
- [ ] Build başarılı
- [ ] Preview link çalışıyor

## 📞 Destek

Sorun yaşarsan:
1. README.md dosyasını kontrol et
2. Issues aç
3. Hata mesajını paylaş
