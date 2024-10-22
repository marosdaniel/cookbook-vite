import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IoSunny } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';
import { useGlobalState } from '../../store/Global';
import { toggleDarkMode } from '../../store/Global/global';
import { useAppDispatch } from '../../store/hooks';

import classes from './DarkModeSwitcher.module.css';

const DarkModeSwitcher = () => {
  const { isDarkMode } = useGlobalState();
  const dispatch = useAppDispatch();
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
    setColorScheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      variant="transparent"
      c={isDarkMode ? 'yellow' : 'blue'}
      onClick={toggleDarkModeHandler}
      title="Toggle color scheme"
    >
      {isDarkMode ? <IoSunny className={classes.icon} size={28} /> : <FaMoon className={classes.icon} size={28} />}
    </ActionIcon>
  );
};

export default DarkModeSwitcher;
