import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from './routing/routes';

// defaultTheme
import themes from 'utils/themes';

// project imports
import NavigationScroll from 'components/layout/NavigationScroll';

//intialize translations
import "./utils/i18n/translationResources";
import { checkAuthentication } from 'store/slices/authSlice';
import { useEffect, useState } from 'react';
import LoadingScreen from 'components/ui-component/loading-screen';
import { NotificationProvider } from 'utils/NotificationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowLoading(false);
      }, 100);
    }
  }, [isLoading])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          <NotificationProvider>
            <NavigationScroll>
              {showLoading ? (
                <LoadingScreen />
              ) : (
                <NavigationScroll>
                  <RouterProvider router={router} />
                </NavigationScroll>
              )}
            </NavigationScroll>
          </NotificationProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
