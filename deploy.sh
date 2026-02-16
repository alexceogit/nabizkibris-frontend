#!/bin/bash

# 🚀 NabızKıbrıs - Tam Kurulum & Deployment Scripti

set -e

echo "=========================================="
echo "  NabızKıbrıs - GitHub + Vercel Deployment"
echo "=========================================="
echo ""

# Renkli çıktı
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonksiyon: Bilgi mesajı
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Fonksiyon: Başarı mesajı
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Fonksiyon: Uyarı mesajı
warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Fonksiyon: Hata mesajı
error() {
    echo -e "${RED}❌ $1${NC}"
}

# ==========================================
# ADIM 1: GitHub Repository Oluşturma
# ==========================================
echo ""
echo "📦 ADIM 1: GitHub Repository"
echo "----------------------------"

# GitHub username kontrolü
read -p "GitHub kullanıcı adın: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    error "GitHub kullanıcı adı gerekli!"
    exit 1
fi

REPO_NAME="nabizkibris-frontend"

# GitHub token kontrolü
if [ -z "$GITHUB_TOKEN" ]; then
    warn "GitHub Token bulunamadı!"
    echo ""
    echo "GitHub Token oluşturmak için:"
    echo "1. https://github.com/settings/tokens adresine git"
    echo "2. 'Generate new token (classic)' tıkla"
    echo "3. Note: 'nabizkibris-deploy'"
    echo "4. Scopes: 'repo' seç"
    echo "5. Token'i kopyala"
    echo ""
    read -p "GitHub Token (veya Enter ile geç): " GITHUB_TOKEN
fi

if [ -n "$GITHUB_TOKEN" ]; then
    info "GitHub repository oluşturuluyor..."
    
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/user/repos \
      -d "{\"name\":\"$REPO_NAME\",\"description\":\"NabızKıbrıs News Platform - PWA WordPress Theme\",\"private\":false}")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "422" ]; then
        success "Repository hazır (varsa zaten mevcut)"
    else
        warn "Repository oluşturulamadı, manuel yapılacak"
        echo ""
        echo "Manuel oluştur:"
        echo "1. https://github.com/new"
        echo "2. Repository name: $REPO_NAME"
        echo "3. 'Public' seç"
        echo "4. 'Create repository' tıkla"
    fi
    
    # Remote ekle
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    
    # Push et
    info "GitHub'a push ediliyor..."
    git push -u origin main 2>/dev/null || warn "Push başarısız, manuel yapılacak"
    
    success "GitHub tamamlandı!"
else
    warn "GitHub token yok, sadece local commit yapıldı"
    echo ""
    echo "Manuel GitHub işlemleri:"
    echo "1. https://github.com/new"
    echo "2. Repository name: $REPO_NAME"
    echo "3. 'Create repository' tıkla"
    echo "4. Push komutları:"
    echo "   git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    echo "   git push -u origin main"
fi

echo ""
echo "=========================================="
echo "✅ İLK COMMIT TAMAMLANDI!"
echo "=========================================="
echo ""
echo "📝 YAPILACAKLAR:"
echo ""
echo "1️⃣  VERCEL DEPLOYMENT:"
echo "   → https://vercel.com adresine git"
echo "   → 'Add New Project' tıkla"
echo "   → '$REPO_NAME' reposunu seç"
echo ""
echo "2️⃣  ENVIRONMENT VARIABLES:"
echo "   → Settings → Environment Variables"
echo "   → Aşağıkileri ekle:"
echo ""
echo "   Name: NEXT_PUBLIC_WORDPRESS_API_URL"
echo "   Value: https://your-wordpress-domain.com/wp-json/wp/v2"
echo ""
echo "   Name: NEXT_PUBLIC_SITE_URL"
echo "   Value: https://nabizkibris.com"
echo ""
echo "3️⃣  DEPLOY:"
echo "   → 'Deploy' butonuna tıkla"
echo "   → Preview linki al"
echo ""
echo "🌐 Beklenen preview URL:"
echo "   https://$REPO_NAME.vercel.app"
echo ""
