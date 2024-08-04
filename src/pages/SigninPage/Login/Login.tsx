import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { IoArrowBackOutline } from 'react-icons/io5';

import { login } from '../../../store/Auth/auth';
import { useAppDispatch } from '../../../store/hooks';
import { LOGIN_USER } from '../../../graphql/user/loginUser';
import { loginValidationSchema } from '../../../utils/validation';
import { ENonProtectedRoutes } from '../../../router/types';
import Seo from '../../../components/Seo';

import { IFormikProps, IProps } from './types';

const Login = ({ setIsLogin }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [error, setError] = useState<string>('');

  const onSubmit = async () => {
    const userLoginInput = {
      userNameOrEmail: values.email,
      password: values.password,
    };

    try {
      const {
        data: {
          loginUser: { user, token },
        },
      } = await loginUser({
        variables: { userLoginInput },
      });

      localStorage.setItem('c_b_token', token);

      dispatch(login(user));
      navigate(ENonProtectedRoutes.HOME);
    } catch (_error: any) {
      setError(_error.message);
      notifications.show({
        title: 'Login failed',
        message: error,
        color: 'red',
      });
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik<IFormikProps>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema: loginValidationSchema,
  });

  return (
    <Container size={420} my={40}>
      <Seo
        title="Cookbook - Log In"
        description="Log in to your Cookbook account to access your personalized recipes and saved favorites."
        type="website"
        name="Cookbook"
        url="https://www.example-cookbook.com/login"
        canonicalUrl="https://www.example-cookbook.com/login"
        locale="en_GB"
        keywords="cookbook, login, recipes, cooking, gastronomy"
      />
      <Title ta="center" c="var(--mantine-color-gray-8)">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" onClick={() => setIsLogin(false)}>
          Create account
        </Anchor>
      </Text>

      <Paper component="form" withBorder shadow="md" p={30} mt={30} radius="md" onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          id="email"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          // helperText={touched.email && errors.email}
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
          // helperText={touched.password && errors.password}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component={RouterLink} size="sm" to={ENonProtectedRoutes.RESET_PASSWORD}>
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit" disabled={loading}>
          Sign in
        </Button>
        <Button
          type="button"
          variant="subtle"
          component={RouterLink}
          to={ENonProtectedRoutes.RECIPES}
          mt={24}
          mb={-16}
          pl={8}
          leftSection={<IoArrowBackOutline size={20} />}
        >
          Go to the recipes
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
