import { Title, List, ThemeIcon, Paper } from '@mantine/core';
import { BsCheck } from 'react-icons/bs';
import { IProps } from './types';

const IngredientList = ({ ingredients, title }: IProps) => {
  return (
    <Paper shadow="md" radius="lg" p="xl" m="32px auto" w={{ base: '100%', md: '80%', lg: '75%' }}>
      <Title order={5} mb="lg">
        {title}
      </Title>
      <List
        withPadding
        spacing="md"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={18} radius="xl">
            <BsCheck size={16} />
          </ThemeIcon>
        }
      >
        {ingredients?.map((ingredient, index) => {
          const { name, quantity, unit } = ingredient;
          return <List.Item key={index}>{`${name} - ${quantity} ${unit}`}</List.Item>;
        })}
      </List>
    </Paper>
  );
};

export default IngredientList;
