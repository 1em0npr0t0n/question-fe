import AttrComponent from './AttrComponent';
import Component from './Component';

import { QuestionCheckboxDefaultProps } from './interface';
import StatComponent from './StatComponent';

export * from './interface';
const QuestionCheckboxConf = {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  AttrComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
};

export default QuestionCheckboxConf;
