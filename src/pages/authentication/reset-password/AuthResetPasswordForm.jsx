import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';


import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { useNotification } from 'utils/NotificationProvider';
import { resetPassword } from 'services/AuthService';
import * as Yup from 'yup';
import { Formik } from 'formik';

const AuthResetPasswordForm = ({ ...others }) => {
  const tAuth = useTranslation('authentication').t;
  const tGeneral = useTranslation('general').t;
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [level, setLevel] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp, tAuth));
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const resetPasswordRequest = {
      password: values.password,
      token: others.token
    }

    resetPassword(resetPasswordRequest).then(response => {
      console.log(response);
      showNotification(tAuth('password_update_success'), "success")
      navigate("login")
    }).catch(err => {
      console.log(err);
      showNotification(tGeneral(err.response.data.code), "error")
    }).finally(() => {
      setSubmitting(false);
    })
  };

  useEffect(() => {
    changePassword("")
  }, [])

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          passwordConfirm: ''
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required(tAuth('password_required'))
            .test('password-strength', tAuth('password_not_strong_enough'), (value) => {
              return [tAuth('normal'), tAuth('good'), tAuth('strong')].includes(level.label);
            }),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], tAuth('passwords_not_matching'))
            .required(tAuth('password_confirm_required'))
            .max(255),
        })}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={2} sx={{ mb: 1 }} justifyContent="flex-end">
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                  <InputLabel htmlFor="outlined-adornment-password-reset">{tAuth('password')}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-reset"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    label={tAuth('password')}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-reset">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}>
                  <InputLabel htmlFor="outlined-adornment-confirm-password-register">{tAuth('confirm_password')}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.passwordConfirm}
                    name="passwordConfirm"
                    label={tAuth('confirm_password')}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {touched.passwordConfirm && errors.passwordConfirm && (
                    <FormHelperText error id="standard-weight-helper-text-confirm-password-register">
                      {errors.passwordConfirm}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} alignItems="center">
                <FormControl fullWidth>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12}>
                        <Box style={{ backgroundColor: level?.color }} sx={{ width: "100%", height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {tGeneral('confirm')}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthResetPasswordForm;
