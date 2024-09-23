// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack
    direction="row"
    justifyContent="center"
    style={{
      position: 'fixed',
      bottom: 0,
      right: 20
    }}
  >
    {/* <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank" underline="hover">
      berrydashboard.io
    </Typography> */}
    <Typography variant="subtitle2" component={Link} href="https://darcreation.net/portfolio" target="_blank" underline="hover">
      {`Haroun Darjaj \(darTech)`} &copy; 2024
    </Typography>
  </Stack>
);

export default AuthFooter;
