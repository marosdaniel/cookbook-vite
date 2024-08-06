import { Box, List, ThemeIcon, Title } from '@mantine/core';
import { BsCheck } from 'react-icons/bs';
import { IProps } from './types';

const PreparationStepList = ({ preparationSteps, title }: IProps) => {
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
        {preparationSteps?.map(step => (
          <List.Item key={step.order}>
            {step.order}. {step.description}
          </List.Item>
        ))}
      </List>
    </Box>
  );
};

export default PreparationStepList;
