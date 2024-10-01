import { lazy } from 'react';

// project imports
import MainLayout from 'components/layout/MainLayout';
import Loadable from 'components/ui-component/Loadable';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from '../PrivateRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// users management routing
const UsersPage = Loadable(lazy(() => import('pages/user-management/users')));
const RolesPage = Loadable(lazy(() => import('pages/user-management/roles')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <PrivateRoute element={<MainLayout />} />,
  children: [
    {
      path: '/',
      element: <Navigate to="dashboard" />
    },
    {
      path: 'dashboard',
      element: <PrivateRoute element={<DashboardDefault />} />
    },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-typography',
    //       element: <UtilsTypography />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-color',
    //       element: <UtilsColor />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-shadow',
    //       element: <UtilsShadow />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    {
      path: 'users',
      element: <PrivateRoute element={<UsersPage />} requiredRole="SUPER_ADMIN" />
    },
    {
      path: 'roles',
      element: <PrivateRoute element={<RolesPage />} requiredRole="SUPER_ADMIN" />
    }
  ]
};

export default MainRoutes;
