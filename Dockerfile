# Use Node.js 20 for building
FROM node:20.19.1-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Install envsubst (gettext package) and jq for JSON validation
RUN apk add --no-cache gettext jq

# Copy nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy runtime config templates
COPY config/ /usr/share/nginx/html/config/

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set default environment variables
ENV API_URL=http://localhost:8080/api
ENV APP_NAME="Health Dashboard"
ENV NODE_ENV=production
ENV APP_ENV=dev
ENV COGNITO_USER_POOL_ID=your_user_pool_id
ENV COGNITO_CLIENT_ID=your_client_id
ENV AWS_REGION=ap-south-1

# Expose port
EXPOSE 80

# Use custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]