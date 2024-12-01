import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
   const sessionUser = useSelector((state) => state.session.user);

   return (
      <div className="navbar">
         <NavLink to="/">
            <div>
               <span>CardConnect</span>
            </div>
         </NavLink>

         <div className="right-side">
            {isLoaded && (
               <>
                  {sessionUser ? (
                     <NavLink to="/add" className="create-card-button">
                        Add New Business Card
                     </NavLink>
                  ) : (
                     <NavLink to="/signup" className="signup-button">
                        Sign Up
                     </NavLink>
                  )}
                  <div className="profile-button">
                     <ProfileButton />
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default Navigation;
