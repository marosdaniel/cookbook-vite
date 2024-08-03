import { Link as RouterLink } from 'react-router-dom';
import { AppShell, Avatar, Burger, Divider, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TProps } from './types';
import { useTopMenuItems } from './utils';
import Logo from '../Logo';
import { useAuthState } from '../../store/Auth';

const Shell = ({ children }: TProps) => {
  const { isAuthenticated } = useAuthState();
  const [opened, { toggle }] = useDisclosure();
  const topMenuItems = useTopMenuItems();
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
          {isAuthenticated && <Avatar src="avatar-1.png" alt="it's me" />}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section>
          <Group gap={0} p={8}>
            {topMenuItems.map(item => {
              return (
                <NavLink
                  component={RouterLink}
                  key={item.key}
                  to={item.path ?? '/'}
                  label={item.name}
                  leftSection={<item.iconComponent />}
                />
              );
            })}
          </Group>
        </AppShell.Section>
        <Divider />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Shell;
