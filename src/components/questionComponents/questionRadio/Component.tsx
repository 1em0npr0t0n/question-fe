import { FC, useState } from 'react';
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface';
import { Radio, RadioChangeEvent, Typography } from 'antd';
const { Paragraph } = Typography;
const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { value, options = [], isVertical, title } = { ...QuestionRadioDefaultProps, ...props };
  const [radioValue, setRadioValue] = useState(value);

  function onChange(e: RadioChangeEvent) {
    setRadioValue(e.target.value);
    console.log(radioValue);
  }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group
        value={value}
        style={{ display: 'flex', flexDirection: isVertical ? 'row' : 'column' }}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};
export default Component;
