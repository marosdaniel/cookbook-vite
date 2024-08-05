import { Link as RouterLink } from 'react-router-dom';
import { Button, Title } from '@mantine/core';
import { TProps } from './types';
import { ENonProtectedRoutes } from '../../router/types';

const Logo = ({ headingSize }: TProps) => {
  return (
    <Button component={RouterLink} to={ENonProtectedRoutes.HOME} variant="white">
      <Title c="pink.7" order={headingSize || 2}>
        CookBook
      </Title>
    </Button>
  );
};

export default Logo;
