import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Checkbox,
  Group,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { login } from '../../../store/Auth/auth';
import { useAppDispatch } from '../../../store/hooks';
import { CREATE_USER } from '../../../graphql/user/createUser';
import { LOGIN_USER } from '../../../graphql/user/loginUser';
import { ENonProtectedRoutes } from '../../../router/types';
import { customValidationSchema } from '../../../utils/validation';
import Seo from '../../../components/Seo';

import { IFormikProps, IProps } from './types';

const Register = ({ setIsLogin }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER);
  const [error, setError] = useState<string>('');
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState<boolean>(false);

  const privacyLink = (
    <Anchor
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      component={RouterLink}
      to={ENonProtectedRoutes.PRIVACY_POLICY}
      target="_blank"
      rel="noopener noreferrer"
    >
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
    <Container size={420} my={40} id="registration-page">
      <Seo
        title="Cookbook - Create Account"
        description="Join Cookbook today! Create your account to save recipes, plan meals, and discover new culinary inspirations."
        type="website"
        name="Cookbook"
        url="https://cookbook-vite.vercel.app/signin"
        canonicalUrl="https://cookbook-vite.vercel.app/signin"
        locale="en_GB"
        keywords="cookbook, register, create account, sign up, recipes, meal planning"
      />
      <Title ta="center" c="var(--mantine-color-gray-8)">
        Welcome back!
      </Title>
      <Group mt={5} justify="center" align="center">
        <Text c="dimmed" size="sm" ta="center">
          Already have an account?{' '}
        </Text>
        <Button variant="transparent" size="sm" onClick={() => setIsLogin(true)}>
          Log in
        </Button>
      </Group>

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
