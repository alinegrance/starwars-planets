import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import swContext from './swContext';

function SwProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
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

  const getNameFilter = ({ target: { value } }) => {
    setNameFilter(value);
  };

  const addNewFilter = (newFilter) => {
    setFilters((prevFilters) => [...prevFilters, newFilter]);
    setId((prevId) => prevId + 1);
  };

  const store = useMemo(
    () => ({
      planets,
      nameFilter,
      getNameFilter,
      addNewFilter,
      filters,
      id,
    }),
    [planets,
      nameFilter,
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
