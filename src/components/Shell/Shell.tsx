import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppShell, Avatar, Burger, Button, Divider, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthState } from '../../store/Auth';
import { ENonProtectedRoutes } from '../../router/types';
import Logo from '../Logo';
import { useBottomMenuItems, useTopMenuItems } from './utils';
import { IBottomMenuItem, TProps } from './types';

const Shell = ({ children }: TProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthState();
  const [opened, { toggle }] = useDisclosure();
  const topMenuItems = useTopMenuItems();
  const bottomMenuItems = useBottomMenuItems();

  const handleClick = (e: React.SyntheticEvent, item: IBottomMenuItem) => {
    if (item.action) {
      e.preventDefault();
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header display="flex">
        <Group h="100%" w="100%" px="md" justify="space-between">
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Logo />
          </Group>
          {isAuthenticated ? (
            <Avatar src="avatar-1.png" alt="it's me" />
          ) : (
            <Button component={RouterLink} to={ENonProtectedRoutes.SIGNIN} variant="subtle">
              Login
            </Button>
          )}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section>
          <Group gap={0} p={8}>
            {topMenuItems.map(item => {
              const isActiveNavLink = window.location.pathname === item.path;
              return (
                <NavLink
                  component={RouterLink}
                  key={item.key}
                  to={item.path ?? '/'}
                  label={item.name}
                  leftSection={<item.iconComponent />}
                  active={isActiveNavLink}
                />
              );
            })}
          </Group>
        </AppShell.Section>
        <Divider />
        <AppShell.Section>
          <Group gap={0} p={8}>
            {bottomMenuItems.map(item => {
              const isActiveNavLink = window.location.pathname === item.path;
              return !item.hidden ? (
                <NavLink
                  component={RouterLink}
                  key={item.key}
                  to={item.path ?? '/'}
                  label={item.name}
                  leftSection={<item.iconComponent />}
                  onClick={e => handleClick(e, item)}
                  active={isActiveNavLink}
                />
              ) : null;
            })}
          </Group>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Shell;
