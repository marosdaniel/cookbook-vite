import { MultiSelect, NumberInput, Paper, TextInput } from '@mantine/core';
import { IProps } from './types';
import { cleanLabels, useGetLabels } from '../utils';

const GeneralsEditor = ({ handleChange, handleBlur, values, touched, errors, setFieldValue }: IProps) => {
  const labels = useGetLabels();
  const cleaned = cleanLabels(labels);
  const transformed = cleaned.map(label => ({ value: label.key, label: label.label }));
  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput
        required
        id="title"
        placeholder="title"
        mt="md"
        label="Title"
        name="title"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
        error={touched.title && Boolean(errors.title)}
        description={touched.title && Boolean(errors.title) ? 'Set your recipes title' : ''}
      />
      <TextInput
        required
        id="description"
        placeholder="description"
        mt="md"
        label="description"
        name="description"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        error={touched.description && Boolean(errors.description)}
        description={touched.description && Boolean(errors.description) ? 'Set your recipes description' : ''}
      />
      <TextInput
        required
        id="imgSrc"
        placeholder="imgSrc"
        mt="md"
        label="Image URL"
        name="imgSrc"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.imgSrc}
        error={touched.imgSrc && Boolean(errors.imgSrc)}
        description={touched.imgSrc && Boolean(errors.imgSrc) ? 'Set your recipes imgSrc' : ''}
      />
      <NumberInput
        required
        id="servings"
        placeholder="servings"
        mt="md"
        label="Servings"
        name="servings"
        min={0}
        max={100}
        onChange={value => setFieldValue('servings', value)}
        onBlur={handleBlur}
        value={values.servings}
        error={touched.servings && Boolean(errors.servings)}
        description={touched.servings && Boolean(errors.servings) ? 'Set your recipes servings' : ''}
      />
      <NumberInput
        required
        id="cookingTime"
        placeholder="Cooking time in min"
        mt="md"
        label="Cooking time in min"
        name="cookingTime"
        suffix=" min"
        min={0}
        max={10000}
        onChange={value => setFieldValue('cookingTime', value)}
        onBlur={handleBlur}
        value={values.cookingTime}
        error={touched.cookingTime && Boolean(errors.cookingTime)}
        description={touched.cookingTime && Boolean(errors.cookingTime) ? 'Set your recipes cookingTime' : ''}
      />
      <MultiSelect
        mt="md"
        label="Add labels"
        placeholder="Pick any amount of labels"
        data={transformed}
        searchable
        hidePickedOptions
        value={values.labels.map(label => label.label)}
        onChange={value => {
          setFieldValue(
            'labels',
            value.map(label => {
              const found = cleaned.find(l => l.key === label);
              return { value: found?.label || '', label };
            }),
          );
        }}
      />
    </Paper>
  );
};

export default GeneralsEditor;
