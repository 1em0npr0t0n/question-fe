import { FC } from 'react';
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';
import { Checkbox, Space, Typography } from 'antd';

const { Paragraph } = Typography;
const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong> {title}</Paragraph>
      {/* <Checkbox.Group options={list} /> */}
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((l, index) => {
          const { value, label, checked } = l;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {label}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};
export default Component;
