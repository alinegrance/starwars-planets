import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  render(<App/>);
})

describe('Test StarWars page', () => {
  it('Test if page renders with title', () => {
    const title = screen.getByRole('heading', {
      name: /starwars planets/i
    });

    expect(title).toBeInTheDocument();
  });

  it('test if filter inputs are rendered', () => {
    const nameFilterInput = screen.getByPlaceholderText('planet name');
    expect(nameFilterInput).toBeInTheDocument();

    const columnFilterSelect = screen.getByTestId('column-filter');
    expect(columnFilterSelect).toBeInTheDocument();

    const comparatorFilterSelect = screen.getByTestId('comparison-filter');
    expect(comparatorFilterSelect).toBeInTheDocument();

    const numberFilter = screen.getByRole('spinbutton');
    expect(numberFilter).toBeInTheDocument();

    const filterButton = screen.getByRole('button', {
      name: /filter/i
    });
    expect(filterButton).toBeInTheDocument();
  });

  it('test if sort inputs are rendered', () => {
    const columnSortSelect = screen.getByRole('combobox', {
      name: /column/i
    });
    expect(columnSortSelect).toBeInTheDocument();
    
    const asc = screen.getByText(/asc/i);
    const desc = screen.getByText(/desc/i);
    expect(asc).toBeInTheDocument();
    expect(desc).toBeInTheDocument();

    const sortButton = screen.getByRole('button', {
      name: /sort/i
    });
    expect(sortButton).toBeInTheDocument();
  });
});
