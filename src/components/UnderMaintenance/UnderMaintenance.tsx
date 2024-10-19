import { Title, Text, Button } from '@mantine/core';
import cx from 'clsx';

import classes from './UnderMaintenance.module.css';
import { useGlobalState } from '../../store/Global';

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
      <Button className={classes.button} size="md" variant="filled" color="pink">
        Back to home page
      </Button>
    </div>
  );
};

export default UnderMaintenance;
