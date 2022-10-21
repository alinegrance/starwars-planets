import React from 'react';
import './App.css';
import FiltersInput from './component/Filters';
import Header from './component/Header';
import Table from './component/Table';
import FilterButtons from './component/FilterButtons';
import SwProvider from './context/SwProvider';

function App() {
  return (
    <SwProvider>
      <Header />
      <FiltersInput />
      <FilterButtons />
      <Table />
    </SwProvider>
  );
}

export default App;
