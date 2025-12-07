import AttrComponent from './AttrComponent';
import Component from './Component';
import { QuestionInfoDefaultProps } from './interface';

/**
 * @description info 组件
 */
export * from './interface';

const QuestionInfoConf = {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  AttrComponent,
  defaultProps: QuestionInfoDefaultProps,
};
export default QuestionInfoConf;
