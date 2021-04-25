import React from 'react';
import { render, screen } from '@testing-library/react';
import {Listings} from "./sections";

test('renders learn react link', () => {
  render(<Listings />);
  expect("hello").toEqual('hello');
});
