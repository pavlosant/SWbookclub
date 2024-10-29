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
# frontend/Dockerfile

FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund && npm cache clean --force

# Copy app files and build the app
COPY . .
RUN npm run build

# Install serve to serve the production build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Use a rewrites rule to handle routing for client-side paths
CMD ["serve", "-s", "build", "-l", "3000", "--single"]