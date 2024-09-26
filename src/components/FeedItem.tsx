import { ResponsePost } from '@/api';
import { colors } from '@/constants';
import { getDateWithSeparator } from '@/utils';
import React from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  margin: 12px 5px;
`;
const ContentContainer = styled.View``;
const ImageContainer = styled.View<{ isEmpty?: boolean }>`
  width: ${Dimensions.get('screen').width / 2 - 25}px;
  height: ${Dimensions.get('screen').width / 2 - 25}px;

  ${({ isEmpty }) =>
    isEmpty &&
    `
        justify-content: center;
        align-items: center;
        border-color: ${colors.GRAY_500};
        border-radius: 5px;
        border-width: 1px;
    `}
`;
const Img = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
const NoImageText = styled.Text``;
const TextContainer = styled.View`
  margin-top: 7px;
  gap: 2px;
`;
const DateText = styled.Text`
  color: ${colors.PINK_700};
  font-weight: 600;
  font-size: 12px;
`;
const TitleText = styled.Text`
  color: ${colors.BLACK};
  font-weight: 600;
  font-size: 13px;
`;
const DescriptionText = styled.Text`
  color: ${colors.GRAY_500};
  font-weight: 600;
  font-size: 13px;
`;

interface FeedItemProps {
  post: ResponsePost;
}
function FeedItem({ post }: FeedItemProps) {
  return (
    <Container>
      <ContentContainer>
        {post.images.length > 0 && (
          <ImageContainer key={post.id}>
            <Img
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${post.images[0]?.uri}`,
              }}
              resizeMode={'cover'}
            />
          </ImageContainer>
        )}
        {post.images.length === 0 && (
          <ImageContainer isEmpty={true}>
            <NoImageText>No Image</NoImageText>
          </ImageContainer>
        )}

        <TextContainer>
          <DateText>{getDateWithSeparator(post.date, '/')}</DateText>
          <TitleText>{post.title}</TitleText>
          <DescriptionText numberOfLines={1}>{post.description}</DescriptionText>
        </TextContainer>
      </ContentContainer>
    </Container>
  );
}

export default FeedItem;
