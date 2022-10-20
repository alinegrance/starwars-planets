import React, { useContext } from 'react';
import swContext from '../context/swContext';

function NameFilter() {
  const { planetName, getPlanetName } = useContext(swContext);
  return (
    <label htmlFor="name">
      <input
        data-testid="name-filter"
        id="name"
        placeholder="planet name"
        value={ planetName }
        onChange={ getPlanetName }
      />
    </label>
  );
}

export default NameFilter;
