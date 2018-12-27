export interface IGlobalConfig {
  limitNumber: number,
  limitTime: number,
  model: 'number' | 'time',
}

export interface IGlobalConfigAction {
  type: string;
  payload: IGlobalConfig;
}
