import { FC } from 'react';
import { QuestionParagraphDefaultPropsType, QuestionParagraphPropsType } from './interface';
import { Typography } from 'antd';
const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter } = { ...QuestionParagraphDefaultPropsType, ...props };
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {text}
    </Paragraph>
  );
};
export default Component;
