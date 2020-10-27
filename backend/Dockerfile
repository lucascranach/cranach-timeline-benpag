FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Run importer
RUN npm run import

# Expose port 3000
EXPOSE 3000

# Run backend
CMD [ "npm", "run", "start"]
