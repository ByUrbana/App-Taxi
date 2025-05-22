FROM node:22.10.0-alpine AS build
WORKDIR /app

# Copy package files first to leverage caching when dependencies don't change
COPY ./package.json ./package-lock.json ./
COPY ./decorate-angular-cli.js ./nx.json ./tsconfig.base.json ./

# Install dependencies
RUN npm ci --force

# Copy only necessary source files
COPY ./libs/database ./libs/database
COPY ./apps/driver-api ./apps/driver-api

RUN npx nx build driver-api --prod

FROM node:22.10.0-alpine
WORKDIR /app

# Copy package.json and install only production dependencies in one layer
COPY --from=build /app/dist/apps/driver-api/package.json /app/package-lock.json ./
RUN npm ci --only=production && \
    npm i mysql core-js

# Copy built application
COPY --from=build /app/dist/apps/driver-api ./

EXPOSE 3002
CMD ["node", "main.js"]