import React from 'react';
import { Dimensions, Modal, Platform } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { colors } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import CustomMarker from './CustomMarker';
import { getDateWithSeparator } from '@/utils';

const OptionBackground = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-end;
`;
const CardContainer = styled.Pressable`
  background-color: ${colors.WHITE};
  margin: 10px;
  border-radius: 20px;
  shadow-color: ${colors.BLACK};
  shadow-offset: 3px 3px;
  shadow-opacity: 0.2;
  elevation: 1;
  border-color: ${colors.GRAY_500};
  border-width: 1.5px;
`;
const CardInner = styled.View`
  padding: 20px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const CardAlign = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ImageContainer = styled.View<{ isEmpty?: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 35px;

  ${({ isEmpty }) =>
    isEmpty &&
    `
        justify-content: center;
        align-items: center;
        border-color: ${colors.GRAY_200};
        border-radius: 35px;
        border-width: 1px;
    `}
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 35px;
`;
const InfoContainer = styled.View`
  width: ${Dimensions.get('screen').width / 2}px;
  margin-left: 15px;
  gap: 5px;
`;
const AddressContainer = styled.View`
  gap: 5px;
  flex-direction: row;
  align-items: center;
`;
const AddressTxet = styled.Text`
  color: ${colors.GRAY_500};
  font-size: 10px;
`;
const TitleText = styled.Text`
  color: ${colors.BLACK};
  font-size: 15px;
  font-weight: bold;
`;
const DateText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.PINK_700};
`;

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}
function MarkerModal({ markerId, isVisible, hide }: MarkerModalProps) {
  const { data: post, isPending, isError } = useGetPost(markerId);

  if (isPending || isError) {
    return <></>;
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType={'slide'}>
      <OptionBackground onTouchEnd={hide}>
        <CardContainer onPress={() => {}}>
          <CardInner>
            <CardAlign>
              {post?.images.length > 0 && (
                <ImageContainer>
                  <Image
                    source={{
                      uri: `${
                        Platform.OS === 'ios'
                          ? 'http://localhost:3030'
                          : 'http://10.0.2.2:3030'
                      }/${post.images[0].uri}`,
                    }}
                    resizeMode={'cover'}
                  />
                </ImageContainer>
              )}
              {post?.images.length === 0 && (
                <ImageContainer isEmpty={true}>
                  <CustomMarker color={post.color} score={post.score} />
                </ImageContainer>
              )}
              <InfoContainer>
                <AddressContainer>
                  <Octicons name={'location'} size={16} color={colors.GRAY_500} />
                  <AddressTxet numberOfLines={1} ellipsizeMode={'tail'}>
                    {post?.address}
                  </AddressTxet>
                </AddressContainer>
                <TitleText>{post.title}</TitleText>
                <DateText>{getDateWithSeparator(post.date, '.')}</DateText>
              </InfoContainer>

              <MaterialIcons name={'arrow-forward-ios'} size={20} color={colors.BLACK} />
            </CardAlign>
          </CardInner>
        </CardContainer>
      </OptionBackground>
    </Modal>
  );
}

export default MarkerModal;
