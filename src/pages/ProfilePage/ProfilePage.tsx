import { useNavigate, useParams } from 'react-router-dom';
import { Container, Tabs } from '@mantine/core';

import classes from './ProfilePage.module.css';
import ProfileTab from './TabContents/ProfileTab';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profileTab } = useParams();

  return (
    <Container size="xl" id="profile-page">
      <Tabs
        className={classes['tab-container']}
        value={profileTab}
        onChange={value => navigate(`/me/${value}`)}
        color="pink.7"
        radius="xl"
      >
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="recipes">My recipes</Tabs.Tab>
          <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile">
          <ProfileTab />
        </Tabs.Panel>
        <Tabs.Panel value="recipes">my recipes content</Tabs.Panel>
        <Tabs.Panel value="favorites">favorites content</Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;
