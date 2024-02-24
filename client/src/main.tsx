import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {store, persistor} from "./store.ts";
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>,
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
