// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="center">
    {/* <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank" underline="hover">
      berrydashboard.io
    </Typography> */}
    <Typography variant="subtitle2" component={Link} href="https://darcreation.net/portfolio" target="_blank" underline="hover">
      &copy; {`Haroun Darjaj \(darTech)`}
    </Typography>
  </Stack>
);

export default AuthFooter;
