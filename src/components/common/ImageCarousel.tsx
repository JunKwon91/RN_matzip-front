import { colors } from '@/constants';
import { ImageUri } from '@/types';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import Octicons from 'react-native-vector-icons/Octicons';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.WHITE};
`;
const FlatListContainer = styled(FlatList as new () => FlatList<ImageUri>)<
  FlatListProps<ImageUri>
>``;
const ImageContainer = styled.View`
  width: ${deviceWidth}px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const BackButton = styled.Pressable<{ insets: EdgeInsets }>`
  position: absolute;
  left: 20px;
  z-index: 1;
  background-color: ${colors.PINK_700};
  width: 40px;
  height: 40px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  margin-top: ${({ insets }) => insets.top + 10}px;
`;
const PageContainer = styled.View<{ insets: EdgeInsets }>`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: ${({ insets }) => insets.bottom + 10}px;
`;
const PageDot = styled.View<{ currentPageDot: boolean }>`
  margin: 4px;
  background-color: ${({ currentPageDot }) =>
    currentPageDot ? colors.PINK_700 : colors.GRAY_200};
  width: 8px;
  height: 8px;
  border-radius: 4px;
`;

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}
function ImageCarousel({ images, pressedIndex = 0 }: ImageCarouselProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [page, setPage] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);
    setPage(newPage);
  };

  return (
    <Container>
      <BackButton insets={insets} onPress={() => navigation.goBack()}>
        <Octicons name={'arrow-left'} size={30} color={colors.WHITE} />
      </BackButton>
      <FlatListContainer
        data={images}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ImageContainer>
            <Image
              source={{
                uri: `${
                  Platform.OS === 'ios' ? 'http://localhost:3030' : 'http://10.0.2.2:3030'
                }/${item.uri}`,
              }}
              resizeMode={'contain'}
            />
          </ImageContainer>
        )}
        onScroll={handleScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />

      <PageContainer insets={insets}>
        {Array.from({ length: images.length }, (_, index) => (
          <PageDot key={index} currentPageDot={index === page} />
        ))}
      </PageContainer>
    </Container>
  );
}

export default ImageCarousel;
