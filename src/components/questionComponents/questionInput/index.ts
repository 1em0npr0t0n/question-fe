/**
 * @description 问卷 输入框的配置
 */
import Component from './Component';
import { QuestionInputDefaultProps } from './Interface';

export * from './Interface';
const QuestionInputConf = {
  title: '输入框',
  type: 'questionInput',
  Component,
  defaultProps: QuestionInputDefaultProps,
};
export default QuestionInputConf;
