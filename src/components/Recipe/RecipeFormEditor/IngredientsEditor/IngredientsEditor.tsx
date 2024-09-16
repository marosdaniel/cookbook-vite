import { useEffect } from 'react';
import { Button, Group, NumberInput, Paper, Select, TextInput, ActionIcon, Title } from '@mantine/core';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import { TIngredient } from '../../../../store/Recipe/types';
import { isIngredientsFormValid, useGetUnits } from '../utils';
import { IProps } from './types';

const IngredientsEditor = ({ handleBlur, setFieldValue, handleChange, values }: IProps) => {
  const units = useGetUnits();
  const transformedUnits = units.map(unit => ({ value: unit.key, label: unit.label }));

  const initialIngredients: Partial<TIngredient>[] = [{ name: '', quantity: undefined, unit: '', localId: uuidv4() }];

  useEffect(() => {
    if (values.ingredients.length === 0) {
      setFieldValue('ingredients', initialIngredients);
    }
  }, [values.ingredients, setFieldValue]);

  const addIngredient = () => {
    const newIngredient = { ...initialIngredients[0], localId: uuidv4() };
    setFieldValue('ingredients', [...values.ingredients, newIngredient]);
  };

  const deleteIngredient = (index: number) => {
    const newIngredients = values.ingredients.filter((_, i) => i !== index);
    setFieldValue('ingredients', newIngredients.length > 0 ? newIngredients : []);
  };

  const addDisabled = isIngredientsFormValid(values);

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={3} mt={0}>
        Add Ingredients
      </Title>
      {values.ingredients.map((ingredient, index) => (
        <Group key={ingredient.localId || index} mt="md" justify="space-between">
          <TextInput
            placeholder="Ingredient"
            name={`ingredients[${index}].name`}
            value={ingredient.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <NumberInput
            placeholder="Quantity"
            name={`ingredients[${index}].quantity`}
            value={ingredient.quantity}
            onChange={value => setFieldValue(`ingredients[${index}].quantity`, value)}
            required
            min={0}
          />
          <Select
            placeholder="Unit"
            name={`ingredients[${index}].unit`}
            data={transformedUnits}
            value={ingredient.unit}
            onChange={value => setFieldValue(`ingredients[${index}].unit`, value ?? '')}
            required
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 80 }, shadow: 'md' }}
          />
          <ActionIcon
            color="red"
            variant="outline"
            onClick={() => deleteIngredient(index)}
            aria-label="Delete ingredient"
          >
            <FaTrash />
          </ActionIcon>
        </Group>
      ))}
      <Button
        mt="lg"
        fullWidth
        onClick={addIngredient}
        leftSection={<FaPlus />}
        disabled={addDisabled && values.ingredients.length > 0}
      >
        Add Ingredient
      </Button>
    </Paper>
  );
};

export default IngredientsEditor;
