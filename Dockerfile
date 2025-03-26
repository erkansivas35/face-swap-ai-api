FROM node:18

# Install nginx
RUN apt-get update && apt-get install -y nginx

WORKDIR /app

# Set build arguments for environment variables
ARG NODE_ENV
ARG PORT
ARG MONGODBURI
ARG UPLOADS_BASE_URL
ARG REPLICATE_API_KEY
ARG REPLICATE_VERSION

# Copy application files
COPY . .

RUN npm install --only=production

# Create directory for uploaded files
RUN mkdir -p public

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4355
ENV MONGODBURI=${MONGODBURI}
ENV UPLOADS_BASE_URL=https://face-swap-api.erkansivas.xyz/uploads/
ENV REPLICATE_API_KEY=${REPLICATE_API_KEY}
ENV REPLICATE_VERSION=${REPLICATE_VERSION}

# Create startup script
RUN echo '#!/bin/bash\nnginx\npm start' > /app/start.sh
RUN chmod +x /app/start.sh

# Start both nginx and node application
CMD ["/app/start.sh"]

# Expose both nginx and application ports
EXPOSE 80 4355