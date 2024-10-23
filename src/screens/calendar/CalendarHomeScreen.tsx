import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '@/constants';
import Calendar from '@/components/calendar/Calendar';
import { getMonthYearDetails, getNewMonthYear } from '@/utils';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear((prev) => getNewMonthYear(prev, increment));
  };

  return (
    <Container>
      <Calendar monthYear={monthYear} onChangeMonth={handleUpdateMonth} />
    </Container>
  );
}

export default CalendarHomeScreen;
