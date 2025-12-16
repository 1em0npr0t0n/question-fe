import { render, screen } from '@testing-library/react';
import Component from './Component';
test('默认属性', () => {
  render(<Component />);
  const p = screen.getByText('单行输入框');
  expect(p).toBeInTheDocument();
  const q = screen.getByPlaceholderText('请输入...');
  expect(q).toBeInTheDocument();
});
test('传入属性', () => {
  render(<Component title="哈哈" placeholder="嘎嘎" />);
  const h = screen.getByText('哈哈');
  expect(h).toBeInTheDocument();
  const p = screen.getByPlaceholderText('嘎嘎');
  expect(p).toBeInTheDocument();
});
