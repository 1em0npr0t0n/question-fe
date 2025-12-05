/**
 * Input组件需要的最基本参数
 *
 */
export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;
  onChange?: (newAttr: QuestionInputPropsType) => void;
};
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入...',
};
