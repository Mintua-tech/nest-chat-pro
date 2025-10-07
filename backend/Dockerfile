FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build NestJS app
RUN npm run build

# Install pm2 globally
RUN npm install -g pm2@5

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
















# FROM node:20-slim


# WORKDIR /usr/src/app

# # install dependencies
# COPY package.json package-lock.json* ./
# RUN npm ci --no-audit --no-fund

# # copy prisma schema and generate client
# RUN apt-get update -y && apt-get install -y openssl
# COPY prisma ./prisma
# RUN npx prisma generate

# # copy source
# COPY tsconfig.json ./
# COPY src ./src

# # build
# RUN npm run build

# # install pm2-runtime globally
# RUN npm install -g pm2@5

# # expose
# EXPOSE 3000

# # use pm2-runtime to run in cluster mode (pm2 will spawn max CPUs)
# CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
