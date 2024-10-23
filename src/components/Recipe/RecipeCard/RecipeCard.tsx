import { Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import cx from 'clsx';
import { ActionIcon, Avatar, Badge, Card, Center, Flex, Group, Image, Rating, Text, Tooltip } from '@mantine/core';

import { useAuthState } from '../../../store/Auth';

import { getHost } from '../../../utils/getHost';
import { ENonProtectedRoutes } from '../../../router/types';
import { useGlobalState } from '../../../store/Global';
import CopyActionButton from '../../CopyActionButton';
import LinkToUser from '../../LinkToUser';

import FavoriteToggler from '../FavoriteToggler';
import { IProps } from './types';

import classes from './RecipeCard.module.css';
import { recipeMessages } from '../../../messages';

const RecipeCard = ({
  title,
  description,
  createdBy,
  id,
  imgSrc,
  isFavorite: initialIsFavorite,
  averageRating,
  ratingsCount,
}: IProps) => {
  const { isDarkMode } = useGlobalState();
  const { formatMessage } = useIntl();

  const wrapperClasses = cx({
    [classes.dark]: isDarkMode,
  });
  const { user } = useAuthState();
  const userId = user?._id ?? '';
  const recipePath = `${getHost()}${ENonProtectedRoutes.RECIPES}/${id}`;

  const isOutstanding = averageRating >= 4.7;
  const ratingTooltipLabel =
    ratingsCount === 0 ? formatMessage(recipeMessages.notRatedYet) : `${averageRating} (${ratingsCount})`;

  return (
    <Card radius="md" h={400} shadow="lg" bg="gray.0" className={wrapperClasses}>
      <Card.Section>
        <RouterLink to={`${ENonProtectedRoutes.RECIPES}/${id}`}>
          <Image
            src={imgSrc ?? 'https://cdn-icons-png.flaticon.com/256/6039/6039575.png'}
            height={188}
            radius="md"
            fit="scale-down"
          />
        </RouterLink>
      </Card.Section>

      <Flex direction="row" justify={isOutstanding ? 'space-between' : 'flex-end'} align="center" mt="md">
        {isOutstanding && (
          <Badge size="sm" variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
            outstanding
          </Badge>
        )}
        {/* <RatingSelector recipeId={id} initialUserRating={initialUserRating} userName={user?.userName!} /> */}
        <Tooltip label={ratingTooltipLabel} position="top">
          <Rating defaultValue={averageRating} readOnly fractions={10} />
        </Tooltip>
      </Flex>
      <Text fw={500} component={RouterLink} to={`/recipes/${id}`} mt="lg">
        {title}
      </Text>

      <Text fz="xs" c="dimmed" lineClamp={4} mt="md">
        {description}
      </Text>

      <Group justify="space-between" mt="md">
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
          {userId && (
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
