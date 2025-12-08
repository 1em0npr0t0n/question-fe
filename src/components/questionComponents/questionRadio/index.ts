import AttrComponent from './AttrComponent';
import Component from './Component';
import { QuestionRadioDefaultProps } from './interface';

/**
 * @description radio单选组件
 */
export * from './interface';

const QuestionRadioConf = {
  title: '单选',
  type: 'questionRadio',
  Component,
  AttrComponent,
  defaultProps: QuestionRadioDefaultProps,
};
export default QuestionRadioConf;
