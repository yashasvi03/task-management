# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package.json ./
COPY tsconfig.json ./
COPY . .

RUN npm install
RUN npm run build

# Expose the port Railway uses
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
