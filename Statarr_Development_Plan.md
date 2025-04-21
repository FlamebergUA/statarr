# Statarr App Deployment

## Option 1: Docker Compose

1.  Install Docker and Docker Compose.
2.  Clone the repository: `git clone https://github.com/FlamebergUA/statarr` (This is a placeholder URL, replace with the actual repository if you create one).
3.  Navigate to the `docker` directory: `cd docker`
4.  Create a `.env` file in the `backend` directory and set the `PLEX_API_KEY` and `PLEX_SERVER_URL` environment variables.
5.  Run `docker-compose up --build` to build and start the application.
6.  Access the application at `http://localhost:7535`.

## Option 2: Portainer - Copy/Paste Stack Deployment

Copy the following content into the "Compose content" section in Portainer:

```yaml
# App URL: https://github.com/FlamebergUA/statarr
# App Name: Statarr
# Container Name: statarr
version: "3.9"
services:
  statarr:
    container_name: statarr
    image: ghcr.io/flamebergua/statarr:latest
    ports:
      - "7535:80"  # Changed target port to 80 as nginx serves on 80 by default
    volumes:
      - ./backend:/app/backend
      - ./frontend:/app/frontend
    environment:
      - PLEX_API_KEY=${PLEX_API_KEY}
      - PLEX_SERVER_URL=${PLEX_SERVER_URL}
```

1.  Set the `PLEX_API_KEY` and `PLEX_SERVER_URL` environment variables in the "Environment variables" section.
2.  Deploy the stack.
3.  Access the application at `http://localhost:7535`.