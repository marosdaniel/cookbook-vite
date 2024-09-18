import { useIntl } from 'react-intl';
import { Title, List, ThemeIcon, Paper } from '@mantine/core';
import { BsCheck } from 'react-icons/bs';
import { miscMessages } from '../../../messages';
import { MiscMessages } from '../../../providers/IntlProviderContainer/types';
import { IProps } from './types';

const IngredientList = ({ ingredients, title }: IProps) => {
  const { formatMessage } = useIntl();
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
          return (
            <List.Item
              key={index}
            >{`${name} - ${quantity} ${formatMessage((miscMessages as MiscMessages)[unit])}`}</List.Item>
            // >{`${name} - ${quantity} `}</List.Item>
          );
        })}
      </List>
    </Paper>
  );
};

export default IngredientList;
