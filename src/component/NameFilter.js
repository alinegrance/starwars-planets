import React, { useContext } from 'react';
import swContext from '../context/swContext';

function NameFilter() {
  const { nameFilter, getNameFilter } = useContext(swContext);
  return (
    <label htmlFor="name">
      <input
        data-testid="name-filter"
        id="name"
        placeholder="planet name"
        value={ nameFilter }
        onChange={ getNameFilter }
      />
    </label>
  );
}

export default NameFilter;
