import React, { useContext } from 'react';
import swContext from '../context/swContext';

function FilterButtons() {
  const { filters, clearFilters, removeFilter } = useContext(swContext);

  const clearAllFiltersHandler = () => {
    clearFilters();
  };

  const removeFilterHandler = (id) => {
    removeFilter(filters, id);
  };

  return (
    <div>
      <div>
        {
          filters.map(({ id, params }) => (
            <div
              data-testid="filter"
              key={ id }
            >
              <span>
                {`${params.column} ${params.comparison} ${params.value} `}
              </span>
              <button
                type="button"
                onClick={ () => removeFilterHandler(id) }
              >
                Remove Filter
              </button>
            </div>
          ))
        }
      </div>
      {
        filters.length > 0
        && (
          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ clearAllFiltersHandler }
          >
            Remove All Filters
          </button>
        )
      }
    </div>
  );
}

export default FilterButtons;
