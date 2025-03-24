FROM node:18-alpine

WORKDIR /app

# Set build arguments for environment variables
ARG MONGODB_URL
ARG REPLICATE_API_KEY
ARG REPLICATE_VERSION

# Copy package files
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && \
    npm config set registry https://registry.npmjs.org/ && \
    npm install

# Copy application files
COPY . .

# Create directory for uploaded files
RUN mkdir -p public

# Set environment variables
ENV NODE_ENV=production
ENV MONGODB_URL=${MONGODB_URL}
ENV REPLICATE_API_KEY=${REPLICATE_API_KEY}
ENV REPLICATE_VERSION=${REPLICATE_VERSION}

# Expose the application port
EXPOSE 4355

# Start the application
CMD ["npm", "start"]