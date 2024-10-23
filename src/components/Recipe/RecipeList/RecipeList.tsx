import { Grid } from '@mantine/core';
import { TRecipe } from '../../../store/Recipe/types';
import RecipeCard from '../RecipeCard';
import { IProps } from './types';

const RecipeList = ({ recipes }: IProps) => {
  const sortedByDate = [...recipes].sort((a: TRecipe, b: TRecipe) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Grid>
      {sortedByDate.map(recipe => (
        <Grid.Col
          key={recipe._id}
          span={{
            sm: 12,
            md: 6,
            lg: 4,
          }}
        >
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            description={recipe.description}
            createdBy={recipe.createdBy}
            id={recipe._id || ''}
            imgSrc={recipe.imgSrc}
            isFavorite={recipe.isFavorite}
            averageRating={recipe.averageRating ?? 0}
            ratingsCount={recipe.ratingsCount ?? 0}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default RecipeList;
