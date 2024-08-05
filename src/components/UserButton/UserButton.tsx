import { forwardRef } from 'react';
import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';

import classNames from './UserButton.module.css';

import { IProps } from './types';

const UserButton = forwardRef<HTMLButtonElement, IProps>(({ image, name, email, ...others }: IProps, ref) => (
  <UnstyledButton ref={ref} {...others}>
    <Group>
      <Group className={classNames.innerGroup}>
        <Text size="sm" fw={500}>
          {name}
        </Text>
        <Text c="dimmed" size="xs">
          {email}
        </Text>
      </Group>
      <Avatar src="/avatar-1.png" radius="xl" alt="it's me" />
    </Group>
  </UnstyledButton>
));
export default UserButton;
