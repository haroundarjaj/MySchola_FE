import { Button, Dialog, DialogContent, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { useNotification } from "utils/NotificationProvider";
import { forgotPassword } from "services/AuthService";

const CancelButton = styled(Button)((theme) => ({
    backgroundColor: "lightgrey",
    color: "black",
    "&:hover": {
        backgroundColor: "primary",
        color: "white"
    }
}));

const ForgotPasswordDialog = ({ open, handleClose }) => {
    const tAuth = useTranslation("authentication").t;
    const tGeneral = useTranslation("general").t;
    const { showNotification } = useNotification();

    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(true)
        if (values.email === "") {
            showNotification("Insert a valid email to recieve the reset link!", "error");
        } else {
            forgotPassword(values.email).then(response => {
                showNotification("A reset link have been sent to your email successfully.", "success");
                handleClose();
            }).catch(err => {
                console.log(err)
                showNotification("bad request.", "error");
            })
        }
        setSubmitting(false)
    }

    const handleCloseDialog = (event, reason) => {
        // Prevent closing on backdrop click
        if (reason === 'backdropClick') {
            return;
        }
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            maxWidth="sm"
            PaperProps={{
                sx: { borderRadius: 10 }
            }}
        >
            <DialogContent sx={{ p: downMD ? 5 : 10 }}>
                <Typography variant="h3" fontWeight="600" sx={{ mb: 2 }}>{tAuth('forgot_password_title')}</Typography>
                <Typography variant="h5" fontWeight="300" sx={{ mb: 5 }}>{tAuth('forgot_password_subtitle')}</Typography>
                <Formik
                    initialValues={{
                        email: ""
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email(tAuth('valid_email_error')).max(255)
                    })}
                    onSubmit={onSubmit}
                >
                    {({ errors, handleBlur, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ mb: 3 }}>
                                <InputLabel htmlFor="outlined-adornment-email-register">{tAuth('email')}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email-register"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    label={tAuth('email')}
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
                            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary" sx={{ mb: 1 }}>
                                {tAuth('reset_password_title')}
                            </Button>
                            <CancelButton fullWidth size="large" variant="contained" onClick={handleClose} sx={{ backgroundColor: "lightgray", color: "black" }}>
                                {tGeneral('cancel')}
                            </CancelButton>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )

}

export default ForgotPasswordDialog;