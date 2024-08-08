import { useNavigate, useParams } from 'react-router-dom';
import { Container, Tabs } from '@mantine/core';

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
        radius="xl"
      >
        <Tabs.List>
          <Tabs.Tab value="users">users</Tabs.Tab>
          <Tabs.Tab value="units">units</Tabs.Tab>
          <Tabs.Tab value="labels">labels</Tabs.Tab>
          <Tabs.Tab value="categories">categories</Tabs.Tab>
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
