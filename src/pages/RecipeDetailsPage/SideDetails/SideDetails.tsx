import { Group, Grid, Text } from '@mantine/core';
import { PiChefHat } from 'react-icons/pi';
import { PiCookingPot } from 'react-icons/pi';
import { IoPeople } from 'react-icons/io5';

import { IProps } from './types';
import { useIntl } from 'react-intl';
import { miscMessages } from '../../../messages';
import { MiscMessages } from '../../../providers/IntlProviderContainer/types';

const SideDetails = ({ servings, cookingTime, difficultyLevel }: IProps) => {
  const { formatMessage } = useIntl();
  return (
    <Group mt="xl" justify="center">
      <Grid
        w={{
          xs: '100%',
          sm: '90%',
          md: '80%',
          lg: '70%',
        }}
        justify="space-between"
      >
        <Grid.Col span={4}>
          <Group justify="center">
            <IoPeople size={24} />
            <Text>{servings} servings</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group justify="center">
            <PiCookingPot size={24} />
            <Text>{cookingTime} min</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group justify="center">
            <PiChefHat size={24} />
            <Text>{formatMessage((miscMessages as MiscMessages)[difficultyLevel.value])}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Group>
  );
};

export default SideDetails;
