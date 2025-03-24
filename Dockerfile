FROM node:latest

WORKDIR /app

# Set build arguments for environment variables
ARG MONGODB_URL
ARG REPLICATE_API_KEY
ARG REPLICATE_VERSION

# Copy application files
COPY . .

RUN npm install

# Create directory for uploaded files
RUN mkdir -p public

# Set environment variables
ENV NODE_ENV=production
ENV MONGODB_URL=${MONGODB_URL}
ENV REPLICATE_API_KEY=${REPLICATE_API_KEY}
ENV REPLICATE_VERSION=${REPLICATE_VERSION}

# Start the application
CMD ["npm", "start"]

# Expose the application port
EXPOSE 4355