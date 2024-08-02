import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';

import { RESET_PASSWORD } from '../../graphql/user/editUser';
import { ENonProtectedRoutes } from '../../router/types';
import { resetPasswordValidationSchema } from '../../utils/validation';
import { boxStyle } from '../SigninPage/Login/styles';
import { IFormikProps } from './types';

const ResetPasswordPage = () => {
  const [error, setError] = useState<string>('');
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const [isResetPasswordEmailSent, setIsResetPasswordEmailSent] = useState(false);

  const onSubmit = async () => {
    try {
      await resetPassword({
        variables: { email: values.email },
      });
      setIsResetPasswordEmailSent(true);
      resetForm();
    } catch (_error: any) {
      setError(_error.message);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, resetForm, touched, errors } = useFormik<IFormikProps>({
    initialValues: {
      email: '',
    },
    onSubmit,
    validationSchema: resetPasswordValidationSchema,
  });

  return (
    // <Container maxWidth="sm">
    //   <Box sx={boxStyle}>
    //     <Typography component="h1" variant="h4">
    //       Reset your password
    //     </Typography>
    //     <Box component="form" onSubmit={handleSubmit} marginTop={1}>
    //       {!isResetPasswordEmailSent ? (
    //         <>
    //           <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             id="email"
    //             label="Email Address"
    //             name="email"
    //             autoComplete="email"
    //             onChange={handleChange}
    //             onBlur={handleBlur}
    //             value={values.email}
    //             error={touched.email && Boolean(errors.email)}
    //             helperText={touched.email && errors.email}
    //           />
    //           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
    //             Send
    //           </Button>
    //         </>
    //       ) : (
    //         <Alert sx={{ mb: 3, mt: 2, display: 'flex', alignItems: 'center' }}>
    //           <Typography variant="body1">
    //             An email with a link to reset your password has been sent to your email address.
    //           </Typography>
    //         </Alert>
    //       )}
    //       <Button type="button" variant="text" component={RouterLink} to={ENonProtectedRoutes.SIGNIN}>
    //         <ArrowBackIcon />
    //         Go to Login
    //       </Button>
    //     </Box>
    //     <AlertSnack message={error} setMessage={setError} />
    //   </Box>
    // </Container>
    <div>reset</div>
  );
};

export default ResetPasswordPage;
