/**
 * Input组件需要的最基本参数
 *
 */
export type QuestionTextareaPropsType = {
  title?: string;
  placeholder?: string;
  onChange?: (newAttr: QuestionTextareaPropsType) => void;
  disabled?: boolean;
};
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '多行输入框',
  placeholder: '请输入...',
};
