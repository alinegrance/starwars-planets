import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import swContext from './swContext';

function SwProvider({ children }) {
  const [planets, setPlanets] = useState([]);

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

  const store = useMemo(
    () => ({
      planets }),
    [planets],
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
