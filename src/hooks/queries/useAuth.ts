/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
  ResponseProgile,
} from '@/api/auth';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/common';
import { removeEncryptStorage, setEncryptStorage } from '@/utils';
import { removeHeader, setHeader } from '@/utils/header';
import queryClient from '@/api/queryClient';
import { numbers, queryKeys, storageKeys } from '@/constants';

// 회원가입을 위한 커스텀 훅
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  // 회원가입 요청을 수행하는 mutation훅을 반환
  return useMutation({
    mutationFn: postSignup, // 회원가입 API 요청 함수
    ...mutationOptions, // 추가적인 mutation 옵션을 사용자가 전달할 수 있다.
  });
}

// 로그인 요청을 위한 커스텀 훅
function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin, // 로그인 API 요청 함수
    onSuccess: ({ accessToken, refreshToken }) => {
      // 로그인 성공 시 호출되는 함수
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken); // refreshToken을 암호화된 스토리지에 저장
      setHeader('Authorization', `Bearer ${accessToken}`); // accessToken을 HTTP 헤더에 설정
    },
    onSettled: () => {
      // 요청이 성공하거나 실패했을 때 모두 호출되는 함수
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      }); // 특정 쿼리를 다시 패치
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      }); // 특정 쿼리를 무효화
    },
    ...mutationOptions, // 추가적인 mutation 옵션을 사용자가 전달할 수 있다.
  });
}

// RefreshToken 발급을 처리하는 훅
function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN], // 쿼리키
    queryFn: getAccessToken, // RefreshToken을 얻기 위한 API 함수
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, // 쿼리가 신선하다고 간주되는 시간 (27분)
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // 백그라운드에서 쿼리를 다시 패치하는 간격 (27분)
    refetchOnReconnect: true, // 네트워크가 다시 연결될 때 쿼리를 다시 패치한다.
    refetchIntervalInBackground: true, // 백그라운드에서 주기적으로 쿼리를 다시 패치한다.
  });

  useEffect(() => {
    if (isSuccess) {
      // 쿼리가 성공했을 때
      setHeader('Authorization', `Bearer ${data.accessToken}`); // accessToken을 헤더에 설정
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken); // refreshToken을 암호화된 스토리지에 저장
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      // 쿼리가 실패했을 때
      removeHeader('Authorization'); // Authorization 헤더를 제거
      removeEncryptStorage(storageKeys.REFRESH_TOKEN); // refreshToken을 스토리지에서 제거
    }
  }, [isError]);

  return { isSuccess, isError }; // 쿼리의 성공 및 실패 상태를 반환
}

// 사용자 프로필을 가져오는 훅
function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProgile>) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE], // 쿼리키
    queryFn: getProfile, // 사용자 프로필을 가져오는 API 함수
    ...queryOptions, // 추가적인 query 옵션을 사용자가 전달할 수 있다.
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization'); // Authorization 헤더를 제거
      removeEncryptStorage(storageKeys.REFRESH_TOKEN); // refreshToken을 스토리지에서 제거
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
}

// 인증 관련 모든 기능을 제공하는 커스텀 훅
function useAuth() {
  const signupMutation = useSignup(); // 회원가입 mutation 훅
  const refreshTokenQuery = useGetRefreshToken(); // RefreshToken 쿼리 훅
  const getProfileQuery = useGetProfile({ enabled: refreshTokenQuery.isSuccess }); // 프로필 쿼리 훅, RefreshToken 쿼리가 성공하면 실행
  const isLogin = getProfileQuery.isSuccess; // 로그인 상태를 프로필 쿼리의 성공 여부로 결정
  const loginMutation = useLogin(); // 로그인 mutation 훅
  const logoutMutation = useLogout();

  return {
    signupMutation,
    refreshTokenQuery,
    getProfileQuery,
    isLogin,
    loginMutation,
    logoutMutation,
  };
}

export default useAuth;
