import { createPost } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { UseMutationCustomOptions } from '@/types/common';
import { Marker } from '@/types/domain';
import { useMutation } from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // queryClient.invalidateQueries는 React Query의 함수로, 특정 queryKey와 연관된 쿼리를 무효화(invalidate)하여,
      // 서버에서 최신 데이터를 다시 가져오도록 한다.
      queryClient.invalidateQueries({
        // queryKey: 무효화할 쿼리의 키를 지정한다.(여기서는 MARKER와 GET_MARKERS라는 두 개의 queryKey가 존재)
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
        // ㄴ 이 두 queryKey와 일치하는 모든 쿼리 데이터를 무효화하여, 다음번 쿼리 시 최신 데이터를 가져오게 한다.
      });

      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        (existingMarkers) => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers ? [...existingMarkers, newMarker] : [newMarker];
        }
      );
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
