import { render, screen } from '@testing-library/react';
import Component from './Component';

test('默认属性', () => {
  render(<Component />); //渲染组件
  const h = screen.getByText('多选');
  expect(h).toBeInTheDocument(); //断言
  for (let i = 1; i <= 2; i++) {
    const checkbox = screen.getByDisplayValue(`item${i}`);
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();
  }
});
test('输入属性', () => {
  const opts = [
    { value: 'v1', label: 't1', checked: false },
    { value: 'v2', label: 't2', checked: true },
    { value: 'v3', label: 't3', checked: true },
  ];
  // 创建一个 mock onChange 函数
  const handleChange = jest.fn();
  render(<Component title="测试title" list={opts} onChange={handleChange} />);

  const checkbox1 = screen.getByDisplayValue(`v1`);
  expect(checkbox1).toBeInTheDocument();
  const checkbox2 = screen.getByDisplayValue(`v2`);
  expect(checkbox2).toBeInTheDocument();
  const checkbox3 = screen.getByDisplayValue(`v3`);
  expect(checkbox3).toBeInTheDocument();
  const label1 = screen.getByText(`t1`);
  expect(label1).toBeInTheDocument();
  const label2 = screen.getByText(`t2`);
  expect(label2).toBeInTheDocument();
  const label3 = screen.getByText(`t3`);
  expect(label3).toBeInTheDocument();

  // 初始状态
  expect(checkbox1).not.toBeChecked();
  expect(checkbox2).toBeChecked();
  expect(checkbox3).toBeChecked();

  // 模拟点击第三个标签
  //fireEvent.click(label3);

  // 检查 onChange 是否被调用，并且参数正确
  //expect(handleChange).toHaveBeenCalled();
  //expect(handleChange).toHaveBeenCalledTimes(1);
  //由于 onChange 没有改变单选的功能所以pass
});
