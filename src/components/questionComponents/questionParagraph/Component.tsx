import { FC } from 'react';
import { QuestionParagraphDefaultPropsType, QuestionParagraphPropsType } from './interface';
import { Typography } from 'antd';
const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultPropsType, ...props };
  //换行符换成 html br 错误示范，存在凭证盗用问题
  //const htmlBR = text.replaceAll('\n', '<br>');
  //text切割成数组
  const textList = text.split('\n');
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {/* <span dangerouslySetInnerHTML={{ __html: htmlBR }}></span> */}
      {textList.map((text, index) => {
        return (
          <span key={index}>
            {index > 0 && <br />}
            {text}
          </span>
        );
      })}
    </Paragraph>
  );
};
export default Component;
