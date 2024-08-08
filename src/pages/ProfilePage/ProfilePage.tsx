import { useNavigate, useParams } from 'react-router-dom';
import { Container, Tabs, Text } from '@mantine/core';

import classes from './ProfilePage.module.css';
import ProfileTab from './TabContents/ProfileTab';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profileTab } = useParams();

  return (
    <Container
      size="xl"
      id="profile-page"
      p={{
        base: 'xs',
        md: 'md',
      }}
    >
      <Tabs
        className={classes['tab-container']}
        value={profileTab}
        onChange={value => navigate(`/me/${value}`)}
        color="pink.7"
        radius="xl"
      >
        <Tabs.List>
          <Tabs.Tab component={Text} value="profile">
            Profile
          </Tabs.Tab>
          <Tabs.Tab component={Text} value="recipes">
            My recipes
          </Tabs.Tab>
          <Tabs.Tab component={Text} value="favorites">
            Favorites
          </Tabs.Tab>
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
