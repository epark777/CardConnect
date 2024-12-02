import { useState } from 'react';
import { thunkLogin } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file

function LoginFormPage() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const sessionUser = useSelector((state) => state.session.user);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState({});

   if (sessionUser) return <Navigate to="/" replace={true} />;

   const handleSubmit = async (e) => {
      e.preventDefault();

      const serverResponse = await dispatch(
         thunkLogin({
            email,
            password,
         }),
      );

      if (serverResponse) {
         setErrors(serverResponse);
      } else {
         navigate('/');
      }
   };

   const handleDemoLogin = async () => {
      const serverResponse = await dispatch(
         thunkLogin({
            email: 'demo@aa.io',
            password: 'password',
         }),
      );

      if (serverResponse) {
         setErrors(Object.values(serverResponse));
      } else {
         navigate('/');
      }
   };

   return (
      <div className="login-page">
         <div className="login-content">
            <h1>Log In</h1>
            {errors.length > 0 &&
               errors.map((message) => (
                  <p key={message} className="error">
                     {message}
                  </p>
               ))}
            <form onSubmit={handleSubmit}>
               <label>
                  Email
                  <input
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </label>
               {errors.email && <p className="error">{errors.email}</p>}
               <label>
                  Password
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </label>
               {errors.password && <p className="error">{errors.password}</p>}
               <button type="submit">Log In</button>
               <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="form-button demo-button"
               >
                  Log in as Demo User
               </button>
            </form>
         </div>
      </div>
   );
}

export default LoginFormPage;
