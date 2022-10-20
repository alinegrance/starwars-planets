import React from 'react';
import './App.css';
import Filters from './component/Filters';
import Header from './component/Header';
import Table from './component/Table';
import SwProvider from './context/SwProvider';

function App() {
  return (
    <SwProvider>
      <Header />
      <Filters />
      <Table />
    </SwProvider>
  );
}

export default App;
