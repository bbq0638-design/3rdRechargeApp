import axios from 'axios';
import {Platform, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const API_BASE_URL = Config.API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//JwtToken 생성
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('authToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//회원가입
export const signup = async userData => {
  try {
    console.log('회원가입 요청 데이터', userData);
    const res = await api.post('/user/signup', userData);
    console.log('회원가입 응답:', res.data);
    return res.data;
  } catch (err) {
    console.log('회원가입 실패', err.response?.data || err);
    throw err.response?.data || '회원가입 실패';
  }
};

//아이디 중복체크
export const checkUserId = async userId => {
  const res = await api.get('/user/check-id', {params: {userId}});
  return res.data;
};

//닉네임
export const checkUserNickname = async userNickname => {
  const res = await api.get('/user/check-nickname', {params: {userNickname}});
  return res.data;
};

//로그인
export const login = async userData => {
  try {
    console.log('로그인 요청 데이터:', userData);
    const res = await api.post('/user/login', userData);
    console.log('로그인 응답:', res.data);

    const user = res.data;

    if (user.token) {
      await AsyncStorage.setItem('authToken', user.token);
    }

    return user;
  } catch (err) {
    console.log('로그인 실패:', err.response?.data || err);
    throw err.response?.data || '로그인 실패';
  }
};

export default api;
