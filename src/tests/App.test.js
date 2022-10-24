import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from '../App';
import apiMock from './apiMock';

describe('Test StarWars page', () => {
  it('Test if page renders with title', () => {
    render(<App/>);
    const title = screen.getByRole('heading', {
      name: /starwars planets/i
    });

    expect(title).toBeInTheDocument();
  });

  it('test if filter inputs are rendered', () => {
    render(<App/>);
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
    render(<App/>);
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

  it('test if table is rendered', () => {
    render(<App/>);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('test api return', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve(apiMock),
      })
    );
    
    await act(async () => {
      render(<App/>);
    })

    const planetList = screen.getAllByTestId('planet-name');
    global.fetch.mockRestore();
  })
});
