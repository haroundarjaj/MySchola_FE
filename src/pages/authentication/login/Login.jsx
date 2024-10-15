import { Link } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import AuthWrapper from '../AuthWrapper';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLoginForm from './AuthLoginForm';
import AuthFooter from 'components/ui-component/cards/AuthFooter';

import logo from 'assets/images/MyScholaLogo.png';
import logoTitle from 'assets/images/MyScholaTitle.png';
import labibCenterlogo from 'assets/images/labib_center_logo.svg';
import { useTranslation } from 'react-i18next';
import "../translation/translationConfig";
import { styled } from '@mui/material';

const CenterDiv = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const tAuth = useTranslation('authentication').t;

  return (
    <AuthWrapper>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
        <Grid item xs={12} sm={5} sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
          <AuthCardWrapper contentType="login">
            <Grid container alignItems="center" justifyContent="center">
              <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Grid item>
                  <Link to="#" aria-label="logo">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                      <img src={logo} alt="MySchola" width="100" />
                      <img src={logoTitle} alt="MySchola" width="100" />
                    </div>
                  </Link>
                </Grid>
                {/* <Grid item sx={{ ml: 0 }}>
                  <img src={labibCenterlogo} alt='Labib Center Logo' width="150" />
                </Grid> */}
              </Grid>
              <Grid item xs={12}>
                <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                      <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                        {tAuth('login_title')}
                      </Typography>
                      <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                        {tAuth('login_subtitle')}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLoginForm />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid item container direction="column" alignItems="center" xs={12}>
                  <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                    {tAuth('dont_have_account')}
                  </Typography>
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

export default Login;
