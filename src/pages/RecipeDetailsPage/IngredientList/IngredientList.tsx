import { IProps } from './types';

const IngredientList = ({ ingredients, title }: IProps) => {
  return (
    // <>
    //   <Typography variant="h5">{title}</Typography>
    //   <List id="ingredients">
    //     {ingredients.map(ingredient => {
    //       const { name, quantity, unit } = ingredient;
    //       const listItemText = `${name} - ${quantity} ${unit}`;
    //       return (
    //         <ListItem key={name}>
    //           <ListItemText primary={listItemText} />
    //         </ListItem>
    //       );
    //     })}
    //   </List>
    // </>
    <div>
      <div>{ingredients.length}</div>
      <div>{title}</div>
    </div>
  );
};

export default IngredientList;
