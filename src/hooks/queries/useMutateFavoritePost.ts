import { updateFavoritePost } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { UseMutationCustomOptions } from '@/types';
import { useMutation } from '@tanstack/react-query';

function useMutateFavoritePost(mutatationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: (updatedId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });
    },
    ...mutatationOptions,
  });
}

export default useMutateFavoritePost;
