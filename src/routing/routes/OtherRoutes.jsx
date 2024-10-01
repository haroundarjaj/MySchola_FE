import { lazy } from 'react';

import Loadable from 'components/ui-component/Loadable';
import MainLayout from 'components/layout/MainLayout';
import Unauthorized from 'pages/unauthorized/Unauthorized';
import PrivateRoute from 'routing/PrivateRoute';

const NotFound = Loadable(lazy(() => import('pages/not-found')));

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
