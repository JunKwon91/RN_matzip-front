import { getfavoritePosts, ResponsePost } from '@/api';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';
import {
  InfiniteData, // React Query에서 무한 로딩 시 사용할 데이터 타입
  QueryKey, // 쿼리 키 타입
  useInfiniteQuery, // React Query의 무한 로딩 훅
  UseInfiniteQueryOptions, // 무한 로딩 쿼리의 옵션 타입
} from '@tanstack/react-query';

function useGetInfiniteFavoritePosts(
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
    queryFn: ({ pageParam }) => getfavoritePosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.FAVORITE, queryKeys.GET_FAVORITE_POSTS],
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

export default useGetInfiniteFavoritePosts;
