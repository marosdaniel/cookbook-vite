import { Container, Paper, Title, Text, Box } from '@mantine/core';
import { useAuthState } from '../../../../store/Auth';
import PersonalData from './PersonalData';

const ProfileTab = () => {
  const { user } = useAuthState();

  const { userName, email } = user;

  return (
    <Container size="lg" id="profile-tab">
      {/* <Password userId={user?._id ?? ''} /> */}

      <Title order={2} mt="xl">
        Edit your profile
      </Title>

      <Paper shadow="md" radius="lg" p="xl" m="32px auto" w={{ base: '100%', md: '80%', lg: '75%' }}>
        <Title order={5} mb="lg">
          General information
        </Title>
        <Box mb="lg">
          <Text size="sm">Username</Text>
          <Text size="md">{userName}</Text>
        </Box>
        <Box>
          <Text size="sm">Email</Text>
          <Text>{email}</Text>
        </Box>
      </Paper>

      <PersonalData />
    </Container>
  );
};

export default ProfileTab;
