# Yüz Değiştirme API Projesi

Bu proje, yapay zeka destekli yüz değiştirme işlemlerini gerçekleştiren bir RESTful API'dir. Node.js kullanılarak geliştirilmiştir ve fotoğraflardaki yüzleri otomatik olarak tespit edip değiştirme işlemini gerçekleştirir.

## Özellikler

- Fotoğraflarda yüz tespiti
- Yüz değiştirme işlemi
- RESTful API endpoints
- Yüksek doğruluk oranı
- Hızlı işlem süresi
- Güvenli dosya yükleme
- Detaylı hata yönetimi

## Teknolojiler

- Node.js
- Express.js
- Multer (dosya yükleme)
- JWT (kimlik doğrulama)
- MongoDB (veri depolama)
- Üçüncü Parti AI API Entegrasyonu

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [proje-url]
cd face-swap-api
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Çevre değişkenlerini ayarlayın:
```bash
cp .env.example .env
# .env dosyasını düzenleyin ve AI API anahtarınızı ekleyin
```

4. Projeyi başlatın:
```bash
npm start
```

## API Endpoints

### Yüz Değiştirme
`POST /api/swap-faces`

**Request:**
- Content-Type: multipart/form-data
- Headers:
  - X-API-Key: API anahtarınız
- Body:
  - sourceImage: Kaynak yüz fotoğrafı
  - targetImage: Hedef fotoğraf

**Response:**
```json
{
  "success": true,
  "data": {
    "resultImageUrl": "https://[domain]/results/processed-image.jpg",
    "processingTime": "2.3s",
    "quality": "high"
  }
}
```

### Hata Yanıtları
```json
{
  "success": false,
  "error": {
    "code": "FACE_NOT_DETECTED",
    "message": "Fotoğrafta yüz tespit edilemedi"
  }
}
```

## Hata Kodları

- `FACE_NOT_DETECTED`: Fotoğrafta yüz bulunamadı
- `MULTIPLE_FACES`: Birden fazla yüz tespit edildi
- `INVALID_IMAGE`: Geçersiz görüntü formatı
- `PROCESSING_ERROR`: İşlem sırasında hata oluştu
- `API_KEY_INVALID`: Geçersiz API anahtarı
- `RATE_LIMIT_EXCEEDED`: API kullanım limiti aşıldı

## Güvenlik

- API anahtarı ile kimlik doğrulama
- Rate limiting
- Dosya boyutu ve format kontrolü
- CORS politikası

## Performans Optimizasyonu

- Bulut tabanlı işlem gücü
- Akıllı önbellekleme sistemi
- İşlem kuyruğu yönetimi
- Otomatik ölçeklendirme
- CDN entegrasyonu

## API Kullanım Limitleri

- Ücretsiz plan: 100 işlem/gün
- Temel plan: 1000 işlem/gün
- Premium plan: 10000 işlem/gün

## Geliştirme

```bash
# Geliştirme modunda başlatma
npm run dev

# Test çalıştırma
npm test

# Lint kontrolü
npm run lint
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

Sorularınız için [email@domain.com] adresinden iletişime geçebilirsiniz.