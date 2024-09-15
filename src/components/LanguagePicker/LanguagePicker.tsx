import { useState } from 'react';
import { Menu, UnstyledButton, Group, Text } from '@mantine/core';

import { FaChevronDown } from 'react-icons/fa6';

import { LANGUAGE_OPTIONS } from '../../providers/IntlProviderContainer/consts';
import { useGlobalState } from '../../store/Global';

import classes from './LanguagePicker.module.css';
import { useAppDispatch } from '../../store/hooks';
import { setLocale } from '../../store/Global/global';
import { ILanguageOption } from '../../providers/IntlProviderContainer/types';

const LanguagePicker = () => {
  const dispatch = useAppDispatch();
  const { locale } = useGlobalState();

  const [opened, setOpened] = useState(false);
  const selected = LANGUAGE_OPTIONS.find(item => item.locale === locale) || LANGUAGE_OPTIONS[0];

  const selectLanguage = (item: ILanguageOption) => {
    setOpened(false);
    dispatch(setLocale(item.locale));
  };

  const items = LANGUAGE_OPTIONS.map(item => (
    <Menu.Item leftSection={item.flag} onClick={() => selectLanguage(item)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" width="target" withinPortal>
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Text className={classes.flag}>{selected.flag}</Text>
            <Text className={classes.label}>{selected.label}</Text>
          </Group>
          <FaChevronDown size="1rem" className={classes.icon} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};

export default LanguagePicker;
