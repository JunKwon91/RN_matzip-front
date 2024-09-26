import { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'; // 변이(mutation) 훅의 옵션을 정의에 사용
import { AxiosError } from 'axios'; //  axios 요청이 실패했을 때의 에러 객체를 타입화

// AxiosError 타입을 사용하여 ResponseError라는 새로운 타입을 정의한다.
type ResponseError = AxiosError<{
  statusCode: string; // 상태 코드
  message: string; // 에러 메시지
  error: string; // 에러의 종류
}>;

// UseMutationOptions 타입에서 'mutationFn' 속성을 제외한 나머지 속성들을 가진 새로운 타입, UseMutationCustomOptions를 정의한다.
type UseMutationCustomOptions<TData = unknown, TVariable = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariable, unknown>, // UseMutationOptions에서 제네릭 타입으로 TData, ResponseError, TVariable, 그리고 unknown을 사용
  'mutationFn' // 'mutationFn' 속성을 제외한다. 이는 변이를 수행하는 함수를 외부에서 지정할 때 사용되지 않도록 하기 위해서다.
>;

// UseQueryCustomOptions는 제네릭 타입을 받아 React Query의 UseQueryOptions 타입에서 'queryKey' 속성을 제외한 나머지 속성들을 재정의한다.
// TQueryFnData는 쿼리 함수에서 반환되는 데이터의 타입을, TData는 쿼리 결과로 반환되는 데이터의 타입을 정의한다.
type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>, // UseQueryOptions 타입을 활용합니다. 이 타입은 쿼리 옵션의 전체 집합을 정의하며, 각 제네릭 파라미터는 쿼리 함수 데이터 타입(TQueryFnData), 에러 타입(ResponseError), 반환 데이터 타입(TData), 그리고 쿼리 키 타입(QueryKey)을 나타낸다.
  'queryKey' // 'queryKey' 속성을 제외한다. 이는 UseQueryOptions 타입에서 쿼리 키를 정의하는 속성인데, 이를 제외함으로써 쿼리 키를 제외한 다른 설정들만을 포함하는 새로운 타입을 생성한다.
>;

export type { ResponseError, UseMutationCustomOptions, UseQueryCustomOptions };
