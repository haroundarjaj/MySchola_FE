# Use an Nginx image to serve the static build
FROM nginx:alpine

# Copy the local build output to the Nginx HTML directory
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]