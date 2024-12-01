import { NavLink } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>Welcome to CardConnect</h1>
        <p>Organize, share, and grow your network with digital business cards.</p>
        <div className="homepage-buttons">
          <NavLink to="/signup" className="button signup-button">Sign Up</NavLink>
          <NavLink to="/login" className="button login-button">Log In</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;