import React, { useContext } from 'react';
import swContext from '../context/swContext';

function NumberFilter() {
  const { columnFilter,
    getColumnFilter,
    comparisonFilter,
    getComparisonFilter,
    numberFilter,
    getNumberFilter,
    turnColumnFilterOn } = useContext(swContext);

  const submitHandler = (event) => {
    event.preventDefault();
    turnColumnFilterOn();
  };

  return (
    <form onSubmit={ submitHandler }>
      <label htmlFor="column">
        <select
          data-testid="column-filter"
          id="column"
          value={ columnFilter }
          onChange={ getColumnFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          id="comparison"
          value={ comparisonFilter }
          onChange={ getComparisonFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        <input
          data-testid="value-filter"
          type="number"
          value={ numberFilter }
          onChange={ getNumberFilter }
        />
      </label>
      <button
        data-testid="button-filter"
        type="submit"
      >
        Filter

      </button>
    </form>
  );
}

export default NumberFilter;
