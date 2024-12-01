import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {
   const sessionUser = useSelector((state) => state.session.user);

   return (
      <div className="homepage">
         <h1>Welcome to CardConnect!</h1>
         {!sessionUser ? (
            <div>
               <p>Sign up to create and manage your business cards!</p>
               <div>
                  <NavLink to="/signup" className="signup-button">
                     Sign Up
                  </NavLink>
                  <NavLink to="/login" className="login-button">
                     Log In
                  </NavLink>
               </div>
            </div>
         ) : (
            <div>
               <p>Welcome back, {sessionUser.username}!</p>
               <NavLink to="/cards" className="dashboard-button">
                  Go to Your Cards
               </NavLink>
            </div>
         )}
      </div>
   );
};

export default HomePage;
