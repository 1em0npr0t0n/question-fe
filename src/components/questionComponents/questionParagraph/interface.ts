export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;

  //用于 右侧attr面板
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};
export const QuestionParagraphDefaultPropsType: QuestionParagraphPropsType = {
  text: '段落文字',
  isCenter: false,
};
