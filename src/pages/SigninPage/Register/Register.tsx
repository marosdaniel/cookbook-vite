import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Container, Title, Anchor, Paper, TextInput, PasswordInput, Button, Text, Checkbox } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { login } from '../../../store/Auth/auth';
import { useAppDispatch } from '../../../store/hooks';
import { CREATE_USER } from '../../../graphql/user/createUser';
import { LOGIN_USER } from '../../../graphql/user/loginUser';
import { ENonProtectedRoutes } from '../../../router/types';
import { customValidationSchema } from '../../../utils/validation';

import { IFormikProps, IProps } from './types';

const Register = ({ setIsLogin }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER);
  const [error, setError] = useState<string>('');
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState<boolean>(false);

  const privacyLink = (
    <Anchor component={RouterLink} to={ENonProtectedRoutes.PRIVACY_POLICY} target="_blank" rel="noopener noreferrer">
      I accept the privacy policy
    </Anchor>
  );

  const handleChangePrivacy = () => {
    setIsPrivacyAccepted(!isPrivacyAccepted);
  };

  const onSubmit = async () => {
    const userRegisterInput = {
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.userName,
      email: values.email,
      password: values.password,
    };

    try {
      await createUser({
        variables: { userRegisterInput },
      });
    } catch (_error: any) {
      setError(_error.message);
      notifications.show({
        title: 'Registration failed',
        message: error,
        color: 'red',
      });
    }
    try {
      const userLoginInput = {
        userNameOrEmail: values.email,
        password: values.password,
      };
      const {
        data: {
          loginUser: { user },
        },
      } = await loginUser({
        variables: { userLoginInput },
      });
      dispatch(login(user));
    } catch (_error: any) {
      setError(_error.message);
      notifications.show({
        title: 'Login failed',
        message: error,
        color: 'red',
      });
    }
    navigate(ENonProtectedRoutes.HOME);
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik<IFormikProps>({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: customValidationSchema,
    onSubmit,
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Register a new account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" onClick={() => setIsLogin(true)}>
          Log in
        </Anchor>
      </Text>

      <Paper component="form" withBorder shadow="md" p={30} mt={30} radius="md" onSubmit={handleSubmit}>
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
        <TextInput
          required
          id="user-name"
          placeholder="Your username"
          mt="md"
          label="Username"
          name="userName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.userName}
          error={touched.userName && Boolean(errors.userName)}
          description={touched.userName && Boolean(errors.userName) ? 'Add a unique username' : ''}
        />
        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          mt="md"
          id="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          description={touched.email && Boolean(errors.email) ? 'Should be a valid email' : ''}
        />
        <PasswordInput
          placeholder="Your password"
          required
          mt="md"
          id="password"
          label="Password"
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          description={touched.password && Boolean(errors.password) ? 'Should be a valid password' : ''}
        />
        <PasswordInput
          placeholder="Confirm password"
          required
          mt="md"
          id="confirm-password"
          label="Confirm your password"
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          value={values.confirmPassword}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          description={touched.confirmPassword && Boolean(errors.confirmPassword) ? 'Passwords should match' : ''}
        />

        <Checkbox size="md" label={privacyLink} mt="xl" checked={isPrivacyAccepted} onClick={handleChangePrivacy} />

        <Button fullWidth mt="xl" type="submit" disabled={loading || loginLoading || !isPrivacyAccepted}>
          Create an account
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
