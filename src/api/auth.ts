import { Category, Profile } from '../types/domain';
import { getEncryptStorage } from '../utils';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};
const postLogin = async ({ email, password }: RequestUser): Promise<ResponseToken> => {
  console.log({ email, password });

  const { data } = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

type ResponseProgile = Profile & Category;

const getProfile = async (): Promise<ResponseProgile> => {
  const { data } = await axiosInstance.get('/auth/me');

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export { postSignup, postLogin, getProfile, getAccessToken, logout };
export type { RequestUser, ResponseToken, ResponseProgile };
