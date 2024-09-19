import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Tabs, Text } from '@mantine/core';

import classes from './ProfilePage.module.css';
import ProfileTab from './TabContents/ProfileTab';
import MyRecipesTab from './TabContents/MyRecipesTab';
import FavoritesTab from './TabContents/FavoritesTab';
import Seo from '../../components/Seo';
import { userMessages } from '../../messages';

const ProfilePage = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { profileTab } = useParams();

  return (
    <Container
      size="xl"
      id="profile-page"
      p={{
        base: '0',
        md: 'md',
      }}
    >
      <Seo
        title="Cookbook - Where the the recipes turn into magic!"
        description="Cookbook is a platform where you can share your recipes with the world. Start crafting your own cookbook today!"
        keywords="cookbook, recipes, cooking, food, sharing, community"
        type="website"
        name="Cookbook"
        url="https://cookbook-vite.vercel.app/"
        canonicalUrl="https://cookbook-vite.vercel.app/"
        locale="en_GB"
      />
      <Tabs
        className={classes['tab-container']}
        value={profileTab}
        onChange={value => navigate(`/me/${value}`)}
        color="pink.7"
        radius="xl"
      >
        <Tabs.List>
          <Tabs.Tab component={Text} value="profile">
            {formatMessage(userMessages.profileTabTitle)}
          </Tabs.Tab>
          <Tabs.Tab component={Text} value="recipes">
            {formatMessage(userMessages.myRecipesTabTitle)}
          </Tabs.Tab>
          <Tabs.Tab component={Text} value="favorites">
            {formatMessage(userMessages.favoritesTabTitle)}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile">
          <ProfileTab />
        </Tabs.Panel>
        <Tabs.Panel value="recipes">
          <MyRecipesTab />
        </Tabs.Panel>
        <Tabs.Panel value="favorites">
          <FavoritesTab />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;
