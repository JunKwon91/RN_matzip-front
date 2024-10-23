import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '@/constants';

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const Item = styled.View`
  width: ${Dimensions.get('window').width / 7}px;
  align-items: center;
`;
const DayOfWeekText = styled.Text<{ dayOfweek: string }>`
  font-size: 12px;
  color: ${({ dayOfweek }) =>
    dayOfweek === '토'
      ? colors.BLUE_500
      : dayOfweek === '일'
      ? colors.RED_500
      : colors.BLACK};
`;

function DayOfWeeks() {
  return (
    <Container>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfweek, i) => {
        return (
          <Item key={i}>
            <DayOfWeekText dayOfweek={dayOfweek}>{dayOfweek}</DayOfWeekText>
          </Item>
        );
      })}
    </Container>
  );
}

export default DayOfWeeks;
