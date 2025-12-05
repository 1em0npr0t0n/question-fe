/**
 * @description 问卷 输入框的配置
 */
import Component from './Component';
import { QuestionInputDefaultProps } from './Interface';
import AttrComponent from './AttrComponent';

export * from './Interface';
const QuestionInputConf = {
  title: '输入框',
  type: 'questionInput',
  Component, //画布渲染
  AttrComponent: AttrComponent, //右侧属性面板
  defaultProps: QuestionInputDefaultProps,
};
export default QuestionInputConf;
