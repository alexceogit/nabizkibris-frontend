#!/bin/bash

# 🚀 NabızKıbrıs GitHub + Vercel Kurulum Scripti

echo "==================================="
echo "  NabızKıbrıs GitHub Kurulumu"
echo "==================================="
echo ""

# Renkli çıktı
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# GitHub username sor
read -p "GitHub kullanıcı adın nedir? " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${YELLOW}⚠️ GitHub kullanıcı adı gerekli!${NC}"
    exit 1
fi

# Repo name
REPO_NAME="nabizkibris-frontend"

echo ""
echo "📦 GitHub repository oluşturuluyor..."
echo ""

# GitHub API ile repo oluştur
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"NabızKıbrıs News Platform - PWA WordPress Theme\",\"private\":false,\"auto_init\":false}"

echo ""
echo "🔗 Remote ekleniyor..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo ""
echo "📤 GitHub'a push ediliyor..."
git push -u origin main

echo ""
echo "==================================="
echo "✅ GitHub hazır!"
echo "==================================="
echo ""
echo "📝 Sonraki adımlar:"
echo "1. https://vercel.com adresine git"
echo "2. 'Add New Project' tıkla"
echo "3. '$REPO_NAME' reposunu seç"
echo "4. Environment variables ekle:"
echo "   - NEXT_PUBLIC_WORDPRESS_API_URL"
echo "   - NEXT_PUBLIC_SITE_URL"
echo "5. Deploy bekleyin"
echo ""
echo "🌐 Vercel preview linki:"
echo "https://$REPO_NAME-$GITHUB_USERNAME.vercel.app"
echo ""
