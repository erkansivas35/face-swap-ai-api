FROM node:18

WORKDIR /app

# Set build arguments for environment variables
ARG NODE_ENV
ARG PORT
ARG MONGODBURI
ARG UPLOADS_BASE_URL
ARG REPLICATE_API_KEY
ARG REPLICATE_VERSION
ARG JWT_SECRET

# Copy application files
COPY . .

RUN npm install --only=production

# Create directory for uploaded files
RUN mkdir -p public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4355
ENV MONGODBURI=${MONGODBURI}
ENV UPLOADS_BASE_URL=https://face-swap-api.erkansivas.xyz/uploads/
ENV REPLICATE_API_KEY=${REPLICATE_API_KEY}
ENV REPLICATE_VERSION=${REPLICATE_VERSION}
ENV JWT_SECRET=${JWT_SECRET}

# Start the application
CMD ["npm", "start"]

# Expose the application port
EXPOSE 4355