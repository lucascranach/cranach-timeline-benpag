FROM node:lts-alpine

# Install simple http server for serving static content
RUN npm install -g http-server

# Create app directory
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build app for production with minification
RUN npm run build

# Expose port 8000
EXPOSE 8080

# Run frontend
CMD [ "http-server", "dist" ]
