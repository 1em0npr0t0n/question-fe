import {} from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/questionComponents';
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentStateType = {
  componentList: [],
};
