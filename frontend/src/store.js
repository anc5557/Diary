// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/loginSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'], // 여기에 지속하고 싶은 상태의 key를 배열로 추가합니다.
};

const persistedReducer = persistReducer(persistConfig, loginReducer);

export const store = configureStore({
  reducer: {
    login: persistedReducer,
  },
});
