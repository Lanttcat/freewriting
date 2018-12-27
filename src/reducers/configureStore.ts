import { IGlobalConfigAction } from '../type';

const defaultConfig = {
  clearTime: 8,
  limitNumber: 400,
  limitTime: 600,
  model: 'time',
};

export const configReducer = (state = defaultConfig, action: IGlobalConfigAction) => {
  switch (action.type) {
    case 'GLOBAL_CONFIG':
      return Object.assign({}, action.payload);
    default:
      return state
  }
};
