import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot를 임포트합니다.
import { Provider } from 'react-redux';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';

let persistor = persistStore(store);

const container = document.getElementById('root'); // 루트 DOM 요소를 가져옵니다.
const root = createRoot(container); // createRoot로 루트를 생성합니다.

root.render( // render 메소드로 앱 컴포넌트를 렌더링합니다.
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
