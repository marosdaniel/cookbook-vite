import { List, Paper, ThemeIcon, Title } from '@mantine/core';
import { BsCheck } from 'react-icons/bs';
import { IProps } from './types';

const PreparationStepList = ({ preparationSteps, title }: IProps) => {
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
        {preparationSteps?.map(step => (
          <List.Item key={step.order}>
            {step.order}. {step.description}
          </List.Item>
        ))}
      </List>
    </Paper>
  );
};

export default PreparationStepList;
