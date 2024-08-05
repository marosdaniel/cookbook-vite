import { Link as RouterLink } from 'react-router-dom';
import { Button, Title } from '@mantine/core';
import { ENonProtectedRoutes } from '../../router/types';
import { Iprops } from './types';

const Logo = ({ headingSize }: Iprops) => {
  return (
    <Button component={RouterLink} to={ENonProtectedRoutes.HOME} variant="white">
      <Title c="pink.7" order={headingSize || 2}>
        CookBook
      </Title>
    </Button>
  );
};

export default Logo;
