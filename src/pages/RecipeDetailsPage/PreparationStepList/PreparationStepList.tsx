import { IProps } from './types';

const PreparationStepList = ({ preparationSteps, title }: IProps) => {
  return (
    // <>
    //   <Typography variant="h5">{title}</Typography>
    //   <List id="preparation-steps" sx={{ listStyle: 'decimal', pl: 4 }}>
    //     {preparationSteps.map(step => (
    //       <ListItem key={step.order} sx={{ display: 'list-item' }}>
    //         <ListItemText primary={step.description} />
    //       </ListItem>
    //     ))}
    //   </List>
    // </>
    <div>
      {title}
      {preparationSteps.length}
    </div>
  );
};

export default PreparationStepList;
