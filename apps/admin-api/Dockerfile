FROM node:22.10.0-alpine AS build
WORKDIR /app

# Copy package files first to leverage caching when dependencies don't change
COPY ./package.json ./package-lock.json ./
COPY ./decorate-angular-cli.js ./nx.json ./tsconfig.base.json ./

# Install dependencies
RUN npm ci --force

# Copy only necessary source files
COPY ./libs/database ./libs/database
COPY ./apps/admin-api ./apps/admin-api

RUN npx nx build admin-api --prod

FROM node:22.10.0-alpine
WORKDIR /app

# Copy package.json and install only production dependencies in one layer
COPY --from=build /app/dist/apps/admin-api/package.json /app/package-lock.json ./

# Install production dependencies
RUN npm ci --only=production && \
    npm i mysql core-js

# Copy built application
COPY --from=build /app/dist/apps/admin-api ./

EXPOSE 3000
CMD ["node", "main.js"]