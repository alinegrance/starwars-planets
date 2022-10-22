import React, { useContext } from 'react';
import swContext from '../context/swContext';
import '../App.css';

const NEGATIVE_COMPARATOR = -1;

function Table() {
  const { planets,
    nameFilter,
    filters,
    sort: { order: { column, sort } },
  } = useContext(swContext);

  const planetNameFilter = (planet) => planet.name.toLowerCase()
    .includes(nameFilter.toLowerCase());

  const filterByColumn = (planet) => filters
    .map(({ f }) => f(planet))
    .every((res) => res === true);

  const sortByUser = () => {
    switch (sort) {
    case 'ASC':
      return (planet1, planet2) => {
        if (planet1[column] === 'unknown') return 1;
        if (planet2[column] === 'unknown') return NEGATIVE_COMPARATOR;
        return Number(planet1[column]) - Number(planet2[column]);
      };
    case 'DESC':
      return (planet1, planet2) => {
        if (planet1[column] === 'unknown') return 1;
        if (planet2[column] === 'unknown') return NEGATIVE_COMPARATOR;
        return Number(planet2[column]) - Number(planet1[column]);
      };
    default:
      return 0;
    }
  };

  return (
    <table className="Table">
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
          planets?.filter(planetNameFilter)
            .filter(filterByColumn)
            .sort(sortByUser()).map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{planet.name}</td>
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
