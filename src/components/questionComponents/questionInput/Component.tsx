import { FC } from 'react';
import { QuestionInputDefaultProps, QuestionInputPropsType } from './Interface';
import { Typography, Input } from 'antd';
const { Paragraph } = Typography;
const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};
export default QuestionInput;
