import { Link as RouterLink } from 'react-router-dom';
import { Container, Group, Button, Text } from '@mantine/core';
import { ENonProtectedRoutes } from '../../router/types';
import Logo from '../Logo';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <Container className={classes.container}>
      <Logo />
      <Group className={classes.group}>
        <Group>
          <Button size="xs" component={RouterLink} to={ENonProtectedRoutes.PRIVACY_POLICY} variant="subtle">
            Privacy Policy
          </Button>
          <Button size="xs" component={RouterLink} to={ENonProtectedRoutes.COOKIE_POLICY} variant="subtle">
            Cookie Policy
          </Button>
        </Group>
        <Text size="xs" style={{ marginTop: 10 }}>
          Copyright &copy; Cookbook {new Date().getFullYear()} - All rights reserved
        </Text>
      </Group>
    </Container>
  );
};

export default Footer;
