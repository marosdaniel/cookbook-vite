import { LoadingOverlay } from '@mantine/core';
import loadable from '@loadable/component';

import { ENonProtectedRoutes } from './types';

const Home = loadable(() => import('../pages/HomePage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const Signin = loadable(() => import('../pages/SigninPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const ResetPassword = loadable(() => import('../pages/ResetPasswordPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const NewPassword = loadable(() => import('../pages/NewPasswordPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const RecipeDetails = loadable(() => import('../pages/RecipeDetailsPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const Recipes = loadable(() => import('../pages/RecipesPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const User = loadable(() => import('../pages/UserPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const TipsAndTricks = loadable(() => import('../pages/TipsAndTricksPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const PrivacyPolicy = loadable(() => import('../pages/PrivacyPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});
const CookiePolicy = loadable(() => import('../pages/CookiePolicyPage'), {
  fallback: <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />,
});

export const nonProtectedRoutes = [
  {
    path: ENonProtectedRoutes.HOME,
    component: Home,
  },
  {
    path: ENonProtectedRoutes.SIGNIN,
    component: Signin,
  },
  {
    path: ENonProtectedRoutes.RESET_PASSWORD,
    component: ResetPassword,
  },
  {
    path: ENonProtectedRoutes.NEW_PASSWORD,
    component: NewPassword,
  },

  {
    path: `${ENonProtectedRoutes.RECIPES}/:id/*`,
    component: RecipeDetails,
  },
  {
    path: ENonProtectedRoutes.RECIPES,
    component: Recipes,
  },
  {
    path: `${ENonProtectedRoutes.USERS}/:userName/*`,
    component: User,
  },
  {
    path: ENonProtectedRoutes.TIPS_AND_TRICKS,
    component: TipsAndTricks,
  },
  {
    path: ENonProtectedRoutes.PRIVACY_POLICY,
    component: PrivacyPolicy,
  },
  {
    path: ENonProtectedRoutes.COOKIE_POLICY,
    component: CookiePolicy,
  },
];
