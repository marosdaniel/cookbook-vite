import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLanguageLocales } from '../../providers/IntlProviderContainer/types';
import { IGlobalState } from './types';
import { getBrowserLocale } from '../../utils/getBrowserLocale';

const initialState: IGlobalState = {
  isDarkMode: false,
  locale: getBrowserLocale(),
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
    setLocale: (state, action: PayloadAction<TLanguageLocales>) => {
      state.locale = action.payload;
    },
  },
});

export const { toggleDarkMode, setLocale } = globalSlice.actions;
export default globalSlice.reducer;
