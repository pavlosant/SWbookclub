# frontend/Dockerfile

FROM node:16-alpine
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund && npm cache clean --force

# Install 'serve' globally
RUN npm install -g serve@14.2.4

# Copy app files and build the React app
COPY . .
RUN npm run build

# Expose port 3000 for external access
EXPOSE 3000

# Serve the production build
CMD ["serve", "-s", "build", "-l", "3000", "--single"]
