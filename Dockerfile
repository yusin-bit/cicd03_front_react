# Serve the Vite production build with Nginx.
FROM nginx:alpine

COPY ./dist /usr/share/nginx/html

EXPOSE 80
