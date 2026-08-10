import React, { useEffect, useState } from 'react';
import { getApiEndpoint, parseApiResponse, normalizeApiData } from '../api.js';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = getApiEndpoint('leaderboard'); // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const result = await parseApiResponse(await fetch(apiEndpoint));
        setEntries(normalizeApiData(result));
      } catch (error_) {
        setError(error_.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <p className="text-muted">Endpoint: {getApiEndpoint('leaderboard')}</p>
      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        Array.isArray(entries) ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Calories</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id || entry.id || Math.random()}>
                    <td>{entry.rank ?? '-'}</td>
                    <td>{entry.userId?.name || entry.userId || 'unknown'}</td>
                    <td>{entry.teamId?.name || entry.teamId || 'N/A'}</td>
                    <td>{entry.totalCalories ?? 0}</td>
                    <td>{entry.totalDistance ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <pre>{JSON.stringify(entries, null, 2)}</pre>
        )
      )}
    </div>
  );
};

export default Leaderboard;
