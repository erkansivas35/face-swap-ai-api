FROM node:18-alpine

WORKDIR /app

# Set build arguments for environment variables
ARG REPLICATE_API_KEY
ARG REPLICATE_VERSION

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Create directory for uploaded files
RUN mkdir -p public

# Set environment variables
ENV NODE_ENV=production
ENV REPLICATE_API_KEY=${REPLICATE_API_KEY}
ENV REPLICATE_VERSION=${REPLICATE_VERSION}

# Expose the application port
EXPOSE 4355

# Start the application
CMD ["npm", "start"]