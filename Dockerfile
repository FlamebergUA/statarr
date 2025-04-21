FROM node:18-slim as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
COPY frontend/public ./public
COPY frontend/src ./src
RUN npm install
RUN npm run build

# Stage 2: Build the Flask backend
FROM python:3.9-slim-buster
WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend .

# Copy built frontend files from the first stage
COPY --from=frontend-builder /app/frontend/build /app/static

# Expose port
EXPOSE 7535

# Set the environment variable
ENV FLASK_APP=app.py

# Start the backend server
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "7535"]