import *  as _ from 'lodash';
import {IGlobalConfig} from "../type";

const LOCAL_STORAGE_CONFIG = 'LOCAL_STORAGE_CONFIG';
const LOCAL_STORAGE_TIMES = 'LOCAL_STORAGE_TIMES';

export const setUserConfig = (config: IGlobalConfig) => {
  localStorage.setItem(LOCAL_STORAGE_CONFIG, JSON.stringify(config));
};

export const getUserConfig = () => {
  try {
    const tempConfig = localStorage.getItem(LOCAL_STORAGE_CONFIG) || '';
    return JSON.parse(tempConfig);
  } catch (e) {
    return null;
  }
};

const getUserUserTimes = () => localStorage.getItem('times');

export const recordUserUser = () => {
  const timesNumber = _.toNumber(getUserUserTimes()) || 0;
  localStorage.setItem(LOCAL_STORAGE_TIMES, _.toString(timesNumber + 1));
};

