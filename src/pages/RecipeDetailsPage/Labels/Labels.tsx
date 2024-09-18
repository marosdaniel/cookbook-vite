import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Group, Pill } from '@mantine/core';
import { ENonProtectedRoutes } from '../../../router/types';
import { MiscMessages } from '../../../providers/IntlProviderContainer/types';
import { miscMessages } from '../../../messages';
import { IProps } from './types';

import classes from './Labels.module.css';

const Labels = ({ labels }: IProps) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const handleClick = (key: string) => {
    navigate(`${ENonProtectedRoutes.RECIPES}/?label=${key}`);
  };

  return (
    <Group justify="center" mb="md">
      {labels.map(label => (
        <Pill size="lg" key={label.value} onClick={() => handleClick(label.value)} className={classes.pill}>
          {formatMessage((miscMessages as MiscMessages)[label.value])}
        </Pill>
      ))}
    </Group>
  );
};

export default Labels;
