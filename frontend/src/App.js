import React, { useState, useEffect } from 'react';

function App() {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/libraries')
      .then((res) => res.json())
      .then((data) => {
        setLibraries(data);
        if (data.length > 0) {
          setSelectedLibrary(data[0].key);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedLibrary) {
      fetch(`/api/stats/${selectedLibrary}`)
        .then((res) => res.json())
        .then((data) => setStats(data));
    }
  }, [selectedLibrary]);

  return (
    <div>
      <h1>Statarr Plex Stats</h1>
      <select
        value={selectedLibrary || ''}
        onChange={(e) => setSelectedLibrary(e.target.value)}
      >
        {libraries.map((lib) => (
          <option key={lib.key} value={lib.key}>
            {lib.title}
          </option>
        ))}
      </select>
      {stats && (
        <div>
          <p>Total Movies: {stats.total_movies}</p>
          <p>Total Duration (hours): {stats.total_duration.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
