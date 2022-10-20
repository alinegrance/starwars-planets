import React from 'react';
import './App.css';
import Header from './component/Header';
import Table from './component/Table';
import SwProvider from './context/SwProvider';

function App() {
  return (
    <SwProvider>
      <Header />
      <Table />
    </SwProvider>
  );
}

export default App;
