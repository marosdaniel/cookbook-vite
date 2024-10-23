import { useState } from 'react';
import { Rating } from '@mantine/core';

const RatingSelector = () => {
  const [value, setValue] = useState(0);
  return <Rating value={value} onChange={setValue} />;
};

export default RatingSelector;
