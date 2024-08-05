import { Link as RouterLink } from 'react-router-dom';
import { Card, Badge, Group, Center, Avatar, ActionIcon, Image, Text } from '@mantine/core';
import { IProps } from './types';

const RecipeCard = ({ title, description, createdBy, id }: IProps) => {
  // TODO: Add image or placeholder image
  return (
    <Card withBorder radius="md">
      <Card.Section>
        <RouterLink to={`/recipes/${id}`}>
          <Image src="https://cdn-icons-png.flaticon.com/256/6039/6039575.png" height={180} fit="contain" />
        </RouterLink>
      </Card.Section>

      <Badge variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        outstanding
      </Badge>

      <Text fw={500} component={RouterLink} to={`/recipes/${id}`} mt={'md'}>
        {title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4} mt={'md'}>
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
            {createdBy}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <ActionIcon>
            {/* <IconHeart style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} /> */}
          </ActionIcon>
          <ActionIcon>
            {/* <IconBookmark style={{ width: rem(16), height: rem(16) }} color={theme.colors.yellow[7]} /> */}
          </ActionIcon>
          <ActionIcon>
            {/* <IconShare style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} /> */}
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};

export default RecipeCard;
