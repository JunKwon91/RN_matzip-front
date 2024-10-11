/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Dimensions, Insets, Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import {
  colorHex,
  colors,
  feedNavigations,
  mainNavigations,
  mapNavigations,
} from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getLocaleFormat } from '@/utils';
import PreviewImageList from '@/components/common/PreviewImageList';
import CustomButton from '@/components/common/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigarot';
import useLocationStore from '@/store/useLocationStore';
import useModal from '@/hooks/useModal';
import FeedDetailOption from '@/components/feed/FeedDetailOption';
import useDetailStore from '@/store/useDetailPostStore';

const Container = styled.ScrollView<{ insets: Insets }>`
  position: relative;

  ${({ insets }) =>
    insets.bottom
      ? `
    margin-bottom: ${insets.bottom + 50}px;
  `
      : `
    margin-bottom: 65px;
  `}
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
const BottomContainer = styled.View<{ paddingBottom: number }>`
  position: absolute;
  bottom: 0px;
  width: 100%;
  align-items: flex-end;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${colors.WHITE};
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${colors.GRAY_200};
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
`;
const TabContainer = styled.View<{ isTabContainerNoInsets: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  ${({ isTabContainerNoInsets }) =>
    isTabContainerNoInsets &&
    `
    margin-bottom: 10px;
  `}
`;
const BookmarkBtn = styled.Pressable`
  background-color: ${colors.PINK_700};
  height: 100%;
  padding: 0px 5px;
  justify-content: center;
  border-radius: 3px;
`;

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;
function FeedDetailScreen({ route, navigation }: FeedDetailScreenProps) {
  const { id } = route.params;
  const { data: post, isPending, isError } = useGetPost(id);
  const insets = useSafeAreaInsets();
  const { setMoveLocation } = useLocationStore();
  const { setDetailPost } = useDetailStore();
  const detailOption = useModal();

  useEffect(() => {
    post && setDetailPost(post);
  }, [post]);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const { latitude, longitude } = post;
    setMoveLocation({ latitude, longitude });

    navigation.navigate(mainNavigations.HOME, {
      screen: mapNavigations.MAP_HOME,
    });
  };

  return (
    <>
      <Container insets={insets} scrollIndicatorInsets={{ right: 1 }}>
        <HeaderContainer>
          <Header>
            <Octicons
              name={'arrow-left'}
              size={30}
              color={colors.WHITE}
              onPress={() => navigation.goBack()}
            />
            <Ionicons
              name={'ellipsis-vertical'}
              size={30}
              color={colors.WHITE}
              onPress={detailOption.show}
            />
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
            <PreviewImageList imageUris={post.images} zoomEnable />
          </ImageContentsContainer>
        )}
      </Container>

      <BottomContainer paddingBottom={insets.bottom}>
        <TabContainer isTabContainerNoInsets={insets.bottom === 0}>
          <BookmarkBtn
            style={({ pressed }) => pressed && styles.bookmarkPressedContainer}
          >
            <Octicons name={'star-fill'} size={30} color={colors.GRAY_100} />
          </BookmarkBtn>
          <CustomButton
            label={'위치보기'}
            size={'medium'}
            variant={'filled'}
            onPress={handlePressLocation}
          />
        </TabContainer>
      </BottomContainer>

      <FeedDetailOption
        isVisible={detailOption.isVisible}
        hideOption={detailOption.hide}
      />
    </>
  );
}
const styles = StyleSheet.create({
  bookmarkPressedContainer: {
    opacity: 0.5,
  },
});

export default FeedDetailScreen;
