import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppShell, Burger, Button, Divider, Flex, Group, Menu, NavLink, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { useAuthState } from '../../store/Auth';
import { logout } from '../../store/Auth/auth';
import { useAppDispatch } from '../../store/hooks';
import { ENonProtectedRoutes, EProtectedRoutes } from '../../router/types';
import Footer from '../Footer';
import Logo from '../Logo';
import UserButton from '../UserButton';
import { useBottomMenuItems, useTopMenuItems } from './utils';
import { IBottomMenuItem, IProps } from './types';
import { APP_SHELL_WIDTH } from './consts';

import classNames from './Shell.module.css';
import DarkModeSwitcher from '../DarkModeSwitcher';
import LanguagePicker from '../LanguagePicker';
import { sidebarMessages } from '../../messages/sidebar';

const Shell = ({ children }: IProps) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthState();
  const dispatch = useAppDispatch();

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

  const handleLogout = () => {
    dispatch(logout());
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
      footer={{
        height: {
          base: 160,
          sm: 80,
        },
      }}
    >
      <AppShell.Header display="flex">
        <Group w="100%" px="md" justify="space-between">
          <Group gap={0} align="center">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Logo />
            <Text c="pink.7" className={classNames.slogan} size="md" pt={6}>
              Where the recipes turn into magic!
            </Text>
          </Group>
          {isAuthenticated ? (
            <Flex dir="row" align="center" gap="md">
              <DarkModeSwitcher />
              <Menu withArrow>
                <Menu.Target>
                  <UserButton image="avatar-1.png" name={user!.userName} email={user!.email} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component={RouterLink} to={EProtectedRoutes.PROFILE}>
                    {formatMessage(sidebarMessages.profile)}
                  </Menu.Item>
                  <Menu.Item component={RouterLink} to={EProtectedRoutes.MY_RECIPES}>
                    {formatMessage(sidebarMessages.myRecipes)}
                  </Menu.Item>
                  <Menu.Item component={RouterLink} to={EProtectedRoutes.FAVORITES}>
                    {formatMessage(sidebarMessages.favorites)}
                  </Menu.Item>
                  <Menu.Item onClick={handleLogout}>Log out</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
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
                  leftSection={<item.iconComponent size={20} />}
                  active={isActiveNavLink}
                  disabled={item.disabled}
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
                  leftSection={<item.iconComponent size={20} />}
                  onClick={e => handleClick(e, item)}
                  active={isActiveNavLink}
                />
              ) : null;
            })}
          </Group>
        </AppShell.Section>
        <AppShell.Section ml={20}>
          <LanguagePicker />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={classNames.main}>{children}</AppShell.Main>
      <AppShell.Footer
        w={!isMobile ? `calc(100% - ${APP_SHELL_WIDTH}px)` : '100%'}
        ml="auto"
        pos={opened ? 'fixed' : 'unset'}
      >
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export default Shell;
