import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Table, ScrollArea, Text, Center, TextInput, Container } from '@mantine/core';
import { GoSearch } from 'react-icons/go';

import { TUser } from '../../../../store/Auth/types';
import { GET_ALL_USERS } from '../../../../graphql/user/getUser';

import TableHead from './TableHead';
import { sortData } from './utils';
import { RowData } from './types';

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
                <TableHead
                  sorted={sortBy === 'userName'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('userName')}
                >
                  User name
                </TableHead>
                <TableHead
                  sorted={sortBy === 'email'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('email')}
                >
                  Email
                </TableHead>
                <TableHead sorted={sortBy === 'role'} reversed={reverseSortDirection} onSort={() => setSorting('role')}>
                  Role
                </TableHead>
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
