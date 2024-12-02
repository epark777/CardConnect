import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCards } from '../../redux/cards';
import CardList from '../CardList/CardList';
import './Home.css';

function Home() {
   const sessionUser = useSelector((state) => state.session.user);
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (sessionUser) {
         dispatch(fetchCards())
            .then(() => {
               setLoading(false);
            })
            .catch((err) => {
               console.error('Error fetching cards:', err);
               setLoading(false);
            });
      } else {
         setLoading(false);
      }
   }, [dispatch, sessionUser]);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (sessionUser) {
      return (
         <div className="homepage">
            <div className="homepage-content">
               <h1>Your Business Cards</h1>
               <CardList />
               <div className="homepage-buttons">
                  <NavLink to="/add" className="button signup-button">
                     Add New Card for You
                  </NavLink>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="homepage">
         <div className="homepage-content">
            <h1>Welcome to CardConnect</h1>
            <p>
               Organize, share, and grow your network with digital business
               cards.
            </p>
            <div className="homepage-buttons">
               <NavLink to="/signup" className="button signup-button">
                  Sign Up
               </NavLink>
               <NavLink to="/login" className="button login-button">
                  Log In
               </NavLink>
            </div>
         </div>
      </div>
   );
}

export default Home;