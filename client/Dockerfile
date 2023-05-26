# We're running a node application, use node base image from dockerhub
FROM node:18-alpine
# Set base directory
WORKDIR /app
# Copy and install dependencies
# NOTE: client and server share package.json file
COPY package*.json .
RUN npm ci
RUN npm install react-scripts@3.4.1 -g
# Copy folder
COPY . .
# RUN the application
CMD ["npm", "start"]
EXPOSE 3000