import { Title, List, ThemeIcon, Box } from '@mantine/core';
import { BsCheck } from 'react-icons/bs';
import { IProps } from './types';

const IngredientList = ({ ingredients, title }: IProps) => {
  return (
    <Box mt="xl">
      <Title order={5} mb="lg">
        {title}
      </Title>
      <List
        withPadding
        spacing="md"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={20} radius="xl">
            <BsCheck size={16} />
          </ThemeIcon>
        }
      >
        {ingredients?.map((ingredient, index) => {
          const { name, quantity, unit } = ingredient;
          return <List.Item key={index}>{`${name} - ${quantity} ${unit}`}</List.Item>;
        })}
      </List>
    </Box>
  );
};

export default IngredientList;
