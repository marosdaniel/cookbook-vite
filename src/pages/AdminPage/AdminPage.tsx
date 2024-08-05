import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EProtectedRoutes } from '../../router/types';
import { Container } from '@mantine/core';

const AdminPage = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const routes: { [key: string]: number } = {
      [EProtectedRoutes.ADMIN_USERS]: 0,
      [EProtectedRoutes.ADMIN_CATEGORIES]: 1,
      [EProtectedRoutes.ADMIN_UNITS]: 2,
      [EProtectedRoutes.ADMIN_LABELS]: 3,
    };

    setValue(routes[path] || 0);
  }, [location]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const routes = [
      EProtectedRoutes.ADMIN_USERS,
      EProtectedRoutes.ADMIN_CATEGORIES,
      EProtectedRoutes.ADMIN_UNITS,
      EProtectedRoutes.ADMIN_LABELS,
    ];
    navigate(routes[newValue]);
  };

  return (
    // <WrapperContainer id="admin-page">
    //   <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
    //     <Tab label="Users" {...a11yProps(0)} />
    //     <Tab label="Categories" {...a11yProps(1)} />
    //     <Tab label="Units" {...a11yProps(2)} />
    //     <Tab label="Labels" {...a11yProps(3)} />
    //   </Tabs>
    //   <CustomTabPanel value={value} index={0}>
    //     <UsersTab />
    //   </CustomTabPanel>
    //   <CustomTabPanel value={value} index={1}>
    //     <CategoriesTab />
    //   </CustomTabPanel>
    //   <CustomTabPanel value={value} index={2}>
    //     <UnitsTab />
    //   </CustomTabPanel>
    //   <CustomTabPanel value={value} index={3}>
    //     <LabelsTab />
    //   </CustomTabPanel>
    // </WrapperContainer>
    <Container size="xl">
      <h1>Admin Page</h1>
    </Container>
  );
};

export default AdminPage;
