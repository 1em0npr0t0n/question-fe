/**
 * Input组件需要的最基本参数
 *
 */
export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;
  onChange?: (newAttr: QuestionInputPropsType) => void;
  disabled?: boolean;
};
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '单行输入框',
  placeholder: '请输入...',
};
