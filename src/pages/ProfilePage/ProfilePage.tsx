import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { EProtectedRoutes } from '../../router/types';
import { Container } from '@mantine/core';

const ProfilePage = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === EProtectedRoutes.ME) navigate(EProtectedRoutes.PROFILE);

    if (path === EProtectedRoutes.PROFILE) {
      setValue(0);
    } else if (path === EProtectedRoutes.MY_RECIPES) {
      setValue(1);
    } else if (path === EProtectedRoutes.FAVORITES) {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [location, navigate]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate(EProtectedRoutes.PROFILE);
        break;
      case 1:
        navigate(EProtectedRoutes.MY_RECIPES);
        break;
      case 2:
        navigate(EProtectedRoutes.FAVORITES);
        break;
      default:
        break;
    }
  };

  return (
    // <WrapperContainer id="profile-page">
    //   <Tabs
    //     value={value}
    //     onChange={handleChange}
    //     aria-label="basic tabs example"
    //     variant="scrollable"
    //     scrollButtons="auto"
    //     allowScrollButtonsMobile
    //   >
    //     <Tab label="Profile" {...a11yProps(0)} />
    //     <Tab label="Recipes" {...a11yProps(1)} />
    //     <Tab label="Favorite recipes" {...a11yProps(2)} />
    //   </Tabs>
    //   <CustomTabPanel value={value} index={0}>
    //     <ProfileTab />
    //   </CustomTabPanel>
    //   <CustomTabPanel value={value} index={1}>
    //     <MyRecipesTab />
    //   </CustomTabPanel>
    //   <CustomTabPanel value={value} index={2}>
    //     <FavoritesTab />
    //   </CustomTabPanel>
    // </WrapperContainer>
    <Container size="xl" id="profile-page">
      <h1>Profile page</h1>
    </Container>
  );
};

export default ProfilePage;
