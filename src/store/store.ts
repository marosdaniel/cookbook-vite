import { configureStore, ThunkAction, Action, combineReducers, Store } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from './Auth';
import recipeReducer from './Recipe';
import globalReducer from './Global';
import { authPersistConfig, recipePersistConfig, globalPersistConfig } from './utils/persistConfigs';

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  recipe: persistReducer(recipePersistConfig, recipeReducer),
  global: persistReducer(globalPersistConfig, globalReducer),
});

export const store: Store = configureStore({
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
