import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';
import { Anchor, Avatar, Button, Divider, Flex, Group, Paper, Text } from '@mantine/core';
import { FaPlus } from 'react-icons/fa';

import { GET_USER_BY_USERNAME } from '../../../graphql/user/getUser';
import { IGetUserByUserNameData } from '../../../graphql/user/getUser/types';
import { userMessages } from '../../../messages';
import { IProps } from './types';

const AuthorSection: React.FC<IProps> = ({ author, isOwnRecipe }) => {
  const { formatMessage } = useIntl();
  const { data } = useQuery<IGetUserByUserNameData>(GET_USER_BY_USERNAME, {
    variables: { userName: author },
  });

  if (!data) {
    return null;
  }

  const { userName, favoriteRecipes, recipes } = data.getUserByUserName;
  const recipeCount = recipes?.length || 0;
  const favoriteRecipeCount = favoriteRecipes?.length || 0;

  const handleFollow = () => {
    console.log('follow');
  };

  return (
    <Paper shadow="xl" radius="lg" p="xl" component="section" id="author-section">
      <Group justify="center" id="avatar">
        <Avatar
          mt={-32}
          size={132}
          src="https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-2.jpg"
          alt="no image here"
          color="teal"
        />
      </Group>

      <Anchor
        mt="md"
        display="block"
        ta="center"
        size="xl"
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        component={RouterLink}
        to={`/users/${userName}`}
      >
        {userName}
      </Anchor>
      <Flex mt="lg" direction="column">
        <Flex justify="space-between">
          <Text size="sm" tt="uppercase" c="gray.7">
            {formatMessage(userMessages.recipes)}
          </Text>
          <Text size="sm" fw="bold" c="gray.7">
            {recipeCount}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text size="sm" tt="uppercase" c="gray.7">
            {formatMessage(userMessages.favorites)}
          </Text>
          <Text size="sm" fw="bold" c="gray.7">
            {favoriteRecipeCount}
          </Text>
        </Flex>
        <Divider mt="md" />
        <Flex justify="space-between" mt="md">
          <Text size="sm" tt="uppercase" c="gray.7">
            {formatMessage(userMessages.followings)}
          </Text>
          <Text size="sm" fw="bold" c="gray.7">
            {0}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text size="sm" tt="uppercase" c="gray.7">
            {formatMessage(userMessages.followers)}
          </Text>
          <Text size="sm" fw="bold" c="gray.7">
            {0}
          </Text>
        </Flex>
      </Flex>

      {!isOwnRecipe ? (
        <Flex mt="xl" justify="center">
          <Button variant="filled" color="pink" leftSection={<FaPlus />} onClick={handleFollow}>
            {formatMessage(userMessages.follow)}
          </Button>
        </Flex>
      ) : null}
    </Paper>
  );
};

export default AuthorSection;
