import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { nonProtectedRoutes } from './nonProtectedRoutes';
import { ENonProtectedRoutes } from './types';
import Shell from '../components/Shell';

// const NotFound = loadable(() => import('../pages/NotFoundPage'), {
//   fallback: <LoadingBar />,
// });

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
          <>
            <Shell>
              <Component />
            </Shell>
          </>
        ) : (
          <Component />
        )}
      </>
    ),
  })),
  // ...protectedRoutes.map(({ path, component: Component }) => ({
  //   path,
  //   element: (
  //     <Authenticated>
  //       <AppBar />
  //       <PageWrapper>
  //         <Component />
  //         <Footer />
  //       </PageWrapper>
  //     </Authenticated>
  //   ),
  // })),
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

const AppNavigation = () => <RouterProvider router={router} />;

export default AppNavigation;
