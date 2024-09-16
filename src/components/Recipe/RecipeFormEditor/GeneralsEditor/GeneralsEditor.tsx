import { MultiSelect, NumberInput, Paper, Select, TextInput, Title } from '@mantine/core';
import { IProps } from './types';
import { cleanCategory, cleanDifficultyLevel, useGetCategories, useGetDifficultyLevels } from '../utils';
import { useGetLabels } from '../../../../store/Metadata';

const GeneralsEditor = ({ handleChange, handleBlur, values, touched, errors, setFieldValue }: IProps) => {
  const labels = useGetLabels();

  const difficultyLevels = useGetDifficultyLevels();
  const cleanedDifficultyLevels = difficultyLevels.map(level => cleanDifficultyLevel(level));
  const transformedDifficultyLevels = cleanedDifficultyLevels.map(level => ({ value: level.key, label: level.label }));

  const categories = useGetCategories();
  const cleanedCategories = categories.map(category => cleanCategory(category));
  const transformedCategories = cleanedCategories.map(category => ({ value: category.key, label: category.label }));

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={3} mt={0}>
        Recipe Details
      </Title>
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
        id="imgSrc"
        placeholder="imgSrc"
        mt="md"
        label="Cover image url"
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
      <Select
        required
        mt="md"
        label="Difficulty level"
        placeholder="Choose difficulty level"
        name="difficultyLevel"
        onChange={value => {
          const selectedLevel = cleanedDifficultyLevels.find(level => level.key === value);
          setFieldValue('difficultyLevel', selectedLevel);
        }}
        value={values.difficultyLevel?.key || ''}
        onBlur={handleBlur}
        error={touched.difficultyLevel && Boolean(errors.difficultyLevel)}
        description={
          touched.difficultyLevel && Boolean(errors.difficultyLevel) ? "Set your recipe's difficulty level" : ''
        }
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 80 }, shadow: 'md' }}
        data={transformedDifficultyLevels.map(level => ({ value: level.value, label: level.label }))}
      />
      <Select
        required
        mt="md"
        label="Category"
        placeholder="Select category"
        name="category"
        onChange={value => {
          const selectedCategory = cleanedCategories.find(cat => cat.key === value);
          setFieldValue('category', selectedCategory);
        }}
        value={values.category?.key || ''}
        onBlur={handleBlur}
        error={touched.category && Boolean(errors.category)}
        description={touched.category && Boolean(errors.category) ? 'Set the category' : ''}
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 80 }, shadow: 'md' }}
        data={transformedCategories.map(cat => ({ value: cat.value, label: cat.label }))}
      />

      <MultiSelect
        mt="md"
        label="Add labels"
        placeholder="Select labels"
        data={labels}
        searchable
        hidePickedOptions
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 80 }, shadow: 'md' }}
        value={values.labels.map(label => label.value)}
        onChange={selectedValues => {
          const selectedObjects = selectedValues.map(value => labels.find(item => item.value === value));

          setFieldValue('labels', selectedObjects.filter(Boolean));
        }}
      />

      <TextInput
        id="youtubeLink"
        placeholder="youtube url"
        mt="md"
        label="Youtube link"
        name="youtubeLink"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.youtubeLink}
        error={touched.youtubeLink && Boolean(errors.youtubeLink)}
        description={touched.youtubeLink && Boolean(errors.youtubeLink) ? 'Add a youtube video' : ''}
      />
    </Paper>
  );
};

export default GeneralsEditor;
