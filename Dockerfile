# Use the official Node.js 20 image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker cache for dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY ./ ./

# Build the application (if you have a build step)
RUN npm run build

# Expose the port your app is running on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
