import React, { useContext } from 'react';
import swContext from '../context/swContext';

function Table() {
  const { planets,
    nameFilter,
    filters } = useContext(swContext);

  const planetNameFilter = (planet) => planet.name.toLowerCase()
    .includes(nameFilter.toLowerCase());

  const filterByColumn = (planet) => filters
    .map(({ f }) => f(planet))
    .every((res) => res === true);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Obital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          planets?.filter(planetNameFilter).filter(filterByColumn).map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
