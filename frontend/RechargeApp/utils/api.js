import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const API_BASE_URL = Config.API_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 디바이스 정보 가져오기
export const getDeviceInfo = () => {
  return {
    deviceOs: Platform.OS,
    deviceVersion: Platform.Version.toString(),
  };
};

export default api;
