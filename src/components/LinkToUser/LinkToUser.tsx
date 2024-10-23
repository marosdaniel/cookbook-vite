import { Link as RouterLink } from 'react-router-dom';
import { Anchor } from '@mantine/core';
import { IProps } from './types';
import { ENonProtectedRoutes } from '../../router/types';

const LinkToUser = ({ userName, disableClick = false }: IProps) => {
  return (
    <Anchor
      size="sm"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      component={disableClick ? 'span' : (RouterLink as any)}
      to={disableClick ? undefined : `${ENonProtectedRoutes.USERS}/${userName}`}
      style={disableClick ? { cursor: 'default', textDecoration: 'none' } : {}}
    >
      {userName}
    </Anchor>
  );
};

export default LinkToUser;
