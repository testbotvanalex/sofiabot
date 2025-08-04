#!/bin/bash

NAME="small-20250801-083437"
ZONE="us-central1-a"
IMAGE="debian-12-bookworm-v20240610"
PROJECT="spry-guru-463518-q3"
TAG="webhook-server"

echo "🧹 Удаляем старую виртуальную машину..."
gcloud compute instances delete "$NAME" --zone="$ZONE" --quiet

echo "🚀 Создаём новую виртуальную машину..."
gcloud compute instances create "$NAME" \
  --zone="$ZONE" \
  --image-family=debian-12 \
  --image-project=debian-cloud \
  --tags="$TAG" \
  --machine-type=e2-medium \
  --boot-disk-size=30GB \
  --metadata=startup-script='#!/bin/bash
    sudo apt update -y
    sudo apt install -y curl git nodejs npm
    npm install -g pm2
    echo "✅ Готово"
  '

echo "🌐 Настраиваем firewall (если не настроен)..."
gcloud compute firewall-rules create allow-webhook \
  --allow tcp:7777 \
  --source-ranges=0.0.0.0/0 \
  --target-tags="$TAG" \
  --description="Allow incoming webhook traffic on port 7777" || true

echo "🔐 Подключаемся по SSH..."
gcloud compute ssh "$USER@$NAME" --zone="$ZONE"