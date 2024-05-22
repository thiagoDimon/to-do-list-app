import React from 'react';
import Routes from './src/Routes';
import { PaperProvider } from 'react-native-paper';

export default function App() {

  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}
