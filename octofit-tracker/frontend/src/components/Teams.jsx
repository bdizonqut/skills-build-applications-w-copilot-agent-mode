import React, { useEffect, useState } from 'react';
import { getApiEndpoint, parseApiResponse, normalizeApiData } from '../api.js';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = getApiEndpoint('teams'); // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const result = await parseApiResponse(await fetch(apiEndpoint));
        setTeams(normalizeApiData(result));
      } catch (error_) {
        setError(error_.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <p className="text-muted">Endpoint: {getApiEndpoint('teams')}</p>
      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        Array.isArray(teams) ? (
          <div className="row g-3">
            {teams.map((team) => (
              <div key={team._id || team.id || Math.random()} className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{team.name || 'Team'}</h5>
                    <p className="card-text">Members: {team.members?.length ?? 'N/A'}</p>
                    <p className="card-text">Created by: {team.createdBy?.name || team.createdBy || 'unknown'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <pre>{JSON.stringify(teams, null, 2)}</pre>
        )
      )}
    </div>
  );
};

export default Teams;
