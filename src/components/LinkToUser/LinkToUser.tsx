import { Link as RouterLink } from 'react-router-dom';
import { Anchor } from '@mantine/core';
import { IProps } from './types';
import { ENonProtectedRoutes } from '../../router/types';

const LinkToUser = ({ userName }: IProps) => {
  return (
    <Anchor
      size="sm"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      component={RouterLink}
      to={`${ENonProtectedRoutes.USERS}/${userName}`}
    >
      {userName}
    </Anchor>
  );
};

export default LinkToUser;
