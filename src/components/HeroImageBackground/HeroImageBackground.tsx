import cx from 'clsx';
import { Title, Text, Container, Button } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { PropsWithChildren } from 'react';

const HeroImageBackground = ({ children }: PropsWithChildren) => {
  const wrapperClasses = cx(classes.wrapper, children ? classes.wrapperWithChildren : null);
  const baseContent = (
    <div className={classes.inner}>
      <Title className={classes.title}>
        Automated AI code reviews for{' '}
        <Text component="span" inherit className={classes.highlight}>
          any stack
        </Text>
      </Title>

      <Container size={640}>
        <Text size="lg" className={classes.description}>
          Build more reliable software with AI companion. AI is also trained to detect lazy developers who do nothing
          and just complain on Twitter.
        </Text>
      </Container>

      <div className={classes.controls}>
        <Button className={classes.control} variant="white" size="lg">
          Get started
        </Button>
        <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
          Live demo
        </Button>
      </div>
    </div>
  );

  return (
    <div className={wrapperClasses}>
      {/* <Overlay color="#000" opacity={0.65} zIndex={1} /> */}

      {children ?? baseContent}
    </div>
  );
};

export default HeroImageBackground;
