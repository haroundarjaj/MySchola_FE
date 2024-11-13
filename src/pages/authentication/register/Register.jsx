import { Link } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper from '../AuthWrapper';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'components/ui-component/Logo';
import AuthRegisterForm from './AuthRegisterForm';
import AuthFooter from 'components/ui-component/cards/AuthFooter';

//logo
import logo from 'assets/images/MyScholaLogo.png';
import logoTitle from 'assets/images/MyScholaTitle.png';
import { useTranslation } from 'react-i18next';

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const tAuth = useTranslation('authentication').t;

  return (
    <AuthWrapper>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
          <AuthCardWrapper contentType="register">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item md={4} xs={12} sx={{ mb: 2 }}>
                <Link to="#" aria-label="logo">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                    <img src={logo} alt="MySchola" width={downMD ? "100" : "150"} />
                    <img src={logoTitle} alt="MySchola" width={downMD ? "100" : "150"} />
                  </div>
                </Link>
              </Grid>
              {!downMD && <Divider orientation="vertical" flexItem sx={{ mr: 5, mt: 5, height: 470 }} />}
              <Grid item md={7} xs={12} container alignItems="center" justifyContent="center">
                <Grid item xs={12} sx={{ mb: 3 }}>
                  <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography color="secondary.main" gutterBottom variant={downMD ? 'h2' : 'h1'}>
                          {tAuth('register_title')}
                        </Typography>
                        <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                          {tAuth('register_subtitle')}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <AuthRegisterForm />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                      {tAuth('already_have_account')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
      </Grid>
      <AuthFooter />
    </AuthWrapper>
  );
};

export default Register;
