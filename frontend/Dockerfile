# frontend/Dockerfile

# Base image for Node
FROM node:14

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Copy the React app files and build
COPY . /app/
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]
