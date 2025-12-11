/**
 * @description 全部画布组件信息
 */
import { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './questionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle';
import QuestionInfoConf, { QuestionInfoPropsType } from './questionInfo';
import QuestionParagraphConf, { QuestionParagraphPropsType } from './questionParagraph';
import QuestionTextareaConf, { QuestionTextareaPropsType } from './questionTextarea';
import QuestionRadioConf, {
  QuestionRadioPropsType,
  QuestionRadioStatPropsType,
} from './questionRadio';
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
  QuestionCheckStatPropsType,
} from './questionCheckbox';
/**
 * 全部组件的交集&
 */
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;
type QuestionStatPropsType = QuestionRadioStatPropsType & QuestionCheckStatPropsType;
/**
 * 组件的配置  ComponentPropsType 是组件的交集& Component是组件 jsx.ele
 */
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  AttrComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<QuestionStatPropsType>;
};
//组件列表 getComponentConfByType可在此列表中查询组件
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

//组件分组
export const componentConfGroup = [
  {
    groupId: 'groupTitle',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'groupInput',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'groupSelect',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

/**
 *
 * @param type 组件类型标签 :
 * @returns 返回 对应类型的组件结构信息
 */
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}
