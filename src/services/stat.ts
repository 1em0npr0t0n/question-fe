import axios from './ajax';
import { ResDataType } from './ajax';
/**
 * 获取问卷统计信息
 * @param questionId 问卷ID
 * @param opt page pagesize
 * @returns
 */
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}
/**
 * 单选/多选 的统计数据
 * @param questionId 问卷ID
 * @param componentId 组件ID
 * @returns 组件统计数据
 */
export async function getQuestionComponentStatService(
  questionId: string,
  componentId: string,
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
