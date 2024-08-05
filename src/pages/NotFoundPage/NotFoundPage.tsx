import { Link as RouterLink } from 'react-router-dom';
import { Container, SimpleGrid, Title, Button, Text, Image } from '@mantine/core';
import Seo from '../../components/Seo';
import { ENonProtectedRoutes } from '../../router/types';

import classNames from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const imgSrc = 'https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg';
  return (
    <Container className={classNames.container} id="not-found-page" size="xl">
      <Seo
        title="Page not found"
        description="Page not found"
        keywords="page not found, 404, error"
        type="website"
        name="Page not found"
        url="https://cookbook-vite.vercel.app/"
        canonicalUrl="https://cookbook-vite.vercel.app/"
        locale="en_GB"
      />
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
