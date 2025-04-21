from flask import Flask, jsonify
from dotenv import load_dotenv
import os
import requests

app = Flask(__name__, static_folder='static')
load_dotenv()

PLEX_API_KEY = os.getenv("PLEX_API_KEY")
PLEX_SERVER_URL = os.getenv("PLEX_SERVER_URL")

@app.route('/api/libraries')
def get_libraries():
    try:
        headers = {"X-Plex-Token": PLEX_API_KEY}
        response = requests.get(f"{PLEX_SERVER_URL}/library/sections", headers=headers)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        xml_data = response.text
        # Parse XML data to extract library names
        import xml.etree.ElementTree as ET
        root = ET.fromstring(xml_data)
        libraries = [section.attrib['title'] for section in root.findall('.//Directory')]
        return jsonify(libraries)
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Plex server: {e}")
        return jsonify(["Error connecting to Plex server"])

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7535)