# Stage 1: Build frontend
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build backend
FROM node:18 AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Copy frontend build into backend public folder
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 5000
CMD ["node", "server.js"]
