import { ENonProtectedRoutes, EProtectedRoutes } from '../../router/types';

export interface IProps {
  children: JSX.Element;
}

interface IMenuItemBase {
  name: string;
  path?: ENonProtectedRoutes | EProtectedRoutes;
  iconComponent: React.FC<any>;
  disabled: boolean;
  hidden: boolean;
  key: string;
}

export interface IBottomMenuItem extends IMenuItemBase {
  action?: () => void;
}

export interface ITopMenuItem extends IMenuItemBase {}
