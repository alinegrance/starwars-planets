import React, { useContext, useEffect, useState } from 'react';
import swContext from '../context/swContext';

const newFilter = (id, column, comparison, value) => (
  { id,
    f: (planet) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(value);
      case 'menor que':
        return Number(planet[column]) < Number(value);
      case 'igual a':
        return Number(planet[column]) === Number(value);
      default:
        return false;
      }
    },
    params: { column, comparison, value },
  }
);

function ColumnFilter() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState('0');
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    setColumnFilter(columnOptions[0] || null);
  }, [columnOptions]);

  const getColumnFilter = ({ target: { value } }) => {
    setColumnFilter(value);
  };

  const getComparisonFilter = ({ target: { value } }) => {
    setComparisonFilter(value);
  };

  const getNumberFilter = ({ target: { value } }) => {
    setNumberFilter(value);
  };
  const {
    addNewFilter,
    id } = useContext(swContext);

  const submitHandler = (event) => {
    event.preventDefault();

    setColumnOptions((prevState) => {
      console.log(columnFilter);
      return prevState.filter((opt) => opt !== columnFilter);
    });

    addNewFilter(newFilter(id, columnFilter, comparisonFilter, numberFilter));
  };

  console.log(columnOptions.length);
  return (
    <div>
      {columnOptions.length > 0
        && (
          <form onSubmit={ submitHandler }>
            <label htmlFor="column">
              <select
                data-testid="column-filter"
                id="column"
                value={ columnFilter }
                onChange={ getColumnFilter }
              >
                {
                  columnOptions.map((option) => (
                    <option key={ option } value={ option }>{option}</option>
                  ))
                }
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
        )}
    </div>
  );
}

export default ColumnFilter;
