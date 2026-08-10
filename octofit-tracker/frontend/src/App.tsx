import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="lead">React 19 + Vite presentation tier with Codespaces-aware API routing.</p>
          <div className="alert alert-secondary">
            <strong>API host:</strong> {import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev` : 'http://localhost:8000'}
          </div>
          <nav className="nav nav-pills flex-column flex-sm-row gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<div><h2>Welcome</h2><p>Use the navigation above to explore the OctoFit Tracker API data.</p></div>} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<div><h2>Page not found</h2><p>The requested route does not exist.</p></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
