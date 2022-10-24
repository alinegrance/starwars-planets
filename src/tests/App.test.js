import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from '../App';
import apiMock from './apiMock';
import userEvent from '@testing-library/user-event';

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
    expect(planetList).toHaveLength(10);

    global.fetch.mockRestore();
  })

  it('test name filter', async ()=> {
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve(apiMock),
      })
    );

    await act(async () => {
      render(<App/>);
    });

    const nameFilterInput = screen.getByPlaceholderText('planet name');
    userEvent.type(nameFilterInput, 'oo');

    const planetFiltered = screen.getAllByTestId('planet-name');
    expect(planetFiltered).toHaveLength(2);

    global.fetch.mockRestore();
  })

  it('test filter by column parameter', async() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve(apiMock),
      })
    );

    await act(async () => {
      render(<App/>);
    });

    const columnFilterSelect = screen.getByTestId('column-filter');

    userEvent.selectOptions(columnFilterSelect, 'population');

    const filterButton = screen.getByRole('button', {
      name: /filter/i
    });
    userEvent.click(filterButton);

    const planetFiltered = screen.getAllByTestId('planet-name');
    expect(planetFiltered).toHaveLength(8);

    global.fetch.mockRestore();
  })

  // it('test sort', async () => {
  //   jest.spyOn(global, 'fetch').mockImplementation(() => 
  //   Promise.resolve({
  //     json: () => Promise.resolve(apiMock),
  //   })
  // );

  // await act(async () => {
  //   render(<App/>);
  // });

  // global.fetch.mockRestore();
  // })
});
