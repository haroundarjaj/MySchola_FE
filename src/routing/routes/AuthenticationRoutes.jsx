import { lazy } from 'react';

// project imports
import Loadable from 'components/ui-component/Loadable';
import MinimalLayout from 'components/layout/MinimalLayout';
import GuardRoute from 'routing/GuardRoute';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

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
    }
  ]
};

export default AuthenticationRoutes;
