FROM node:20-bullseye-slim AS build

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

















# FROM node:20-slim AS build
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --no-audit --no-fund
# COPY . .
# RUN npm run build

# FROM nginx:stable-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
