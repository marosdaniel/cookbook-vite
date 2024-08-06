import { useNavigate, useParams } from 'react-router-dom';
import { Container, Tabs } from '@mantine/core';

import classes from './AdminPage.module.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const { adminTab } = useParams();

  return (
    <Container size="xl" id="admin-page">
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
        <Tabs.Panel value="users">user content</Tabs.Panel>
        <Tabs.Panel value="units">units content</Tabs.Panel>
        <Tabs.Panel value="labels">labels content</Tabs.Panel>
        <Tabs.Panel value="categories">categories content</Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default AdminPage;
