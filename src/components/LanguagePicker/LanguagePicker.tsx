import { useState } from 'react';
import { Menu, UnstyledButton, Group, Text, Image } from '@mantine/core';

import { FaChevronDown } from 'react-icons/fa6';

import { LANGUAGE_OPTIONS } from '../../providers/IntlProviderContainer/consts';
import { ILanguageOption } from '../../providers/IntlProviderContainer/types';
import { useGlobalState } from '../../store/Global';
import { useAppDispatch } from '../../store/hooks';
import { setLocale } from '../../store/Global/global';

import classes from './LanguagePicker.module.css';

const LanguagePicker = () => {
  const dispatch = useAppDispatch();
  const { locale } = useGlobalState();

  const [opened, setOpened] = useState(false);
  const selected = LANGUAGE_OPTIONS.find(item => item.locale === locale) || LANGUAGE_OPTIONS[0];

  const selectLanguage = (item: ILanguageOption) => {
    setOpened(false);
    dispatch(setLocale(item.locale));
    console.log('selected language: ', item.label);
  };

  const items = LANGUAGE_OPTIONS.map(item => (
    <Menu.Item
      leftSection={<Image className={classes.flag} src={`/images/flags/${item.flag}.svg`} alt={item.label} />}
      onClick={() => selectLanguage(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" width="target" withinPortal>
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image className={classes.flag} src={`/images/flags/${selected.flag}.svg`} alt={selected.label} />
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
