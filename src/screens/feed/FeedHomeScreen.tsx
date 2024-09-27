import React from 'react';
import styled from 'styled-components/native';

import FeedList from '@/components/feed/FeedList';

const Container = styled.SafeAreaView`
  flex: 1;
`;

function FeedHomeScreen() {
  return (
    <Container>
      <FeedList />
    </Container>
  );
}

export default FeedHomeScreen;
