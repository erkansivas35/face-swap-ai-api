# Face Swap AI

This project is a RESTful API powered by artificial intelligence that performs face-swapping operations using Replicate's API. Built with Node.js and Express.js, it provides secure and rate-limited endpoints for face swapping operations.

## Features

- Face swapping using Replicate's AI API
- RESTful API endpoints
- Rate limiting protection
- File upload with size and type validation
- Comprehensive error handling
- MongoDB integration for data persistence

## Technologies

- Node.js
- Express.js
- MongoDB (data storage)
- Multer (file upload handling)
- Replicate API (AI face swapping)
- Express Rate Limit
- CORS enabled
- Environment configuration with dotenv

## Installation

1. Clone the project:
```bash
git clone [project-url]
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following environment variables in your .env file:

```env
# Server Configuration
PORT=4355
NODE_ENV=development

# MongoDB Configuration
MONGODBURI=your_mongodb_connection_string

# Replicate API Configuration
REPLICATE_API_KEY=your_replicate_api_key
REPLICATE_VERSION=your_replicate_version

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

## Development

Start the development server:
```bash
npm run dev
```

Start production server:
```bash
npm start
```

Run tests:
```bash
npm test
```

Lint check:
```bash
npm run lint
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- Window: 15 minutes (configurable via RATE_LIMIT_WINDOW)
- Max requests: 100 per window (configurable via RATE_LIMIT_MAX)

## File Upload Restrictions

- Maximum file size: 5MB
- Allowed file types: JPEG, JPG, PNG

## Docker Support

The project includes Docker support for containerized deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Deployment

The project includes GitHub Actions workflow for automated deployment. Configure your deployment secrets in GitHub repository settings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.