/**
 * @description 问卷 输入框的配置
 */
import Component from './Component';
import { QuestionTextareaDefaultProps } from './Interface';
import AttrComponent from './AttrComponent';

export * from './Interface';
const QuestionTextareaConf = {
  title: '多行输入',
  type: 'questionTextarea',
  Component, //画布渲染
  AttrComponent: AttrComponent, //右侧属性面板
  defaultProps: QuestionTextareaDefaultProps,
};
export default QuestionTextareaConf;
