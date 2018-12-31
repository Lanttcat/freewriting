import { EWriteModel } from './config';
export interface IGlobalConfig {
  clearWordsTime: number, // 过期自动清理时间 单位 秒
  minWordNumber: number, // 字数模式：限制字数
  minWriteTime: number, // 时间模式：限制时间 单位 秒
  writeModel: EWriteModel, // 模式
}

export interface IGlobalConfigAction {
  type: string;
  payload: IGlobalConfig;
}
