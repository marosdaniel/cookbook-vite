import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, Group, CloseButton, Button, Text, Anchor } from '@mantine/core';

import { ENonProtectedRoutes } from '../../router/types';

import classNames from './CookieBanner.module.css';

const CookieBanner = () => {
  const isCookieAccepted = !localStorage.getItem('cookiesAccepted');
  const [isShown, setIsShown] = useState(isCookieAccepted);

  const cookiePolicyLink = (
    <Anchor
      size="xs"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      component={RouterLink}
      to={ENonProtectedRoutes.COOKIE_POLICY}
    >
      cookie policy page
    </Anchor>
  );

  if (!isShown) {
    return null;
  }

  const handleClose = () => {
    setIsShown(false);
  };

  const handleAccept = () => {
    setIsShown(false);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  return (
    <Paper
      withBorder
      m="0 auto"
      p="lg"
      radius="md"
      shadow="md"
      w={{
        base: 'calc(100% - 20px)',
        sm: '80%',
        md: '70%',
        lg: '50%',
      }}
      className={classNames.container}
    >
      <Group justify="space-between" mb="xs">
        <Text fz="md" fw={500}>
          Allow cookies
        </Text>
        <CloseButton mr={-9} mt={-9} onClick={handleClose} />
      </Group>
      <Text c="dimmed" fz="xs">
        So the deal is, we want to spy on you. We would like to know what did you have for todays breakfast, where do
        you live, how much do you earn and like 50 other things. To view our landing page you will have to accept all
        cookies. That&apos;s all, and remember that we are watching...
      </Text>
      <Text c="dimmed" fz="xs">
        Learn more about how we use cookies in our {cookiePolicyLink}
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" size="xs" disabled>
          Cookies preferences
        </Button>
        <Button variant="outline" size="xs" onClick={handleAccept}>
          Accept all
        </Button>
      </Group>
    </Paper>
  );
};

export default CookieBanner;
