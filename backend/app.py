from flask import Flask, jsonify
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

PLEX_API_KEY = os.getenv("PLEX_API_KEY")
PLEX_SERVER_URL = os.getenv("PLEX_SERVER_URL")

@app.route('/api/libraries')
def get_libraries():
    # TODO: Implement Plex API integration to fetch libraries
    libraries = ["Movies", "TV Shows", "Music"]  # Placeholder data
    return jsonify(libraries)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7535)