import { useNavigate, useParams } from 'react-router-dom';
import { Container, Tabs, Text } from '@mantine/core';

import classes from './AdminPage.module.css';
import CategoriesTab from './TabContents/CategoriesTab';
import LabelsTab from './TabContents/LabelsTab';
import UnitsTab from './TabContents/UnitsTab';
import UsersTab from './TabContents/UsersTab';

const AdminPage = () => {
  const navigate = useNavigate();
  const { adminTab } = useParams();

  return (
    <Container
      size="xl"
      id="admin-page"
      p={{
        base: 'xs',
        md: 'md',
      }}
    >
      <Tabs
        className={classes['tab-container']}
        value={adminTab}
        onChange={value => navigate(`/admin/${value}`)}
        color="pink.7"
        radius="md"
      >
        <Tabs.List>
          <Tabs.Tab value="users">
            <Text size="md">users</Text>
          </Tabs.Tab>
          <Tabs.Tab value="units">
            <Text size="md">units</Text>
          </Tabs.Tab>
          <Tabs.Tab value="labels">
            <Text size="md">labels</Text>
          </Tabs.Tab>
          <Tabs.Tab value="categories">
            <Text size="md">categories</Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="users">
          <UsersTab />
        </Tabs.Panel>
        <Tabs.Panel value="units">
          <UnitsTab />
        </Tabs.Panel>
        <Tabs.Panel value="labels">
          <LabelsTab />
        </Tabs.Panel>
        <Tabs.Panel value="categories">
          <CategoriesTab />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default AdminPage;
