import { Link, useLocation } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import AuthWrapper from '../AuthWrapper';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthResetPasswordForm from './AuthResetPasswordForm';
import AuthFooter from 'components/ui-component/cards/AuthFooter';

import logo from 'assets/images/MyScholaLogo.png';
import logoTitle from 'assets/images/MyScholaTitle.png';
import { useTranslation } from 'react-i18next';
import "../translation/translationConfig";
import { useEffect, useState } from 'react';
import { getResetTokenInfo } from 'services/AuthService';
import moment from 'moment';

const AuthResetPassword = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const tAuth = useTranslation('authentication').t;
  const location = useLocation();

  const [tokenInfo, setTokenInfo] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const isTokenExpired = () => {
    if (!tokenInfo) return true;
    return moment(tokenInfo.expirationTime).isBefore(moment());
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    getResetTokenInfo(token).then(response => {
      setTokenInfo(response.data)
    }).catch(err => {
      setTokenInfo(null)
    }).finally(() => {
      setIsloading(false)
    })
  }, [])

  return (
    <AuthWrapper>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
        <Grid item xs={12} sm={5} sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
          <AuthCardWrapper contentType="login">
            {!isLoading && (tokenInfo && !isTokenExpired() ?
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
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                          {tAuth('reset_password_title')}
                        </Typography>
                        <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                          {tAuth('reset_password_subtitle')}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 5 }}>
                  <AuthResetPasswordForm token={tokenInfo.token} />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
              : <>
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
                <Typography variant="subtitle1" textAlign="center" sx={{ mx: 5, my: 2 }}>
                  {tAuth('reset_link_expired')}
                </Typography>
              </>
            )}

          </AuthCardWrapper>
        </Grid>
      </Grid>
      <AuthFooter />
    </AuthWrapper>
  );
};

export default AuthResetPassword;
