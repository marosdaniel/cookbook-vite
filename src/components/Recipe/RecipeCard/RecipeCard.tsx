import { Link as RouterLink } from 'react-router-dom';
import { Card, Badge, Group, Center, Avatar, ActionIcon, Image, Text, Anchor } from '@mantine/core';
import { IProps } from './types';

const RecipeCard = ({ title, description, createdBy, id }: IProps) => {
  const linkToUser = (userName: string) => (
    <Anchor
      size="sm"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      component={RouterLink}
      to={`/users/${userName}`}
    >
      {userName}
    </Anchor>
  );
  return (
    <Card radius="md" h={400} shadow="xl">
      <Card.Section>
        <RouterLink to={`/recipes/${id}`}>
          <Image src="https://cdn-icons-png.flaticon.com/256/6039/6039575.png" height={180} fit="contain" />
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
            {linkToUser(createdBy)}
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
