export type OptionsType = {
  value: string;
  label: string;
  checked: boolean;
};
export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: OptionsType[];
  //attrComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};
export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选',
  isVertical: false,
  list: [
    { value: 'item1', label: '选项1', checked: false },
    { value: 'item2', label: '选项2', checked: false },
  ],
};
