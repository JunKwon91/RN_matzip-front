import React from 'react';
import { colors } from '@/constants';
import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';

const Container = styled.View`
  flex: 1;
  padding: 15px;
  border-width: 1px;
  border-color: ${colors.GRAY_200};
`;
const LabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const LabelText = styled.Text`
  color: ${colors.GRAY_700};
`;

interface ScoreInputProps {
  score: number;
  onChangeScore: (valie: number) => void;
}

function ScoreInput({ score, onChangeScore }: ScoreInputProps) {
  return (
    <Container>
      <LabelContainer>
        <LabelText>평점</LabelText>
        <LabelText>{score}점</LabelText>
      </LabelContainer>
      <Slider
        value={score}
        onValueChange={onChangeScore}
        step={1}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor={colors.PINK_700}
        maximumTrackTintColor={colors.GRAY_300}
        thumbTintColor={colors.GRAY_100}
      />
    </Container>
  );
}

export default ScoreInput;
