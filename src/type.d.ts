export interface IGlobalConfig {
  clearTime: number,
  limitNumber: number,
  limitTime: number,
  model: 'number' | 'time',
}

export interface IGlobalConfigAction {
  type: string;
  payload: IGlobalConfig;
}
