import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from '@apollo/client';
import { Loader, Rating } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RATE_RECIPE } from '../../../graphql/recipe/rateRecipe';
import { GET_RECIPES, GET_RECIPES_BY_USER_NAME } from '../../../graphql/recipe/getRecipes';
import { responseMessages } from '../../../messages';
import { IProps } from './types';

const RatingSelector = ({ recipeId, initialUserRating, userName }: IProps) => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState<number>(initialUserRating ?? 0);

  const [rateRecipe, { loading }] = useMutation(RATE_RECIPE, {
    variables: {
      ratingInput: {
        recipeId,
        ratingValue: value,
      },
    },
    refetchQueries: [{ query: GET_RECIPES }, { query: GET_RECIPES_BY_USER_NAME, variables: { userName } }],
    onCompleted: () => {
      notifications.show({
        title: formatMessage(responseMessages.success),
        message: formatMessage(responseMessages.ratingSuccess),
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: formatMessage(responseMessages.error),
        message: formatMessage(responseMessages.ratingFailed),
        color: 'red',
      });
    },
  });

  const handleRate = async () => {
    await rateRecipe();
    setValue(value);
  };

  if (loading) {
    return <Loader color="pink.7" type="dots" />;
  }
  return <Rating value={value} onChange={handleRate} />;
};

export default RatingSelector;
