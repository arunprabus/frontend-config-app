#!/bin/sh

# Exit on any error
set -e

echo "🚀 Starting frontend entrypoint script..."

# Set default APP_ENV if not provided
APP_ENV=${APP_ENV:-dev}

# Define paths
CONFIG_DIR="/usr/share/nginx/html/config"
TEMPLATE_FILE="$CONFIG_DIR/runtime-config.${APP_ENV}.json"
OUTPUT_FILE="/usr/share/nginx/html/assets/runtime-config.json"
HTML_FILE="/usr/share/nginx/html/index.html"

echo "📝 Environment variables:"
echo "  APP_ENV: ${APP_ENV}"
echo "  API_URL: ${API_URL}"
echo "  APP_NAME: ${APP_NAME}"
echo "  NODE_ENV: ${NODE_ENV}"
echo "  COGNITO_USER_POOL_ID: ${COGNITO_USER_POOL_ID}"
echo "  COGNITO_CLIENT_ID: ${COGNITO_CLIENT_ID}"
echo "  AWS_REGION: ${AWS_REGION}"

# Create assets directory if it doesn't exist
mkdir -p /usr/share/nginx/html/assets

# Check if environment-specific template exists
if [ ! -f "$TEMPLATE_FILE" ]; then
  echo "❌ Error: Template file not found at $TEMPLATE_FILE"
  echo "📁 Available config files:"
  ls -la "$CONFIG_DIR/" || echo "Config directory not found"
  exit 1
fi

echo "📋 Using template: $TEMPLATE_FILE"

# Generate runtime config from environment variables
envsubst < "$TEMPLATE_FILE" > "$OUTPUT_FILE"

echo "✅ Runtime config generated successfully:"
cat "$OUTPUT_FILE"

# Verify the config file was created and is valid JSON
if [ ! -f "$OUTPUT_FILE" ]; then
  echo "❌ Error: Failed to generate runtime config file"
  exit 1
fi

# Test if the generated file is valid JSON
if ! cat "$OUTPUT_FILE" | jq . > /dev/null 2>&1; then
  echo "⚠️  Warning: Generated config may not be valid JSON"
  echo "Content:"
  cat "$OUTPUT_FILE"
else
  echo "✅ Generated config is valid JSON"
fi

# Update HTML file with environment variables if needed
if [ -f "$HTML_FILE" ]; then
  echo "🔧 Updating HTML title..."
  sed -i "s|<title[^>]*>.*</title>|<title>${APP_NAME} - ${APP_ENV}</title>|g" "$HTML_FILE"
fi

# Set proper permissions
chmod 644 "$OUTPUT_FILE"

echo "📁 Final assets directory contents:"
ls -la /usr/share/nginx/html/assets/

echo "🎯 Configuration complete for environment: ${APP_ENV}"
echo "🌐 Starting nginx..."

# Execute the main command
exec "$@"