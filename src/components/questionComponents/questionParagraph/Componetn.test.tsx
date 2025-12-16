import { render, screen } from '@testing-library/react';
import Component from './Component';
test('默认属性', () => {
  render(<Component />);
  const p = screen.getByText('段落文字');
  expect(p).toBeInTheDocument();
});
test('传入属性', () => {
  render(<Component text="哈哈" isCenter={true} />);
  const h = screen.getByText('哈哈');
  expect(h).toBeInTheDocument();
});
