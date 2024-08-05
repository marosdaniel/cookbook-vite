import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppShell, Burger, Button, Divider, Group, Menu, NavLink } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { FaAngleRight } from 'react-icons/fa6';
import { useAuthState } from '../../store/Auth';
import { ENonProtectedRoutes } from '../../router/types';
import Footer from '../Footer';
import Logo from '../Logo';
import UserButton from '../UserButton';
import { useBottomMenuItems, useTopMenuItems } from './utils';
import { IBottomMenuItem, IProps } from './types';
import { APP_SHELL_WIDTH } from './consts';

const Shell = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthState();
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
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
      header={{ height: 66 }}
      navbar={{
        width: APP_SHELL_WIDTH,
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
            // <Avatar src="avatar-1.png" alt="it's me" />
            <Menu withArrow>
              <Menu.Target>
                <UserButton image="avatar-1.png" name={user.userName} email={user.email} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component="a" href="https://mantine.dev">
                  Mantine website
                </Menu.Item>
                <Menu.Item leftSection={<FaAngleRight />} component="a" href="https://mantine.dev" target="_blank">
                  External link
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button size="lg" component={RouterLink} to={ENonProtectedRoutes.SIGNIN} variant="subtle">
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
                  c="var(--mantine-color-gray-7)"
                  fw={500}
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
                  c="var(--mantine-color-gray-7)"
                  fw={500}
                />
              ) : null;
            })}
          </Group>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer w={!isMobile ? `calc(100% - ${APP_SHELL_WIDTH}px)` : '100%'} ml="auto">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export default Shell;
