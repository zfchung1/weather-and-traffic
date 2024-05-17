import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./pages/home', () => ({
  Home: () => <div data-testid="home-page">Home Page Content</div>,
}));

describe('App Component', () => {
  it('renders the Home component', () => {
    const { getByTestId } = render(<App />);

    // Verify that the Home component is rendered
    const homePage = getByTestId('home-page');
    expect(homePage).toBeInTheDocument();
    expect(homePage).toHaveTextContent('Home Page Content');
  });
});