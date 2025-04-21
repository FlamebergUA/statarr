from flask import Flask, jsonify, send_from_directory
from dotenv import load_dotenv
import os
import requests
import xml.etree.ElementTree as ET

app = Flask(__name__, static_folder="static", static_url_path="")

load_dotenv()

PLEX_API_KEY = os.getenv("PLEX_API_KEY")
PLEX_SERVER_URL = os.getenv("PLEX_SERVER_URL")

@app.route("/api/libraries")
def get_libraries():
    try:
        headers = {"X-Plex-Token": PLEX_API_KEY}
        response = requests.get(f"{PLEX_SERVER_URL}/library/sections", headers=headers)
        response.raise_for_status()
        xml_data = response.text
        root = ET.fromstring(xml_data)
        libraries = [{"key": section.attrib["key"], "title": section.attrib["title"]} for section in root.findall(".//Directory")]
        return jsonify(libraries)
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Plex server: {e}")
        return jsonify([{"title": "Error connecting to Plex server"}])

@app.route("/api/stats/<library_key>")
def get_stats(library_key):
    try:
        headers = {"X-Plex-Token": PLEX_API_KEY}
        response = requests.get(f"{PLEX_SERVER_URL}/library/sections/{library_key}/all", headers=headers)
        response.raise_for_status()
        xml_data = response.text
        root = ET.fromstring(xml_data)
        movies = root.findall(".//Video")
        total_movies = len(movies)
        total_duration = sum(int(movie.attrib.get("duration", 0)) for movie in movies) / (60 * 60 * 1000)  # in hours

        return jsonify({"total_movies": total_movies, "total_duration": total_duration})
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Plex server: {e}")
        return jsonify({"error": "Error connecting to Plex server"})

@app.route("/")
def index():
    return send_from_directory(app.root_path, "static/index.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=7535)