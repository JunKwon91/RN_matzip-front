import React from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { colorHex, colors, feedNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { FeedStackParamList } from '@/navigations/Stack/FeedStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getLocaleFormat } from '@/utils';
import PreviewImageList from '@/components/common/PreviewImageList';

const Container = styled.ScrollView`
  position: relative;
`;
const HeaderContainer = styled.SafeAreaView`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px;
`;
const ImageContainer = styled.View`
  width: ${Dimensions.get('screen').width}px;
  height: ${Dimensions.get('screen').width}px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const EmptyImageContainer = styled.View`
  height: ${Dimensions.get('screen').width}px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.GRAY_200};
  border-color: ${colors.GRAY_200};
  border-width: 1px;
`;
const EmptyText = styled.Text``;

const ContentContainer = styled.View`
  padding: 20px 20px;
  background-color: ${colors.WHITE};
  margin-bottom: 10px;
`;
const TitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.BLACK};
`;
const InfoContainer = styled.View`
  margin: 20px 0px;
  gap: 8px;
`;
const InfoRow = styled.View`
  flex-direction: row;
`;
const InfoColumn = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;
const InfoColumnKeyText = styled.Text`
  color: ${colors.BLACK};
`;
const InfoColumnValueText = styled.Text`
  color: ${colors.PINK_700};
`;
const MarkerColor = styled.View<{ bg: string }>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ bg }) => bg};
`;
const AddressContainer = styled.View`
  gap: 5px;
  margin: 10px 0px;
  flex-direction: row;
  align-items: center;
`;
const AddressText = styled.Text`
  color: ${colors.GRAY_500};
  font-size: 12px;
`;
const DescriptionText = styled.Text`
  color: ${colors.BLACK};
  line-height: 25px;
  font-size: 16px;
`;
const ImageContentsContainer = styled.View`
  padding: 15px 0px;
  background-color: ${colors.WHITE};
`;

type FeedDetailScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.FEED_DETAIL
>;
function FeedDetailScreen({ route, navigation }: FeedDetailScreenProps) {
  const { id } = route.params;
  const { data: post, isPending, isError } = useGetPost(id);

  if (isPending || isError) {
    return <></>;
  }

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <Octicons
            name={'arrow-left'}
            size={30}
            color={colors.WHITE}
            onPress={() => navigation.goBack()}
          />
          <Ionicons name={'ellipsis-vertical'} size={30} color={colors.WHITE} />
        </Header>
      </HeaderContainer>

      <ImageContainer>
        {post?.images.length > 0 && (
          <Image
            source={{
              uri: `${
                Platform.OS === 'android'
                  ? 'http://10.0.2.2:3030/'
                  : 'http://localhost:3030/'
              }${post?.images[0].uri}`,
            }}
            resizeMode={'cover'}
          />
        )}
        {post.images.length === 0 && (
          <EmptyImageContainer>
            <EmptyText>No Image</EmptyText>
          </EmptyImageContainer>
        )}
      </ImageContainer>

      <ContentContainer>
        <AddressContainer>
          <Ionicons name={'location'} size={10} color={colors.GRAY_500} />
          <AddressText ellipsizeMode={'tail'} numberOfLines={1}>
            {post.address}
          </AddressText>
        </AddressContainer>

        <TitleText>{post.title}</TitleText>

        <InfoContainer>
          <InfoRow>
            <InfoColumn>
              <InfoColumnKeyText>방문날짜</InfoColumnKeyText>
              <InfoColumnValueText>{getLocaleFormat(post.date)}</InfoColumnValueText>
            </InfoColumn>

            <InfoColumn>
              <InfoColumnKeyText>평점</InfoColumnKeyText>
              <InfoColumnValueText>{post.score}점</InfoColumnValueText>
            </InfoColumn>
          </InfoRow>

          <InfoRow>
            <InfoColumn>
              <InfoColumnKeyText>마커색상</InfoColumnKeyText>
              <MarkerColor bg={colorHex[post.color]} />
            </InfoColumn>
          </InfoRow>
        </InfoContainer>

        <DescriptionText>{post.description}</DescriptionText>
      </ContentContainer>

      {post.images.length > 0 && (
        <ImageContentsContainer>
          <PreviewImageList imageUris={post.images} />
        </ImageContentsContainer>
      )}
    </Container>
  );
}

export default FeedDetailScreen;
