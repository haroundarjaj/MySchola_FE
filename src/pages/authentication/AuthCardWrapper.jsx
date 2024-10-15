import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/ui-component/cards/MainCard';
import { display } from '@mui/system';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, contentType, ...other }) => (
  <MainCard
    sx={{
      maxWidth: contentType === "login" ? { xs: 450, lg: 525 } : { xs: 800, lg: 900 },
      margin: { xs: 1, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthCardWrapper;
