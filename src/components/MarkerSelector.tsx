import React from 'react';
import { ScrollView } from 'react-native';
import CustomMarker from './CustomMarker';
import styled from 'styled-components/native';
import { colors } from '@/constants';
import { MarkerColor } from '@/types/domain';

const Container = styled.View`
  border-width: 1px;
  border-color: ${colors.GRAY_200};
  padding: 15px;
`;
const MarkerLabel = styled.Text`
  margin-bottom: 15px;
  color: ${colors.GRAY_700};
`;
const MarkerInputtScroll = styled.View`
  flex-direction: row;
  gap: 20px;
`;
const MarkerBox = styled.Pressable<{ isPressedMarker: boolean }>`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${colors.GRAY_100};
  border-radius: 6px;

  ${({ isPressedMarker }) =>
    isPressedMarker &&
    `
        border-width: 2px;
        border-color: ${colors.RED_500};
    `}
`;
interface MarkerSelectorProps {
  markerColor: MarkerColor;
  onPressMarker: (color: MarkerColor) => void;
  score?: number;
}
const categoryList: MarkerColor[] = ['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'];
function MarkerSelector({ markerColor, score = 5, onPressMarker }: MarkerSelectorProps) {
  return (
    <Container>
      <MarkerLabel>마커 선택</MarkerLabel>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <MarkerInputtScroll>
          {categoryList.map((color, idx) => {
            return (
              <MarkerBox
                key={idx}
                isPressedMarker={markerColor === color}
                onPress={() => onPressMarker(color)}
              >
                <CustomMarker color={color} score={score} />
              </MarkerBox>
            );
          })}
        </MarkerInputtScroll>
      </ScrollView>
    </Container>
  );
}

export default MarkerSelector;
