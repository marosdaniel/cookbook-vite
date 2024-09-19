import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Paper, Group, Title, Button, Box, PasswordInput, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { CHANGE_PASSWORD } from '../../../../../graphql/user/editUser';
import { passwordEditValidationSchema } from '../../../../../utils/validation';
import { useAuthState } from '../../../../../store/Auth';
import { generalMessages, userMessages } from '../../../../../messages';
import { IFormikProps } from './types';

import classNames from './Password.module.css';

const Password = () => {
  const { formatMessage } = useIntl();
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
          {formatMessage(userMessages.changePasswordTitle)}
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
            <Text size="sm">{formatMessage(userMessages.password)}</Text>
            <Text size="md">***************</Text>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box mt="md">
            <PasswordInput
              required
              id="passoword"
              placeholder={formatMessage(userMessages.password)}
              mt="md"
              label={formatMessage(userMessages.currentPassword)}
              name="currentPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.currentPassword}
              error={touched.currentPassword && Boolean(errors.currentPassword)}
              description={touched.currentPassword && Boolean(errors.currentPassword) ? errors.currentPassword : ''}
            />
            <PasswordInput
              required
              id="new-passoword"
              placeholder={formatMessage(userMessages.newPassword)}
              mt="md"
              label={formatMessage(userMessages.newPassword)}
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
              placeholder={formatMessage(userMessages.confirmPassword)}
              mt="md"
              label={formatMessage(userMessages.confirmPassword)}
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
              {formatMessage(generalMessages.cancel)}
            </Button>
            <Button size="sm" type="submit" disabled={!isValid || !dirty} loading={loading}>
              {formatMessage(generalMessages.save)}
            </Button>
          </Group>
        </Box>
      )}
    </Paper>
  );
};

export default Password;
