import { IProps } from './types';

const RecipeList = ({ recipes }: IProps) => {
  // const sortedByDate = [...recipes].sort((a: TRecipe, b: TRecipe) => {
  //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // });

  console.log(recipes);
  return (
    // <Box component="ul" sx={gridStyles}>
    //   {sortedByDate.map((recipe: TRecipe, index) => {
    //     const {
    //       // eslint-disable-next-line @typescript-eslint/naming-convention
    //       _id,
    //       title,
    //       description,
    //       createdBy,
    //       createdAt,
    //       ingredients,
    //       updatedAt,
    //       imgSrc,
    //     } = recipe;
    //     return (
    //       <RecipeCard
    //         key={_id || index}
    //         title={title}
    //         description={description}
    //         createdAt={createdAt}
    //         createdBy={createdBy}
    //         ingredients={ingredients}
    //         updatedAt={updatedAt}
    //         id={_id}
    //         imgSrc={imgSrc}
    //       />
    //     );
    //   })}
    // </Box>
    <div>asd</div>
  );
};

export default RecipeList;
