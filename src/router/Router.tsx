import loadable from '@loadable/component';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import Shell from '../components/Shell';
import { nonProtectedRoutes } from './nonProtectedRoutes';
import { protectedRoutes } from './protectedRoutes';
import Authenticated from './Authenticated';
import { ENonProtectedRoutes } from './types';

const NotFound = loadable(() => import('../pages/NotFoundPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});

const isPathWithoutAppBar = (path: string) =>
  path !== ENonProtectedRoutes.SIGNIN &&
  path !== ENonProtectedRoutes.RESET_PASSWORD &&
  path !== ENonProtectedRoutes.NEW_PASSWORD;

export const router = createBrowserRouter([
  ...nonProtectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: (
      <>
        {isPathWithoutAppBar(path) ? (
          <Shell>
            <Component />
          </Shell>
        ) : (
          <Component />
        )}
      </>
    ),
  })),
  ...protectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: (
      <Authenticated>
        <Shell>
          <Component />
        </Shell>
      </Authenticated>
    ),
  })),
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppNavigation = () => <RouterProvider router={router} />;

export default AppNavigation;
