FROM python:3.9-slim-buster

WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend .

# Install frontend dependencies
COPY ../frontend/package*.json frontend/
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Copy frontend build output
COPY frontend/build /app/static
COPY frontend/public/index.html /app/static

# Expose port
EXPOSE 7535

# Start the backend server
CMD ["python", "app.py"]