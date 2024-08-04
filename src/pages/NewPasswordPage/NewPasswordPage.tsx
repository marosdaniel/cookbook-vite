import { useState } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Container, Title, Paper, Text, Group, Button, PasswordInput, Alert } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IoArrowBackOutline } from 'react-icons/io5';

import { ENonProtectedRoutes } from '../../router/types';
import { SET_NEW_PASSWORD } from '../../graphql/user/editUser';
import { newPasswordValidationSchema } from '../../utils/validation';
import { IFormikProps } from './types';

const NewPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [setNewPassword, { loading, error: newPasswordMutationError }] = useMutation(SET_NEW_PASSWORD, {
    onError: error => {
      setError(error.message);
    },
  });

  const onSubmit = async () => {
    if (!token) return;
    if (values.newPassword !== values.confirmNewPassword) {
      setError('Passwords do not match');
      notifications.show({
        title: newPasswordMutationError ? 'Set new password failed' : 'Passwords do not match',
        message: error,
        color: 'red',
      });
      return;
    }
    try {
      await setNewPassword({
        variables: { newPassword: values.newPassword, token: token },
      });

      navigate(ENonProtectedRoutes.SIGNIN);
      resetForm();
    } catch (_error: any) {
      resetForm();
      setError(_error.message);
      notifications.show({
        title: _error,
        message: error,
        color: 'red',
      });
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm } = useFormik<IFormikProps>({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit,
    validationSchema: newPasswordValidationSchema,
  });

  // TODO: fix this
  if (newPasswordMutationError) {
    return (
      <Container size={460} my={30}>
        <Alert color="red" title="Set new password failed" mt="xl">
          {newPasswordMutationError.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size={460} my={30}>
      <Title ta="center">Set your new password</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your new password
      </Text>

      <Paper component="form" onSubmit={handleSubmit} withBorder shadow="md" p={30} radius="md" mt="xl">
        <PasswordInput
          id="new-password"
          name="new-password"
          placeholder="Your password"
          required
          mt="md"
          label="Password"
          onChange={handleChange('newPassword')}
          onBlur={handleBlur('newPassword')}
          value={values.newPassword}
          error={touched.newPassword && Boolean(errors.newPassword)}
          description={touched.newPassword && Boolean(errors.newPassword) ? 'Should be a valid password' : ''}
        />
        <PasswordInput
          placeholder="Confirm password"
          required
          mt="md"
          id="confirm-new-password"
          name="confirm-new-password"
          label="Confirm your password"
          onChange={handleChange('confirmNewPassword')}
          onBlur={handleBlur('confirmNewPassword')}
          value={values.confirmNewPassword}
          error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
          description={touched.confirmNewPassword && Boolean(errors.confirmNewPassword) ? 'Passwords should match' : ''}
        />
        <Group mt="lg">
          <Button fullWidth type="submit" loading={loading} loaderProps={{ type: 'dots' }}>
            Save
          </Button>
        </Group>

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

export default NewPasswordPage;
