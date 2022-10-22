import React from 'react';
import './App.css';
import Header from './component/Header';
import Table from './component/Table';
import SwProvider from './context/SwProvider';
import ColumnSort from './component/ColumnSort';
import Filter from './component/Filter';

function App() {
  return (
    <SwProvider>
      <main className="App">
        <Header />
        <div className="Filters flex-row">
          <Filter />
          <ColumnSort />
        </div>
        <Table />
      </main>
    </SwProvider>
  );
}

export default App;
