import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from './Auth/auth';
import recipeReducer from './Recipe/recipe';
import globalReducer from './Global/global';
import metadataReducer from './Metadata/metadata';
import {
  authPersistConfig,
  recipePersistConfig,
  globalPersistConfig,
  metadataPersistConfig,
} from './utils/persistConfigs';

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  recipe: persistReducer(recipePersistConfig, recipeReducer),
  global: persistReducer(globalPersistConfig, globalReducer),
  metadata: persistReducer(metadataPersistConfig, metadataReducer),
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AsyncThunkConfig = { state: RootState };
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
