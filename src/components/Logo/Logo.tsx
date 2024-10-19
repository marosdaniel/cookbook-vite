import { Link as RouterLink } from 'react-router-dom';
import cx from 'clsx';
import { Button, Title } from '@mantine/core';
import { ENonProtectedRoutes } from '../../router/types';
import { useGlobalState } from '../../store/Global';
import { Iprops } from './types';

import classes from './Logo.module.css';

const Logo = ({ headingSize }: Iprops) => {
  const { isDarkMode } = useGlobalState();

  const buttonClasses = cx({
    [classes.dark]: isDarkMode,
  });

  return (
    <Button component={RouterLink} to={ENonProtectedRoutes.HOME} variant="white" className={buttonClasses}>
      <Title c="pink.7" order={headingSize || 2}>
        CookBook
      </Title>
    </Button>
  );
};

export default Logo;
