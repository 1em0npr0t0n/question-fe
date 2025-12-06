import AttrComponent from './AttrComponent';
import Component from './Component';
import { QuestionParagraphDefaultPropsType } from './interface';

/**
 * @description 问卷段落组件
 */
export * from './interface';
const QuestionParagraphConf = {
  title: '段落',
  type: 'questionParagraph',
  Component, //画布渲染
  AttrComponent: AttrComponent, //右侧属性面板
  defaultProps: QuestionParagraphDefaultPropsType,
};
export default QuestionParagraphConf;
