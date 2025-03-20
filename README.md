# Child Book AI

This project is a RESTful API powered by artificial intelligence that performs face-swapping operations. Developed using Node.js, it automatically detects and swaps faces in photographs with high accuracy.

## Features

- Face detection in photos
- Face swapping process
- RESTful API endpoints
- High accuracy rate
- Fast processing time
- Secure file upload
- Detailed error handling

## Technologies

- Node.js
- Express.js
- Multer (file upload)
- JWT (authentication)
- MongoDB (data storage)
- Third Party AI API Integration

## Installation

1. Clone the project:
```bash
git clone [project-url]
cd child-book-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit the .env file and add your AI API key
```

4. Start the project:
```bash
npm start
```

## API Endpoints

### Face Swapping
`POST /api/swap-faces`

**Request:**
- Content-Type: multipart/form-data
- Headers:
  - X-API-Key: Your API key
- Body:
  - sourceImage: Source face photo
  - targetImage: Target photo

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

### Error Responses
```json
{
  "success": false,
  "error": {
    "code": "FACE_NOT_DETECTED",
    "message": "No face detected in the photo"
  }
}
```

## Error Codes

- `FACE_NOT_DETECTED`: No face found in the photo
- `MULTIPLE_FACES`: Multiple faces detected
- `INVALID_IMAGE`: Invalid image format
- `PROCESSING_ERROR`: Error during processing
- `API_KEY_INVALID`: Invalid API key
- `RATE_LIMIT_EXCEEDED`: API usage limit exceeded

## Security

- API key authentication
- Rate limiting
- File size and format validation
- CORS policy

## Performance Optimization

- Cloud-based processing power
- Smart caching system
- Process queue management
- Auto-scaling
- CDN integration

## API Usage Limits

- Free plan: 100 operations/day
- Basic plan: 1000 operations/day
- Premium plan: 10000 operations/day

## Development

```bash
# Start in development mode
npm run dev

# Run tests
npm test

# Lint check
npm run lint
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions, please contact [email@domain.com].