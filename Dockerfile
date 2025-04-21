FROM python:3.9-slim-buster

WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend .

# Copy built frontend files
COPY frontend/build/ /app/static

# Expose port
EXPOSE 7535

# Set the environment variable
ENV FLASK_APP=app.py

# Start the backend server
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "7535"]