import React, { useContext, useState } from 'react';
import swContext from '../context/swContext';
import '../App.css';

function ColumnSort() {
  const { getSortSetup } = useContext(swContext);

  const [columnSelect, setColumnSelect] = useState('population');
  const [orderSort, setOrderSort] = useState('ASC');

  const getColumnSelect = ({ target: { value } }) => {
    setColumnSelect(value);
  };

  const getOrderSort = ({ target: { value } }) => {
    setOrderSort(value);
  };

  const sortSetupHandler = (e) => {
    e.preventDefault();
    getSortSetup(columnSelect, orderSort);
  };

  return (
    <form onSubmit={ sortSetupHandler } className="flex-row">
      <label htmlFor="column-select">
        Column
        <select
          id="column-select"
          data-testid="column-sort"
          value={ columnSelect }
          onChange={ getColumnSelect }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option vlaue="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <div className="flex-column">
        <label htmlFor="asc">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            name="sort"
            value="ASC"
            id="asc"
            onChange={ getOrderSort }
          />
          ASC
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            name="sort"
            value="DESC"
            id="desc"
            onChange={ getOrderSort }
          />
          DESC
        </label>
      </div>
      <button
        type="submit"
        data-testid="column-sort-button"
      >
        Sort
      </button>
    </form>
  );
}
export default ColumnSort;
