import React, { useState } from 'react';
import styled from 'styled-components/native';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import FeedItem from './FeedItem';
import { ResponsePost } from '@/api';
import { FlatList, FlatListProps } from 'react-native';

// FlatListProps를 기반으로 제네릭 타입을 지정
const ListContainer = styled(FlatList as new () => FlatList<ResponsePost>).attrs<
  FlatListProps<ResponsePost>
>(() => ({
  contentContainerStyle: {
    padding: 15,
  },
}))<FlatListProps<ResponsePost>>``;

function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <ListContainer
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{ right: 1 }}
      indicatorStyle={'black'}
    />
  );
}

export default FeedList;
