import React, { useEffect, useState } from 'react';
import { getApiEndpoint, parseApiResponse, normalizeApiData } from '../api.js';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = getApiEndpoint('workouts'); // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const result = await parseApiResponse(await fetch(apiEndpoint));
        setWorkouts(normalizeApiData(result));
      } catch (error_) {
        setError(error_.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <p className="text-muted">Endpoint: {getApiEndpoint('workouts')}</p>
      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        Array.isArray(workouts) ? (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div key={workout._id || workout.id || Math.random()} className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{workout.title || workout.type || 'Workout'}</h5>
                    <p className="card-text">{workout.description || workout.notes || 'No details available.'}</p>
                    <p className="card-text">
                      <small className="text-muted">User: {workout.userId?.name || workout.userId || 'unknown'}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <pre>{JSON.stringify(workouts, null, 2)}</pre>
        )
      )}
    </div>
  );
};

export default Workouts;
