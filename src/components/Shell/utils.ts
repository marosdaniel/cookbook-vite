import { sidebarMessages } from './../../messages/sidebar';
import { useIntl } from 'react-intl';
import { BsBook } from 'react-icons/bs';
import { FaBlog } from 'react-icons/fa';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { MdAdminPanelSettings } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineCreate } from 'react-icons/md';
import { FaRegFileAlt } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';

import { ERole } from './../../store/Auth/types';
import { logout } from '../../store/Auth/auth';
import { useAuthState } from './../../store/Auth/selectors';
import { useAppDispatch } from '../../store/hooks';
import { ENonProtectedRoutes, EProtectedRoutes } from '../../router/types';

import { IBottomMenuItem, ITopMenuItem } from './types';

export const useTopMenuItems = (): ITopMenuItem[] => {
  const { formatMessage } = useIntl();
  return [
    {
      name: formatMessage(sidebarMessages.recipes),
      path: ENonProtectedRoutes.RECIPES,
      iconComponent: BsBook,
      hidden: false,
      key: 'recipes',
      disabled: false,
    },
    {
      name: formatMessage(sidebarMessages.blogs),
      path: ENonProtectedRoutes.BLOGS,
      iconComponent: FaBlog,
      hidden: false,
      key: 'blogs',
      disabled: true,
    },
    {
      name: formatMessage(sidebarMessages.tipsAndTricks),
      path: ENonProtectedRoutes.TIPS_AND_TRICKS,
      iconComponent: MdOutlineTipsAndUpdates,
      hidden: false,
      key: 'tips-and-tricks',
      disabled: false,
    },
  ];
};

export const useBottomMenuItems = (): IBottomMenuItem[] => {
  const { isAuthenticated, user } = useAuthState();
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return [
    {
      name: formatMessage(sidebarMessages.admin),
      path: EProtectedRoutes.ADMIN_USERS,
      iconComponent: MdAdminPanelSettings,
      disabled: user?.role !== ERole.ADMIN,
      key: 'admin',
      hidden: user?.role !== ERole.ADMIN,
    },
    {
      name: formatMessage(sidebarMessages.profile),
      path: EProtectedRoutes.PROFILE,
      iconComponent: CgProfile,
      disabled: false,
      key: 'profile',
      hidden: !isAuthenticated,
    },
    {
      name: formatMessage(sidebarMessages.myRecipes),
      path: EProtectedRoutes.MY_RECIPES,
      iconComponent: FaRegFileAlt,
      hidden: !isAuthenticated,
      key: 'my-recipes',
      disabled: false,
    },
    {
      name: formatMessage(sidebarMessages.newRecipe),
      path: EProtectedRoutes.NEW_RECIPE,
      iconComponent: MdOutlineCreate,
      hidden: !isAuthenticated,
      key: 'new-recipe',
      disabled: false,
    },
    {
      name: formatMessage(sidebarMessages.logout),
      action: handleLogout,
      iconComponent: LuLogOut,
      hidden: !isAuthenticated,
      key: 'logout',
      disabled: false,
    },
  ];
};
