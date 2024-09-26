import { ImageUri } from '@/types/domain';
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';

const ScrollContainer = styled.ScrollView``;
const Container = styled.View`
  flex-direction: row;
  padding: 0px 15px;
  gap: 15px;
`;
const ImageContainer = styled.Pressable`
  width: 70px;
  height: 70px;
`;
const ImageView = styled.Image`
  width: 100%;
  height: 100%;
`;
const ImageButton = styled.Pressable<{
  isDeleteButton?: boolean;
  moveButton?: 'right' | 'left';
}>`
  position: absolute;
  background-color: ${colors.BLACK};
  z-index: 1;

  ${({ isDeleteButton }) =>
    isDeleteButton &&
    `
        top: 0px;
        right: 0px;
    `}
  ${({ moveButton }) =>
    moveButton === 'left'
      ? `
        bottom: 0px;
        left: 0px;
    `
      : moveButton === 'right' &&
        `
        bottom: 0px;
        right: 0px;
    `}
`;

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
}
function PreviewImageList({ imageUris, onDelete, onChangeOrder }: PreviewImageListProps) {
  return (
    <ScrollContainer horizontal showsHorizontalScrollIndicator={false}>
      <Container>
        {imageUris.map(({ uri }, index) => {
          return (
            <ImageContainer key={index}>
              <ImageView
                resizeMode={'cover'}
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030'
                      : 'http://10.0.2.2:3030'
                  }/${uri}`,
                }}
              />

              <ImageButton
                isDeleteButton={true}
                onPress={() => onDelete && onDelete(uri)}
              >
                <Ionicons name={'close'} size={16} color={colors.WHITE} />
              </ImageButton>

              {index > 0 && (
                <ImageButton
                  moveButton={'left'}
                  onPress={() => onChangeOrder && onChangeOrder(index, index - 1)}
                >
                  <Ionicons name={'arrow-back-outline'} size={16} color={colors.WHITE} />
                </ImageButton>
              )}

              {index < imageUris.length - 1 && (
                <ImageButton
                  moveButton={'right'}
                  onPress={() => onChangeOrder && onChangeOrder(index, index + 1)}
                >
                  <Ionicons
                    name={'arrow-forward-outline'}
                    size={16}
                    color={colors.WHITE}
                  />
                </ImageButton>
              )}
            </ImageContainer>
          );
        })}
      </Container>
    </ScrollContainer>
  );
}

export default PreviewImageList;
