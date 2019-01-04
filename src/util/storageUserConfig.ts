import {IGlobalConfig} from "../type";

export const setUserConfig = (config: IGlobalConfig) => {
  localStorage.setItem('config', JSON.stringify(config));
};

export const getUserConfig = () => {
  try {
    const tempConfig = localStorage.getItem('config') || '';
    return JSON.parse(tempConfig);
  } catch (e) {
    return null;
  }
};
