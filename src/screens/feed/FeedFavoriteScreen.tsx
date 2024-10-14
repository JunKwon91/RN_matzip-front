import React from 'react';
import styled from 'styled-components/native';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import { colors } from '@/constants';

const Container = styled.SafeAreaView`
  flex: 1%;
  background-color: ${colors.WHITE};
`;

function FeedFavoriteScreen() {
  return (
    <Container>
      <FeedFavoriteList />
    </Container>
  );
}

export default FeedFavoriteScreen;
