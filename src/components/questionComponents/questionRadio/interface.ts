export type OptionsType = {
  value: string;
  label: string;
};
export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionsType[];
  value?: string;
  //用于 右侧attr面板
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单项选择',
  isVertical: false,
  options: [
    { value: 'item1', label: '选项1' },
    { value: 'item2', label: '选项2' },
  ],
  value: '',
};
