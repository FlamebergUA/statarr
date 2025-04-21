import React, { useState, useEffect } from 'react';

function App() {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [stats, setStats] = useState(null);
  const [view, setView] = useState('overview');

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

  if (!stats) {
    return <div>Loading...</div>;
  }

  const renderOverview = () => (
    <div>
      <h2>Movies Overview</h2>
      <p>Total Items: {stats.total_movies}</p>
      <p>Total Duration: {Math.round(stats.total_duration)} hours</p>
    </div>
  );

  const renderDirectors = () => (
    <div>
      <h2>Directors</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {stats.directors.map((director) => (
          <div key={director.name} style={{ textAlign: 'center', width: '100px' }}>
            <img
              src={director.thumb}
              alt={director.name}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>{director.name}</div>
            <small>{director.count} films</small>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCasts = () => (
    <div>
      <h2>Casts</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {stats.casts.map((cast) => (
          <div key={cast.name} style={{ textAlign: 'center', width: '100px' }}>
            <img
              src={cast.thumb}
              alt={cast.name}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>{cast.name}</div>
            <small>{cast.count} films</small>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDecades = () => (
    <div>
      <h2>Decades</h2>
      <ul>
        {stats.decades.map((decade) => (
          <li key={decade.name}>
            {decade.name}: {decade.count} films
          </li>
        ))}
      </ul>
    </div>
  );

  const renderGenres = () => (
    <div>
      <h2>Genres</h2>
      <ul>
        {stats.genres.map((genre) => (
          <li key={genre.name}>
            {genre.name}: {genre.count} films
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#fff', color: '#333' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Statarr Plex Stats</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <label htmlFor="library-select" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Select Library
        </label>
        <select
          id="library-select"
          value={selectedLibrary || ''}
          onChange={(e) => setSelectedLibrary(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          {libraries.map((lib) => (
            <option key={lib.key} value={lib.key}>
              {lib.title}
            </option>
          ))}
        </select>

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setView('overview')} style={{ marginRight: '10px' }}>
            Overview
          </button>
          <button onClick={() => setView('directors')} style={{ marginRight: '10px' }}>
            Directors
          </button>
          <button onClick={() => setView('casts')} style={{ marginRight: '10px' }}>
            Casts
          </button>
          <button onClick={() => setView('decades')} style={{ marginRight: '10px' }}>
            Decades
          </button>
          <button onClick={() => setView('genres')}>Genres</button>
        </div>

        <div style={{ marginTop: '20px' }}>
          {view === 'overview' && renderOverview()}
          {view === 'directors' && renderDirectors()}
          {view === 'casts' && renderCasts()}
          {view === 'decades' && renderDecades()}
          {view === 'genres' && renderGenres()}
        </div>
      </div>
    </div>
  );
}

export default App;
