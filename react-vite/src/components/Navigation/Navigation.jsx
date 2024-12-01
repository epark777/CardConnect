import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
   const sessionUser = useSelector((state) => state.session.user);

   console.log("Session user:", sessionUser);

   return (
      <div className="navbar">

         <NavLink to="/" className="logo">
            <span>CardConnect</span>
         </NavLink>


         <div className="right-side">
            {isLoaded ? (
               sessionUser ? (
                  <>
                     <NavLink to="/add" className="create-card-button">
                        Add Business Card
                     </NavLink>
                     <ProfileButton />
                  </>
               ) : (
                  <>
                     <NavLink to="/signup" className="signup-button">
                        Sign Up
                     </NavLink>
                     <NavLink to="/login" className="login-button">
                        Log In
                     </NavLink>
                  </>
               )
            ) : (
               <p>Loading...</p>
            )}
         </div>
      </div>
   );
}

export default Navigation;
