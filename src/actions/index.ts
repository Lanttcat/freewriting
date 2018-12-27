import { IGlobalConfig } from '../type';

export const setGlobalConfig = (config: IGlobalConfig) => ({
  payload: config,
  type: 'GLOBAL_CONFIG',
});
