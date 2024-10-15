import { useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AnimateButton from 'components/ui-component/extended/AnimateButton';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { useDispatch } from 'react-redux';
import { login } from 'store/slices/authSlice';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useTranslation } from 'react-i18next';
import { useNotification } from 'utils/NotificationProvider';
import ForgotPasswordDialog from '../ForgotPasswordDialog';


const AuthLoginForm = ({ ...others }) => {
  const theme = useTheme();
  const [isRemember, setIsRemember] = useState(true);
  const dispatch = useDispatch();
  const tAuth = useTranslation("authentication").t;
  const tGeneral = useTranslation("general").t;
  const { showNotification } = useNotification();


  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const onSubmit = ({ email, password }, { setSubmitting }) => {
  //   setSubmitting(true);
  //   dispatch(login({ email, password, isRemember, setSubmitting }));
  // }

  const onSubmit = async ({ email, password }, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await dispatch(login({ email, password, isRemember })).unwrap().then(response => {
        console.log(response)
      })
    } catch (err) {
      showNotification(tGeneral(err), "error")

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ForgotPasswordDialog
        open={openForgotPasswordDialog}
        handleClose={() => setOpenForgotPasswordDialog(false)}
      />
      <Formik
        initialValues={{
          email: 'super@admin.com',
          password: 'myScholaSuperAdmin'
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(tAuth('valid_email_error')).max(255).required(tAuth('email_required')),
          password: Yup.string().max(255).required(tAuth('password_required'))
        })}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">{tAuth('email')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">{tAuth('password')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
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
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={isRemember} onChange={(event) => setIsRemember(event.target.isRemember)} name="isRemember" color="primary" />
                }
                label={tAuth('remember_me')}
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setOpenForgotPasswordDialog(true)}>
                {tAuth('forgot_password')}
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {tAuth('sign_in')}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLoginForm;
