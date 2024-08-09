import { Table, UnstyledButton, Group, Center, Text } from '@mantine/core';
import { HiOutlineSelector } from 'react-icons/hi';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { IProps } from './types';

import classes from './TableHead.module.css';

const TableHead = ({ children, reversed, sorted, onSort }: IProps) => {
  const Icon = sorted ? (reversed ? IoChevronUp : IoChevronDown) : HiOutlineSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={18} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
};

export default TableHead;
