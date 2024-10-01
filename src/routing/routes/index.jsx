import { createHashRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import OtherRoutes from './OtherRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createHashRouter([MainRoutes, LoginRoutes, OtherRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
