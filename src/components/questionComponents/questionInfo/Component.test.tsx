import { render, screen } from '@testing-library/react';
import Component from './Component';

test('默认属性', () => {
  render(<Component />); //渲染组件
  const h = screen.getByText('问卷标题');
  expect(h).toBeInTheDocument(); //断言
});

test('加入属性', () => {
  render(<Component title="hello" desc="isdesc" />);
  const h = screen.getByText('hello');
  expect(h).toBeInTheDocument();
  const h2 = screen.getByText('isdesc');
  expect(h2).toBeInTheDocument();
});

test('多行文字', () => {
  render(<Component desc={`1\n2\n3`} />);
  const span = screen.getByText('1');
  expect(span).toBeInTheDocument();
  expect(span).toHaveTextContent('1'); //文档内有1
  expect(span).not.toHaveTextContent('1\n2'); //文档内12不连续
});
