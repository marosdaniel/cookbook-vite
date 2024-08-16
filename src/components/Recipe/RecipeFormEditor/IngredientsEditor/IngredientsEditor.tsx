import { useState } from 'react';

import { TIngredient } from '../../../../store/Recipe/types';
import { useAppDispatch } from '../../../../store/hooks';
import { useGetUnits } from '../utils';
import { IProps } from './types';
import { Button, Group, NumberInput, Paper, Select, TextInput } from '@mantine/core';

const IngredientsEditor = ({
  ingredients,
  isEditMode,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  touched,
  values,
}: IProps) => {
  const dispatch = useAppDispatch();
  const units = useGetUnits();

  const units1 = [
    { value: 'g', label: 'gramm' },
    { value: 'kg', label: 'kilogramm' },
    { value: 'ml', label: 'milliliter' },
    { value: 'l', label: 'liter' },
    { value: 'tbsp', label: 'evőkanál' },
    { value: 'tsp', label: 'teáskanál' },
  ];
  const [ingredients1, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients1];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients1, { name: '', quantity: '', unit: '' }]);
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {ingredients1.map((ingredient, index) => (
        <Group key={index} mt="md" justify="space-between">
          <TextInput
            placeholder="Hozzávaló neve"
            value={ingredient.name}
            onChange={event => handleIngredientChange(index, 'name', event.currentTarget.value)}
            required
          />
          <NumberInput
            placeholder="Mennyiség"
            value={ingredient.quantity}
            onChange={value => handleIngredientChange(index, 'quantity', value)}
            required
          />
          <Select
            placeholder="Mértékegység"
            data={units1}
            value={ingredient.unit}
            onChange={value => handleIngredientChange(index, 'unit', value)}
            required
          />
        </Group>
      ))}
      <Button mt="md" fullWidth onClick={addIngredient}>
        + Hozzávaló hozzáadása
      </Button>
    </Paper>
  );
};

export default IngredientsEditor;
