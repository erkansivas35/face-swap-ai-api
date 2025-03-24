FROM node:18

WORKDIR /app

# Set build arguments for environment variables
ARG MONGODBURI
ARG REPLICATE_API_KEY
ARG REPLICATE_VERSION

# Copy application files
COPY . .

RUN npm install

# Create directory for uploaded files
RUN mkdir -p public

# Set environment variables
ENV NODE_ENV=production
ENV MONGODBURI=${MONGODBURI}
ENV REPLICATE_API_KEY=${REPLICATE_API_KEY}
ENV REPLICATE_VERSION=${REPLICATE_VERSION}

# Start the application
CMD ["npm", "start"]

# Expose the application port
EXPOSE 4355