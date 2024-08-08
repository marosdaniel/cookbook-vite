import { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Group, Paper, Title, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { nameValidationSchema } from '../../../../../utils/validation';
import { useAuthState } from '../../../../../store/Auth';
import { TUser } from '../../../../../store/Auth/types';

import { useAppDispatch } from '../../../../../store/hooks';
import { updateUserThunk } from '../../../../../store/Auth/thunks/updateUserThunk';
import { IFormikProps } from './types';

const PersonalData = () => {
  const { user } = useAuthState() as { user: TUser };
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);

  const onSubmit = async () => {
    try {
      const result = await dispatch(
        updateUserThunk({
          id: user?._id ?? '',
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      );

      if (updateUserThunk.fulfilled.match(result)) {
        setIsEditMode(false);
        notifications.show({
          title: 'Success',
          message: 'Your personal data has been updated',
          color: 'teal',
        });
      } else if (updateUserThunk.rejected.match(result)) {
        notifications.show({
          title: 'Oooops ... :(',
          message: 'Something went wrong. Please try again later.',
          color: 'red',
        });
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm, isValid, dirty } =
    useFormik<IFormikProps>({
      initialValues: {
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
      },
      validationSchema: nameValidationSchema,
      onSubmit,
    });

  const handlePersonalDataEditable = () => {
    setIsEditMode(prev => !prev);
  };

  const handleCancelPersonalData = () => {
    resetForm();
    setIsEditMode(false);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      shadow="md"
      radius="lg"
      p="xl"
      m="32px auto"
      w={{ base: '100%', md: '80%', lg: '75%' }}
    >
      <Group display="flex" justify="space-between" align="center">
        <Title order={5}>Change your personal data</Title>
        {!isEditMode ? (
          <Button variant="subtle" onClick={handlePersonalDataEditable}>
            Edit
          </Button>
        ) : null}
      </Group>
      {!isEditMode ? (
        <Box>
          <Box mb="lg">
            <Text size="sm">First name</Text>
            <Text size="md">{values.firstName}</Text>
          </Box>
          <Box mb="lg">
            <Text size="sm">Last name</Text>
            <Text size="md">{values.lastName}</Text>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box mt="md">
            <TextInput
              required
              id="first-name"
              placeholder="Your first name"
              mt="md"
              label="First Name"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              error={touched.firstName && Boolean(errors.firstName)}
              description={touched.firstName && Boolean(errors.firstName) ? 'Type here your first name' : ''}
            />
            <TextInput
              required
              id="last-name"
              placeholder="Your last name"
              mt="md"
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              error={touched.lastName && Boolean(errors.lastName)}
              description={touched.lastName && Boolean(errors.lastName) ? 'Type here your last name' : ''}
            />
          </Box>
          <Group mt="xl" display="flex" justify="flex-end">
            <Button size="sm" onClick={handleCancelPersonalData}>
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={!isValid || !dirty}>
              Save
            </Button>
          </Group>
        </Box>
      )}
    </Paper>
  );
};

export default PersonalData;
