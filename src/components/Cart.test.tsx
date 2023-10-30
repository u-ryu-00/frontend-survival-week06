import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import Food from '../Types/Food';
import fixtures from '../../fixtures';

const state: { menu: Food[] } = {
  menu: [],
};

jest.mock('../hooks/useCartStore', () => () => [state]);

const context = describe;

describe('Cart', () => {
  it('renders Cart', () => {
    render(<Cart />);

    screen.getByText(/주문내역/);
    screen.getByText(/총 결제 예상금액/);
  });

  context('without selected menu', () => {
    beforeEach(() => {
      state.menu = [];
    });

    it('renders zero count', () => {
      render(<Cart />);

      screen.getByText(/0개/);
    });
  });

  context('with selected menu', () => {
    beforeEach(() => {
      state.menu = fixtures.foods;
    });

    it('renders selected food list and count', () => {
      render(<Cart />);

      fixtures.foods.forEach((food) => {
        screen.getByText(new RegExp(food.name));
      });

      screen.getByText(/2개/);
    });
  });
});
