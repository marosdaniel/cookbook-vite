import loadable from '@loadable/component';
import { LoadingOverlay } from '@mantine/core';
import { EProtectedRoutes } from './types';

const Profile = loadable(() => import('../pages/ProfilePage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const NewRecipe = loadable(() => import('../pages/NewRecipePage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const AdminPage = loadable(() => import('../pages/AdminPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});

export const protectedRoutes = [
  {
    path: `${EProtectedRoutes.ME}/:profileTab/*`,
    component: Profile,
  },

  {
    path: EProtectedRoutes.NEW_RECIPE,
    component: NewRecipe,
  },
  {
    path: `${EProtectedRoutes.ADMIN}/:adminTab/*`,
    component: AdminPage,
    adminOnly: true,
  },
];
