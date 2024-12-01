import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute() {
   const sessionUser = useSelector((state) => state.session.user);

   if (!sessionUser) {
      return <Navigate to="/" />;
   }

   return <Outlet />;
}
