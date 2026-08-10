import React, { useEffect, useState } from 'react';
import { getApiEndpoint, parseApiResponse, normalizeApiData } from '../api.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = getApiEndpoint('users'); // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await parseApiResponse(await fetch(apiEndpoint));
        setUsers(normalizeApiData(result));
      } catch (error_) {
        setError(error_.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <p className="text-muted">Endpoint: {getApiEndpoint('users')}</p>
      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        Array.isArray(users) ? (
          <div className="list-group">
            {users.map((user) => (
              <div key={user._id || user.id || Math.random()} className="list-group-item">
                <h5>{user.name || user.email || 'User'}</h5>
                <p className="mb-1">Role: {user.role || 'member'}</p>
                <small className="text-muted">Email: {user.email || 'N/A'}</small>
              </div>
            ))}
          </div>
        ) : (
          <pre>{JSON.stringify(users, null, 2)}</pre>
        )
      )}
    </div>
  );
};

export default Users;
