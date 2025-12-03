/**
 * @description 问卷 标题
 */
import Component from './Component';
import { QuestionTitleDefaultProps } from './Interface';

export * from './Interface';
const QuestionTitleConf = {
  title: '标题',
  type: 'questionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
};
export default QuestionTitleConf;
