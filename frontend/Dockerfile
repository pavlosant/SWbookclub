# frontend/Dockerfile

# Base image for Node (using a lightweight Alpine image)
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./

# Use npm ci for a clean and consistent install
RUN npm ci --no-audit --no-fund && npm cache clean --force

# Copy the rest of the app files
COPY . .

# Build the React app for production
RUN npm run build

# Install the `serve` package to serve the build folder
RUN npm install -g serve

# Expose port 3000 for the app
EXPOSE 3000

# Serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]
