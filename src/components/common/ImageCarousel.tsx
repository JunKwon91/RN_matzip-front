import { colors } from '@/constants';
import { ImageUri } from '@/types';
import React from 'react';
import { Dimensions, FlatList, Platform, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';

const deviceWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.WHITE};
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

interface ImageCarouselProps {
  images: ImageUri[];
}
function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Container>
      <FlatList
        data={images}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ width: deviceWidth }}>
            <Image
              source={{
                uri: `${
                  Platform.OS === 'ios' ? 'http://localhost:3030' : 'http://10.0.2.2:3030'
                }/${item.uri}`,
              }}
            />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}

export default ImageCarousel;
