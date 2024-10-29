# frontend/Dockerfile

# Base image for Node (using a lightweight Alpine image)
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./

# Use npm ci for a clean and efficient installation
RUN npm ci --no-audit --no-fund && npm cache clean --force

# Copy the remaining app files after dependencies are installed
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 for the React app
EXPOSE 3000

# Serve the built app using a production server like serve
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
