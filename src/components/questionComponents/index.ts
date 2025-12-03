/**
 * @description 全部画布组件信息
 */
import { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from './questionInput';
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle';
/**
 * 全部组件的交集&
 */
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;
/**
 * 组件的配置  ComponentPropsType 是组件的交集& Component是组件 jsx.ele
 */
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];
/**
 *
 * @param type 组件类型标签 :
 * @returns 返回 对应类型的组件结构信息
 */
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}
