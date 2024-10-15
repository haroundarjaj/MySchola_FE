import { lazy } from 'react';

import Loadable from 'components/ui-component/Loadable';
import MainLayout from 'components/layout/MainLayout';
import PrivateRoute from 'routing/PrivateRoute';

const NotFound = Loadable(lazy(() => import('pages/404')));
const Unauthorized = Loadable(lazy(() => import('pages/403')));

const OtherRoutes = {
  path: '/',
  element: <PrivateRoute element={<MainLayout />} />,
  children: [
    {
      path: '/403',
      element: <PrivateRoute element={<Unauthorized />} />,
    }
    ,
    {
      path: '*',
      element: <PrivateRoute element={<NotFound />} />,
    }
  ]
};

export default OtherRoutes;
