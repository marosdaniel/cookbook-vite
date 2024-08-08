import { Container, Paper, Title, Text, Box } from '@mantine/core';
import { useAuthState } from '../../../../store/Auth';
import PersonalData from './PersonalData';
import Password from './Password';

const ProfileTab = () => {
  const { user } = useAuthState();

  const { userName, email } = user ?? {};

  return (
    <Container size="lg" id="profile-tab" mt="xl">
      <Title order={2}>Edit your profile</Title>
      <Paper
        component="form"
        shadow="md"
        radius="lg"
        p={{
          base: 'md',
          md: 'xl',
        }}
        m="32px auto"
        w={{ base: '100%', md: '80%', lg: '75%' }}
      >
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
      <Password />
    </Container>
  );
};

export default ProfileTab;
