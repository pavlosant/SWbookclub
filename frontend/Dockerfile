# frontend/Dockerfile

# Base image for Node
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm ci

RUN npm cache clean --force && npm install --no-audit --no-fund --maxsockets=5

# Copy the React app files and build
COPY . /app/
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]
