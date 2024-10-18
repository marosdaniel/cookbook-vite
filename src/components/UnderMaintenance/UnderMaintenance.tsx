import { Title, Text, Button } from '@mantine/core';

import classes from './UnderMaintenance.module.css';

const UnderMaintenance = () => {
  return (
    <div className={classes.wrapper}>
      <Title className={classes.title} order={1} c="gray.7" mb="xl">
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
