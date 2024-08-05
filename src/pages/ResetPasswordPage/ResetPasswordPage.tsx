import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Alert, Button, Container, Group, Paper, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { CiCircleInfo } from 'react-icons/ci';
import { IoArrowBackOutline } from 'react-icons/io5';

import { RESET_PASSWORD } from '../../graphql/user/editUser';
import { ENonProtectedRoutes } from '../../router/types';
import { resetPasswordValidationSchema } from '../../utils/validation';
import { IFormikProps } from './types';
import Seo from '../../components/Seo';

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
      notifications.show({
        title: 'Reset password failed',
        message: error,
        color: 'red',
      });
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
    <Container size={460} my={30}>
      <Seo
        title="Reset password"
        description="Enter your email to get a reset link"
        keywords="reset password, forgot password, email"
        type="website"
        name="Reset password"
        url="https://cookbook-vite.vercel.app/reset-password"
        canonicalUrl="https://cookbook-vite.vercel.app/reset-password"
        locale="en_GB"
      />
      <Title ta="center">Forgot your password?</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper component="form" onSubmit={handleSubmit} withBorder shadow="md" p={30} radius="md" mt="xl">
        {!isResetPasswordEmailSent ? (
          <>
            <TextInput
              id="email"
              name="email"
              label="Your email"
              placeholder="your@email.com"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              description={touched.email && Boolean(errors.email) ? 'Should be a valid email' : ''}
            />
            <Group mt="lg">
              <Button
                type="submit"
                loading={loading}
                loaderProps={{ type: 'dots' }}
                fullWidth
                disabled={touched.email && Boolean(errors.email)}
              >
                Reset password
              </Button>
            </Group>
          </>
        ) : (
          <Alert variant="light" color="green" title="Email sent successfully" icon={<CiCircleInfo size={30} />}>
            <Text size="sm">An email with a link to reset your password has been sent to your email address.</Text>
          </Alert>
        )}
        <Button
          mt="lg"
          component={RouterLink}
          size="sm"
          to={ENonProtectedRoutes.SIGNIN}
          variant="subtle"
          pl={0}
          pr={0}
          leftSection={<IoArrowBackOutline />}
        >
          Back to login
        </Button>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
