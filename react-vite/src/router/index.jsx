import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AddCardForm from '../components/AddCardForm';
import EditCardForm from '../components/EditCardForm';
import CardList from '../components/CardList/CardList';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../components/Home/Home';

export const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: '/',
            element: <HomePage />,
         },
         {
            path: 'login',
            element: <LoginFormPage />,
         },
         {
            path: 'signup',
            element: <SignupFormPage />,
         },
         {
            element: <ProtectedRoute />,
            children: [
               {
                  path: '/cards',
                  element: <CardList />,
               },
               {
                  path: 'add',
                  element: <AddCardForm />,
               },
               {
                  path: 'edit/:cardId',
                  element: <EditCardForm />,
               },
            ],
         },
      ],
   },
]);
