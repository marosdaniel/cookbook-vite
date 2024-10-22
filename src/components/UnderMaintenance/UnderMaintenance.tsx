import { Title, Text, Button } from '@mantine/core';
import cx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { useGlobalState } from '../../store/Global';

import classes from './UnderMaintenance.module.css';
import { ENonProtectedRoutes } from '../../router/types';

const UnderMaintenance = () => {
  const { isDarkMode } = useGlobalState();

  const wrapperClasses = cx(classes.wrapper, {
    [classes.dark]: isDarkMode,
  });
  return (
    <div className={wrapperClasses}>
      <Title className={classes.title} order={1} mb="xl">
        Page under Maintenance
      </Title>
      <Text className={classes.text}>
        We are currently performing scheduled maintenance. <br /> We'll be back soon!
      </Text>
      <Button
        component={RouterLink}
        to={ENonProtectedRoutes.HOME}
        className={classes.button}
        size="md"
        variant="filled"
        color="pink"
      >
        Back to home page
      </Button>
    </div>
  );
};

export default UnderMaintenance;
