import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import DayOfWeeks from './DayOfWeeks';
import { MonthYear } from '@/utils';

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 26px 16px;
`;
const MonthButtonContainer = styled.Pressable`
  padding: 10px;
`;
const MonthYearContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.BLACK};
`;

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}
function Calendar({ monthYear, onChangeMonth }: CalendarProps) {
  const { month, year } = monthYear;
  return (
    <>
      <HeaderContainer>
        <MonthButtonContainer onPress={() => onChangeMonth(-1)}>
          <Ionicons name={'arrow-back'} size={25} color={colors.BLACK} />
        </MonthButtonContainer>
        <MonthYearContainer>
          <TitleText>
            {year}년 {month}월
          </TitleText>
          <MaterialIcons name={'keyboard-arrow-down'} size={20} color={colors.GRAY_500} />
        </MonthYearContainer>
        <MonthButtonContainer onPress={() => onChangeMonth(1)}>
          <Ionicons name={'arrow-forward'} size={25} color={colors.BLACK} />
        </MonthButtonContainer>
      </HeaderContainer>

      <DayOfWeeks />
    </>
  );
}

export default Calendar;
