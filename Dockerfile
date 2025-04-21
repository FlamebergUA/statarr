FROM python:3.9-slim-buster

WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend .

# Expose port
EXPOSE 7535

# Start the backend server
CMD ["python", "app.py"]