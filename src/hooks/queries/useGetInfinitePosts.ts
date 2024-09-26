import { getPosts, ResponsePost } from '@/api'; // 게시물 목록을 불러오는 API 함수와, 게시물의 응답 타입을 가져옴
import { queryKeys } from '@/constants'; // React Query에서 사용되는 query 키값을 상수로 관리
import { ResponseError } from '@/types'; // API 호출 실패 시 반환되는 에러 타입 정의
import {
  InfiniteData, // React Query에서 무한 로딩 시 사용할 데이터 타입
  QueryKey, // 쿼리 키 타입
  useInfiniteQuery, // React Query의 무한 로딩 훅
  UseInfiniteQueryOptions, // 무한 로딩 쿼리의 옵션 타입
} from '@tanstack/react-query';

function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[], // 성공 시 데이터 타입 (배열)
    ResponseError, // 실패 시 에러 타입
    InfiniteData<ResponsePost[], number>, // 무한 로딩 데이터를 관리하기 위한 타입
    ResponsePost[], // 데이터를 페이지 단위로 관리하기 위한 타입
    QueryKey, // 쿼리 키 타입
    number // 페이지 번호 타입 (기본적으로 숫자)
  >
) {
  return useInfiniteQuery({
    // queryFn은 페이지 파라미터를 받아 해당 페이지에 해당하는 게시물을 가져옴
    queryFn: ({ pageParam }) => getPosts(pageParam),
    // queryKey는 이 쿼리의 고유한 키값을 지정, 여기서는 'POST'와 'GET_POSTS'를 결합한 키를 사용
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    // 첫 번째 페이지의 초기 값을 1로 설정 (첫 페이지는 1부터 시작)
    initialPageParam: 1,
    // 다음 페이지를 가져오는 로직
    // 마지막 페이지(lastPage)에서 마지막 게시물을 찾고, 해당 게시물이 있으면 다음 페이지로 넘어감
    // 더 이상 게시물이 없으면 undefined를 반환하여 페이지네이션을 멈춤
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1]; // 마지막 페이지에서 마지막 게시물을 확인
      return lastPost ? allPages.length + 1 : undefined; // 게시물이 있으면 다음 페이지로 넘기고, 없으면 undefined 반환
    },
    // 추가적인 옵션을 쿼리에 적용
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
