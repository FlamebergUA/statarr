FROM python:3.9-slim-buster
WORKDIR /app
RUN apt-get update && apt-get install -y nodejs npm
# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy backend code
COPY backend .
# Install frontend dependencies
COPY ./frontend/package.json frontend/
WORKDIR /app/frontend
# Fix corepack installation issue
RUN npm install -g corepack@latest

# Copy frontend build output
COPY ./frontend/build/ /app
# Expose port
EXPOSE 7535
# Start the backend server
CMD ["python", "app.py"]