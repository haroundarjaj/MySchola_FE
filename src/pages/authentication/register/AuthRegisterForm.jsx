import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import UserAvatar from 'assets/images/avatars/general-avatar.svg';

import * as Yup from 'yup';
import { Field, Formik } from 'formik';

import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { Avatar, MenuItem, Select } from '@mui/material';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';
import { MuiTelInput } from 'mui-tel-input';
import { DateField } from '@mui/x-date-pickers';
import { useNotification } from 'utils/NotificationProvider';
import { register } from 'services/AuthService';
import ImageUploader from 'components/ui-component/ImageUploader';

const AuthRegisterForm = ({ ...others }) => {
  const theme = useTheme();
  const tAuth = useTranslation('authentication').t;
  const tGeneral = useTranslation('general').t;
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [isOpenImageUploader, setIsOpenImageUploader] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp, tAuth));
  };

  const capitalizeFirstLetter = (value) => {
    if (!value) return '';
    const wordsList = value.split(" ");
    var capitalizedWordsList = wordsList.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWordsList.join(" ");
  }

  const onSubmit = async (values, { setSubmitting, validateForm }) => {
    validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        showNotification("Fill all the fields to register the user", "error")
      } else {
        setSubmitting(true);
        console.log(values)
        console.log(values.birthDate.format('DD/MM/YYYY'))
        const user = {
          ...values,
          bidrthDate: values.birthDate.format('DD/MM/YYYY'),
          // imageData: uploadedImage
        }

        const formDataObj = new FormData();
        formDataObj.append('user', new Blob([JSON.stringify(user)], {
          type: 'application/json'
        }));
        formDataObj.append('image', uploadedImage);

        register(formDataObj).then(response => {
          console.log(response);
          showNotification("User created successfully", "success")
          navigate("login")
        }).catch(err => {
          console.log(err);
          showNotification(tGeneral(err.response.data.code), "error")
        }).finally(() => {
          setSubmitting(false);
        })
      }
    });
  };

  useEffect(() => {
    changePassword("")
  }, [])

  return (
    <>
      <ImageUploader
        image={uploadedImage}
        isOpen={isOpenImageUploader}
        onClose={() => setIsOpenImageUploader(false)}
        onSave={(data) => setUploadedImage(data)}
      />
      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phone: '',
          address: '',
          gender: '',
          birthDate: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(tAuth('valid_email_error')).max(255).required(tAuth('email_required')),
          password: Yup.string().max(255).required(tAuth('password_required'))
            .test('password-strength', tAuth('password_not_strong_enough'), (value) => {
              return [tAuth('normal'), tAuth('good'), tAuth('strong')].includes(level.label);
            }),
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          phone: Yup.string().required(),
          address: Yup.string().required(),
          gender: Yup.string().required(),
          birthDate: Yup.date().required(),
        })}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4} display="flex" alignItems="center" justifyContent="center">
                {console.log("uploadedImage")}
                {console.log(uploadedImage)}
                <Avatar
                  alt="Avatar"
                  src={uploadedImage || UserAvatar}
                  sx={{ width: 120, height: 120, cursor: "pointer" }}
                  onClick={() => setIsOpenImageUploader(true)}
                />
              </Grid>
              <Grid item xs={12} sm={8} container spacing={2}>
                <Grid item xs={12} >
                  <Field
                    as={TextField}
                    fullWidth
                    label={tGeneral('first_name')}
                    name="firstName"
                    type="text"
                    onChange={(e) => {
                      const capitalizedValue = capitalizeFirstLetter(e.target.value);
                      setFieldValue('firstName', capitalizedValue);
                    }}
                    error={Boolean(touched.firstName && errors.firstName)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label={tGeneral('last_name')}
                    name="lastName"
                    type="text"
                    onChange={(e) => {
                      const capitalizedValue = capitalizeFirstLetter(e.target.value);
                      setFieldValue('lastName', capitalizedValue);
                    }}
                    error={Boolean(touched.lastName && errors.lastName)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{tGeneral('gender')}</InputLabel>
                  <Select
                    name='gender'
                    label={tGeneral('gender')}
                    onChange={handleChange}
                    value={values.gender}
                    error={Boolean(touched.gender && errors.gender)}
                  >
                    <MenuItem value="Male">
                      <IconGenderMale stroke={1} size="1rem" />
                      <span style={{ marginLeft: 10 }}>{tGeneral('male')}</span>
                    </MenuItem>
                    <MenuItem value="Female">
                      <IconGenderFemale stroke={1} size="1rem" />
                      <span style={{ marginLeft: 10 }}>{tGeneral('female')}</span>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Field
                  as={TextField}
                  fullWidth
                  label={tGeneral('address')}
                  name="address"
                  type="text"
                  error={Boolean(touched.address && errors.address)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DateField
                  label={tGeneral('birth_date')}
                  name='birthDate'
                  fullWidth
                  value={values.birthday}
                  onChange={(date) => setFieldValue('birthDate', date)}
                  format="DD-MM-YYYY"
                  error={Boolean(touched.birthDate && errors.birthDate)}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <MuiTelInput
                  name='phone'
                  defaultCountry="MA"
                  fullWidth
                  value={values.phone}
                  onChange={(phone) => setFieldValue('phone', phone)}
                  error={Boolean(touched.phone && errors.phone)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                  <InputLabel htmlFor="outlined-adornment-email-register">{tGeneral('email')}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="email"
                    value={values.email}
                    name="email"
                    label={tGeneral('email')}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value.toLowerCase())
                    }}
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={9}>
                <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                  <InputLabel htmlFor="outlined-adornment-password-register">{tGeneral('password')}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    label={tGeneral('password')}
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
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} alignItems="center">
                <FormControl fullWidth>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
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
            {/* 
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid> */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {tAuth('sign_up')}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegisterForm;
