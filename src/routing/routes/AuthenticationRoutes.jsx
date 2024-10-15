import { lazy } from 'react';

// project imports
import Loadable from 'components/ui-component/Loadable';
import MinimalLayout from 'components/layout/MinimalLayout';
import GuardRoute from 'routing/GuardRoute';

// login routing
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register/Register')));
const AuthResetPassword = Loadable(lazy(() => import('pages/authentication/reset-password/AuthResetPassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <GuardRoute element={<MinimalLayout />} />,
  children: [
    {
      path: '/login',
      element: <GuardRoute element={<AuthLogin />} />
    },
    {
      path: '/register',
      element: <GuardRoute element={<AuthRegister />} />
    },
    ,
    {
      path: '/reset-password',
      element: <GuardRoute element={<AuthResetPassword />} />
    }
  ]
};

export default AuthenticationRoutes;
