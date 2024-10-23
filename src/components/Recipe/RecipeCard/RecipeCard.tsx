import { Link as RouterLink } from 'react-router-dom';
import cx from 'clsx';
import { ActionIcon, Avatar, Badge, Card, Center, Group, Image, Text } from '@mantine/core';

import { useAuthState } from '../../../store/Auth';

import { getHost } from '../../../utils/getHost';
import { ENonProtectedRoutes } from '../../../router/types';
import { useGlobalState } from '../../../store/Global';
import CopyActionButton from '../../CopyActionButton';
import LinkToUser from '../../LinkToUser';

import FavoriteToggler from '../FavoriteToggler';
import { IProps } from './types';

import classes from './RecipeCard.module.css';

const RecipeCard = ({ title, description, createdBy, id, imgSrc, isFavorite: initialIsFavorite }: IProps) => {
  const { isDarkMode } = useGlobalState();

  const wrapperClasses = cx({
    [classes.dark]: isDarkMode,
  });
  const { user } = useAuthState();
  const userId = user?._id ?? '';
  const recipePath = `${getHost()}${ENonProtectedRoutes.RECIPES}/${id}`;

  return (
    <Card radius="md" h={400} shadow="lg" bg="gray.0" className={wrapperClasses}>
      <Card.Section>
        <RouterLink to={`${ENonProtectedRoutes.RECIPES}/${id}`}>
          <Image src={imgSrc ?? 'https://cdn-icons-png.flaticon.com/256/6039/6039575.png'} height={180} fit="contain" />
        </RouterLink>
      </Card.Section>

      <Badge size="sm" variant="gradient" gradient={{ from: 'yellow', to: 'red' }} mt={'md'}>
        outstanding
      </Badge>

      <Text fw={500} component={RouterLink} to={`/recipes/${id}`} mt={'md'}>
        {title}
      </Text>

      <Text fz="xs" c="dimmed" lineClamp={4} mt={'md'}>
        {description}
      </Text>

      <Group justify="space-between" mt={'md'}>
        <Center>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            <LinkToUser userName={createdBy} />
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          {user?._id && (
            <FavoriteToggler userId={userId} id={id} initialIsFavorite={initialIsFavorite} userName={createdBy} />
          )}
          <ActionIcon variant="transparent">
            <CopyActionButton path={recipePath} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};

export default RecipeCard;
