import { useQuery } from '@apollo/client';
import { Container, Title } from '@mantine/core';

import { TUser } from '../../../../store/Auth/types';
import { GET_ALL_USERS } from '../../../../graphql/user/getUser';

const UsersTab = () => {
  const { data } = useQuery<{ getAllUser: TUser[] }>(GET_ALL_USERS);

  const users: TUser[] = data?.getAllUser ?? [];

  // const handleDeleteUser = (userId: string) => {
  //   console.log('handleDeleteUser: ', userId);
  // };

  return (
    <Container id="users" mt="xl">
      <Title order={4}>
        {users.map(user => (
          <div>{user.userName}</div>
        ))}
      </Title>
    </Container>
  );
};

export default UsersTab;
