# frontend/Dockerfile

FROM node:16-alpine
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package.json package-lock.json ./

# Install dependencies and clean cache
RUN npm ci --no-audit --no-fund && npm cache clean --force

# Install the serve package globally
RUN npm install -g serve@14.2.4

# Copy the rest of the app files
COPY . .

# Build the app for production
RUN npm run build

# Expose port 3000 for external access
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "3000", "--single"]