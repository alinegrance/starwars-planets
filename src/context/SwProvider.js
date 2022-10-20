import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import swContext from './swContext';

function SwProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState('0');
  const [columnFilterOn, setColumnFilterOn] = useState(false);
  const [filters, setFilters] = useState([]);
  const [id, setId] = useState(0);

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

  // const getFilter = (value, setFilter) => {
  //   setFilter(value);
  // }; ------> generic function???

  const getNameFilter = ({ target: { value } }) => {
    setNameFilter(value);
  };

  const getColumnFilter = ({ target: { value } }) => {
    setColumnFilter(value);
  };

  const getComparisonFilter = ({ target: { value } }) => {
    setComparisonFilter(value);
  };

  const getNumberFilter = ({ target: { value } }) => {
    setNumberFilter(value);
  };

  const turnColumnFilterOn = () => setColumnFilterOn(true);

  const addNewFilter = (newFilter) => {
    setFilters((prevFilters) => [...prevFilters, newFilter]);
    setId((prevId) => prevId + 1);
  };

  const store = useMemo(
    () => ({
      planets,
      nameFilter,
      getNameFilter,
      columnFilter,
      getColumnFilter,
      comparisonFilter,
      getComparisonFilter,
      numberFilter,
      getNumberFilter,
      columnFilterOn,
      turnColumnFilterOn,
      addNewFilter,
      filters,
      id,
    }),
    [planets, nameFilter, columnFilter, comparisonFilter, numberFilter, columnFilterOn,
      filters, id],
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
