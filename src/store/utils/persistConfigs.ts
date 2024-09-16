import storage from 'redux-persist/lib/storage';

export const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage: storage,
};

export const recipePersistConfig = {
  key: 'recipe',
  version: 1,
  storage: storage,
};

export const globalPersistConfig = {
  key: 'global',
  version: 1,
  storage: storage,
};

export const metadataPersistConfig = {
  key: 'metadata',
  version: 1,
  storage: storage,
};
