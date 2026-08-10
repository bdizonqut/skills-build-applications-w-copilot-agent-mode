import React, { useEffect, useState } from 'react';
import { getApiEndpoint, parseApiResponse, normalizeApiData } from '../api.js';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = getApiEndpoint('activities'); // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const result = await parseApiResponse(await fetch(apiEndpoint));
        setActivities(normalizeApiData(result));
      } catch (error_) {
        setError(error_.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <p className="text-muted">Endpoint: {getApiEndpoint('activities')}</p>
      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        Array.isArray(activities) ? (
          <div className="row g-3">
            {activities.map((activity) => (
              <div key={activity._id || activity.id || Math.random()} className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{activity.title || activity.type || 'Activity'}</h5>
                    <p className="card-text">
                      {activity.description || activity.notes || 'No details available.'}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">User: {activity.userId?.name || activity.userId || 'unknown'}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <pre>{JSON.stringify(activities, null, 2)}</pre>
        )
      )}
    </div>
  );
};

export default Activities;
