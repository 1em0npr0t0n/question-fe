/**
 * @description 问卷 标题
 */
import Component from './Component';
import { QuestionTitleDefaultProps } from './Interface';
import AttrComponent from './AttrComponent';

export * from './Interface';
const QuestionTitleConf = {
  title: '标题',
  type: 'questionTitle',
  Component, //画布内组件
  AttrComponent: AttrComponent, //右侧属性面板
  defaultProps: QuestionTitleDefaultProps,
};
export default QuestionTitleConf;
