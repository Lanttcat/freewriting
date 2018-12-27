import { IGlobalConfigAction } from '../type';

export const configReducer = (state = {}, action: IGlobalConfigAction) => {
  switch (action.type) {
    case 'GLOBAL_CONFIG':
      return Object.assign({}, action.payload);
    default:
      return state
  }
};
