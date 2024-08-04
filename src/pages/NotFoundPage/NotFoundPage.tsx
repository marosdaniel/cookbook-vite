import { Link as RouterLink } from 'react-router-dom';

import { Container, SimpleGrid, Title, Button, Text, Image } from '@mantine/core';
import { ENonProtectedRoutes } from '../../router/types';

const NotFoundPage = () => {
  const imgSrc = 'https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg';
  return (
    <Container style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={imgSrc} />
        <div>
          <Title>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to
            another URL. If you think this is an error contact support.
          </Text>
          <Button component={RouterLink} to={ENonProtectedRoutes.HOME} variant="outline" size="md" mt="xl">
            Get back to home page
          </Button>
        </div>
        {/* <Image src={image.src} className={classes.desktopImage} /> */}
      </SimpleGrid>
    </Container>
  );
};

export default NotFoundPage;
