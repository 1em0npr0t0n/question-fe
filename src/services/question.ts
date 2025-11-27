import axios from './ajax';
import type { ResDataType } from './ajax';
//单个问卷信息
export async function getQuestionService(id: String): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
export async function createQusetionService(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}
//获取问卷列表
export async function getQuestionListService(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
