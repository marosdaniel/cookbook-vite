import { IProps } from './types';
import { Paper, Title, Textarea, Button, Group, ActionIcon } from '@mantine/core';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa6';

const PreparationStepsEditor = ({ values, setFieldValue }: IProps) => {
  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...values.preparationSteps];
    newSteps[index].description = value;
    setFieldValue('preparationSteps', newSteps);
  };

  const addStep = () => {
    const newSteps = [...values.preparationSteps, { description: '', order: values.preparationSteps.length + 1 }];
    setFieldValue('preparationSteps', newSteps);
  };

  const deleteStep = (index: number) => {
    const newSteps = values.preparationSteps
      .filter((_, i) => i !== index)
      .map((step, i) => ({
        ...step,
        order: i + 1, // update order after deletion
      }));
    setFieldValue('preparationSteps', newSteps);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...values.preparationSteps];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    if (swapIndex >= 0 && swapIndex < newSteps.length) {
      [newSteps[index], newSteps[swapIndex]] = [newSteps[swapIndex], newSteps[index]]; // Swap the steps
      newSteps.forEach((step, i) => (step.order = i + 1)); // Reorder after swapping
      setFieldValue('preparationSteps', newSteps);
    }
  };

  const isAddDisabled = values.preparationSteps.some(step => step.description.trim() === '');

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={3} mt={0}>
        Add Instructions
      </Title>

      {values.preparationSteps.map((step, index) => (
        <Group key={index} mt="md" align="flex-start">
          <Textarea
            placeholder={`Step ${index + 1}`}
            value={step.description}
            onChange={event => handleStepChange(index, event.currentTarget.value)}
            autosize
            minRows={2}
            required
            style={{ flex: 1 }}
          />
          <Group>
            <ActionIcon onClick={() => moveStep(index, 'up')} disabled={index === 0} aria-label="Move step up">
              <FaArrowUp />
            </ActionIcon>
            <ActionIcon
              onClick={() => moveStep(index, 'down')}
              disabled={index === values.preparationSteps.length - 1}
              aria-label="Move step down"
            >
              <FaArrowDown />
            </ActionIcon>
          </Group>
          <ActionIcon color="red" variant="outline" onClick={() => deleteStep(index)} aria-label="Delete step">
            <FaTrash />
          </ActionIcon>
        </Group>
      ))}

      <Button mt="lg" fullWidth onClick={addStep} leftSection={<FaPlus />} disabled={isAddDisabled}>
        Add Step
      </Button>
    </Paper>
  );
};

export default PreparationStepsEditor;
