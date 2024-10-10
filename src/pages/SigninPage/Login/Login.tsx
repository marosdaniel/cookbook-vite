import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
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
import { authMessages, userMessages } from '../../../messages';

import { IFormikProps, IProps } from './types';

const Login = ({ setIsLogin }: IProps) => {
  const { formatMessage } = useIntl();
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
    <Container size={420} my={40} id="login-page">
      <Seo
        title="Cookbook - Log In"
        description="Log in to your Cookbook account to access your personalized recipes and saved favorites."
        type="website"
        name="Cookbook"
        url="https://cookbook-vite.vercel.app/signin"
        canonicalUrl="https://cookbook-vite.vercel.app/signin"
        locale="en_GB"
        keywords="cookbook, login, recipes, cooking, gastronomy"
      />
      <Title ta="center" c="var(--mantine-color-gray-8)">
        {formatMessage(authMessages.welcomeBack)}
      </Title>
      <Group mt={5} justify="center" align="center">
        <Text c="dimmed" size="sm" ta="center">
          {`${formatMessage(authMessages.dontYouHaveAnAccount)} `}
        </Text>
        <Button variant="transparent" size="sm" onClick={() => setIsLogin(false)}>
          {formatMessage(authMessages.createAccountButton)}
        </Button>
      </Group>

      <Paper component="form" withBorder shadow="md" p={30} mt={30} radius="md" onSubmit={handleSubmit}>
        <TextInput
          label={formatMessage(userMessages.email)}
          placeholder="your@email.com"
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
          placeholder={formatMessage(userMessages.password)}
          required
          mt="md"
          id="password"
          label={formatMessage(userMessages.password)}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          // helperText={touched.password && errors.password}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label={formatMessage(authMessages.rememberMe)} />
          <Anchor
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            component={RouterLink}
            size="sm"
            to={ENonProtectedRoutes.RESET_PASSWORD}
          >
            {formatMessage(authMessages.forgotPassword)}
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit" disabled={loading}>
          {formatMessage(authMessages.signIn)}
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
          {formatMessage(authMessages.goToTheRecipes)}
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
