import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import swContext from './swContext';

const INIT_COLUMN_OPT = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function SwProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const [id, setId] = useState(0);
  const [columnOptions, setColumnOptions] = useState(INIT_COLUMN_OPT);
  const [sort, setSort] = useState({ order: { column: 'population', sort: 'ASC' } });

  useEffect(() => {
    async function swApiCall() {
      try {
        const endpoint = 'https://swapi.dev/api/planets';
        const response = await fetch(endpoint);
        const { results } = await response.json();
        results.forEach((planet) => { delete planet.residents; });
        setPlanets(results);
      } catch (e) {
        console.log(e);
      }
    }
    swApiCall();
  }, []);

  const getNameFilter = ({ target: { value } }) => {
    setNameFilter(value);
  };

  const addNewFilter = (newFilter) => {
    setFilters((prevFilters) => [...prevFilters, newFilter]);
    setId((prevId) => prevId + 1);
  };

  const removeFilter = (filterList, filterId) => {
    const columnOpt = filterList.find((filter) => filter.id === filterId).params.column;
    console.log(columnOpt);
    setFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== filterId));
    setColumnOptions((prevColumnOptions) => [...prevColumnOptions, columnOpt]);
  };

  const clearFilters = () => {
    setFilters([]);
    setColumnOptions(INIT_COLUMN_OPT);
  };

  const getSortSetup = (column, sortOpt) => {
    setSort({ order: { column, sort: sortOpt } });
  };

  const store = useMemo(
    () => ({
      planets,
      nameFilter,
      getNameFilter,
      addNewFilter,
      columnOptions,
      setColumnOptions,
      filters,
      id,
      clearFilters,
      removeFilter,
      sort,
      getSortSetup,
    }),
    [planets, nameFilter, columnOptions, filters, id, sort],
  );

  return (
    <swContext.Provider value={ store }>
      {children}
    </swContext.Provider>
  );
}

SwProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SwProvider;
