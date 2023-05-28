# We're running a node application, use node base image from dockerhub
FROM node:18-alpine
# Set base directory
WORKDIR /app
# Copy and install dependencies
COPY package*.json .
RUN npm ci
# Copy server folder
COPY . .
# RUN the application
CMD ["node", "server/app.js"]
# Expose port 5001 so backend is accesible
EXPOSE 5001