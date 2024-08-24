import { useState } from 'react';
import { Button, Group, NumberInput, Paper, Select, TextInput } from '@mantine/core';
import { FaPlus } from 'react-icons/fa6';

import { TIngredient } from '../../../../store/Recipe/types';
import { useAppDispatch } from '../../../../store/hooks';
import { useGetUnits } from '../utils';
import { IProps } from './types';

const IngredientsEditor = ({
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
  const transformedUnits = units.map(unit => ({ value: unit.key, label: unit.label }));
  const initialIngredients = [{ name: '', quantity: '', unit: undefined }];

  const [ingredients, setIngredients] = useState(
    values.ingredients.length > 0 ? values.ingredients : initialIngredients,
  );

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, initialIngredients]);
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {ingredients.map((ingredient, index) => (
        <Group key={index} mt="md" justify="space-between">
          <TextInput
            placeholder="Ingredient"
            value={ingredient.name}
            onChange={event => handleIngredientChange(index, 'name', event.currentTarget.value)}
            required
          />
          <NumberInput
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={value => handleIngredientChange(index, 'quantity', value)}
            required
          />
          <Select
            placeholder="Unit"
            data={transformedUnits}
            // onChange={value => {
            //   const selectedCategory = cleanedCategories.find(cat => cat.key === value);
            //   setFieldValue('category', selectedCategory);
            // }}
            // value={values.category?.key || ''}
            // value={ingredient.unit}
            // onChange={value => handleIngredientChange(index, 'unit', value)}
            value={ingredient.unit}
            onChange={value => handleIngredientChange(index, 'unit', value)}
            required
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 80 }, shadow: 'md' }}
          />
        </Group>
      ))}
      <Button mt="lg" fullWidth onClick={addIngredient} leftSection={<FaPlus />}>
        Add Ingredient
      </Button>
    </Paper>
  );
};

export default IngredientsEditor;
