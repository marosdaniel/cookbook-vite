import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Paper, Group, Title, Button, Box, PasswordInput, Text } from '@mantine/core';
import { CHANGE_PASSWORD } from '../../../../../graphql/user/editUser';

import classNames from './Password.module.css';
import { useFormik } from 'formik';
import { IFormikProps } from './types';
import { useAuthState } from '../../../../../store/Auth';
import { passwordEditValidationSchema } from '../../../../../utils/validation';
import { notifications } from '@mantine/notifications';

const Password = () => {
  const { user } = useAuthState();
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      resetForm();
      setIsEditMode(false);
      notifications.show({
        title: 'Password changed',
        message: 'Your password has been changed',
        color: 'teal',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Password change failed',
        message: 'Something went wrong, please try again',
        color: 'red',
      });
    },
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleCancelPasswordEdit = () => {
    resetForm();
    setIsEditMode(false);
  };

  const onSubmit = async () => {
    try {
      const passwordEditInput = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      };
      await changePassword({
        variables: {
          userId: user?._id,
          passwordEditInput,
        },
      });

      handleCancelPasswordEdit();
    } catch (_error: any) {
      console.error('Something went wrong:', _error);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm, isValid, dirty } =
    useFormik<IFormikProps>({
      initialValues: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      validationSchema: passwordEditValidationSchema,
      onSubmit,
    });

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      shadow="md"
      radius="lg"
      p={{
        base: 'md',
        md: 'xl',
      }}
      m="32px auto"
      w={{ base: '100%', md: '80%', lg: '75%' }}
    >
      <Group className={classNames.group} display="flex" justify="space-between" align="baseline">
        <Title order={5} mb="lg">
          Change your password
        </Title>
        {!isEditMode ? (
          <Button variant="subtle" onClick={() => setIsEditMode(true)}>
            Edit
          </Button>
        ) : null}
      </Group>
      {!isEditMode ? (
        <Box>
          <Box mb="lg">
            <Text size="sm">Password</Text>
            <Text size="md">***************</Text>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box mt="md">
            <PasswordInput
              required
              id="passoword"
              placeholder="Password"
              mt="md"
              label="Current password"
              name="currentPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.currentPassword}
              error={touched.currentPassword && Boolean(errors.currentPassword)}
              description={touched.currentPassword && Boolean(errors.currentPassword) ? errors.currentPassword : ''}
            />
            <PasswordInput
              required
              id="passoword"
              placeholder="New password"
              mt="md"
              label="New password"
              name="newPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              error={touched.newPassword && Boolean(errors.newPassword)}
              description={touched.newPassword && Boolean(errors.newPassword) ? errors.newPassword : ''}
            />
            <PasswordInput
              required
              id="confirm-passoword"
              placeholder="Confirm password"
              mt="md"
              label="Confirm Password"
              name="confirmNewPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmNewPassword}
              error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
              description={
                touched.confirmNewPassword && Boolean(errors.confirmNewPassword) ? errors.confirmNewPassword : ''
              }
            />
          </Box>
          <Group mt="xl" display="flex" justify="flex-end">
            <Button size="sm" onClick={handleCancelPasswordEdit}>
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={!isValid || !dirty} loading={loading}>
              Save
            </Button>
          </Group>
        </Box>
      )}
    </Paper>
  );
};

export default Password;
