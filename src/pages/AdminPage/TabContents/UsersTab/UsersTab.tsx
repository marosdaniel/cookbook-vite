import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem, keys, Container } from '@mantine/core';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { HiOutlineSelector } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';

import { TUser } from '../../../../store/Auth/types';
import { GET_ALL_USERS } from '../../../../graphql/user/getUser';

import classes from './UsersTab.module.css';

interface RowData {
  userName: string;
  email: string;
  role: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IoChevronUp : IoChevronDown) : HiOutlineSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter(item => keys(data[0]).some(key => item[key].toLowerCase().includes(query)));
}

function sortData(data: RowData[], payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search,
  );
}

const UsersTab = () => {
  const { data } = useQuery<{ getAllUser: TUser[] }>(GET_ALL_USERS);

  const users: TUser[] = data?.getAllUser ?? [];

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>();
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(users, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(users, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  useEffect(() => {
    setSortedData(sortData(users, { sortBy, reversed: reverseSortDirection, search }));
  }, [users]);

  const rows = sortedData?.map(row => (
    <Table.Tr key={row.userName}>
      <Table.Td>{row.userName}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.role}</Table.Td>
    </Table.Tr>
  ));

  // const handleDeleteUser = (userId: string) => {
  //   console.log('handleDeleteUser: ', userId);
  // };

  return (
    <Container id="admin-users" mt="xl">
      {users?.length ? (
        <ScrollArea>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={<GoSearch />}
            value={search}
            onChange={handleSearchChange}
          />
          <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
            <Table.Tbody>
              <Table.Tr>
                <Th
                  sorted={sortBy === 'userName'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('userName')}
                >
                  User name
                </Th>
                <Th sorted={sortBy === 'email'} reversed={reverseSortDirection} onSort={() => setSorting('email')}>
                  Email
                </Th>
                <Th sorted={sortBy === 'role'} reversed={reverseSortDirection} onSort={() => setSorting('role')}>
                  Role
                </Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
              {rows && rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={Object.keys(users[0]).length}>
                    <Text fw={500} ta="center">
                      Nothing found
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Center h="384px">
          <Text>No users found</Text>
        </Center>
      )}
    </Container>
  );
};

export default UsersTab;
