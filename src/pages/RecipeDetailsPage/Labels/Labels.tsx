import { useNavigate } from 'react-router-dom';
import { Group, Pill } from '@mantine/core';
import { ENonProtectedRoutes } from '../../../router/types';
import { IProps } from './types';

import classes from './Labels.module.css';

const Labels = ({ labels }: IProps) => {
  const navigate = useNavigate();
  const handleClick = (key: string) => {
    navigate(`${ENonProtectedRoutes.RECIPES}/?label=${key}`);
  };

  return (
    <Group justify="center" mb="md">
      {labels.map(label => (
        <Pill size="lg" key={label.key} onClick={() => handleClick(label.key)} className={classes.pill}>
          {label.label}
        </Pill>
      ))}
    </Group>
  );
};

export default Labels;
