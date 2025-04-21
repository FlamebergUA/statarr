import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#fff',
    color: '#333',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonActive: {
    backgroundColor: '#0056b3',
  },
  section: {
    marginBottom: '30px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
  },
  card: {
    textAlign: 'center',
    width: '100px',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  barContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    height: '20px',
    marginBottom: '5px',
  },
  bar: {
    height: '100%',
    backgroundColor: '#007bff',
  },
};

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
    <div style={styles.section}>
      <h2>Movies Overview</h2>
      <p>Total Items: {stats.total_movies}</p>
      <p>Total Duration: {Math.round(stats.total_duration)} hours</p>
    </div>
  );

  const renderDirectors = () => (
    <div style={styles.section}>
      <h2>Directors</h2>
      <div style={styles.grid}>
        {stats.directors.map((director) => (
          <div key={director.name} style={styles.card}>
            <img src={director.thumb} alt={director.name} style={styles.image} />
            <div>{director.name}</div>
            <small>{director.count} films</small>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCasts = () => (
    <div style={styles.section}>
      <h2>Casts</h2>
      <div style={styles.grid}>
        {stats.casts.map((cast) => (
          <div key={cast.name} style={styles.card}>
            <img src={cast.thumb} alt={cast.name} style={styles.image} />
            <div>{cast.name}</div>
            <small>{cast.count} films</small>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDecades = () => {
    const maxCount = Math.max(...stats.decades.map((d) => d.count));
    return (
      <div style={styles.section}>
        <h2>Decades</h2>
        {stats.decades.map((decade) => (
          <div key={decade.name}>
            <div>{decade.name}</div>
            <div style={styles.barContainer}>
              <div
                style={{
                  ...styles.bar,
                  width: `${(decade.count / maxCount) * 100}%`,
                  backgroundColor: '#b5651d',
                }}
              />
            </div>
            <small>{decade.count} films</small>
          </div>
        ))}
      </div>
    );
  };

  const renderGenres = () => {
    const maxCount = Math.max(...stats.genres.map((g) => g.count));
    return (
      <div style={styles.section}>
        <h2>Genres</h2>
        {stats.genres.map((genre) => (
          <div key={genre.name}>
            <div>{genre.name}</div>
            <div style={styles.barContainer}>
              <div
                style={{
                  ...styles.bar,
                  width: `${(genre.count / maxCount) * 100}%`,
                  backgroundColor: '#1f4e79',
                }}
              />
            </div>
            <small>{genre.count} films</small>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Statarr Plex Stats</h1>
      <div>
        <label htmlFor="library-select" style={{ fontWeight: 'bold' }}>
          Select Library
        </label>
        <select
          id="library-select"
          value={selectedLibrary || ''}
          onChange={(e) => setSelectedLibrary(e.target.value)}
          style={styles.select}
        >
          {libraries.map((lib) => (
            <option key={lib.key} value={lib.key}>
              {lib.title}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.button, ...(view === 'overview' ? styles.buttonActive : {}) }}
          onClick={() => setView('overview')}
        >
          Overview
        </button>
        <button
          style={{ ...styles.button, ...(view === 'directors' ? styles.buttonActive : {}) }}
          onClick={() => setView('directors')}
        >
          Directors
        </button>
        <button
          style={{ ...styles.button, ...(view === 'casts' ? styles.buttonActive : {}) }}
          onClick={() => setView('casts')}
        >
          Casts
        </button>
        <button
          style={{ ...styles.button, ...(view === 'decades' ? styles.buttonActive : {}) }}
          onClick={() => setView('decades')}
        >
          Decades
        </button>
        <button
          style={{ ...styles.button, ...(view === 'genres' ? styles.buttonActive : {}) }}
          onClick={() => setView('genres')}
        >
          Genres
        </button>
      </div>

      <div>
        {view === 'overview' && renderOverview()}
        {view === 'directors' && renderDirectors()}
        {view === 'casts' && renderCasts()}
        {view === 'decades' && renderDecades()}
        {view === 'genres' && renderGenres()}
      </div>
    </div>
  );
}

export default App;
