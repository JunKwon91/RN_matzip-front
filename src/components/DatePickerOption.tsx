import { Modal } from 'react-native';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import React from 'react';
import { colors } from '@/constants';

const OptionBackground = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0 0 0 / 0.5);
`;
const OptionContainer = styled.View`
  border-radius: 15px;
  margin: 0px 10px 10px 10px;
  background-color: ${colors.GRAY_100};
  overflow: hidden;
`;
const OptionButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  gap: 5px;
`;
const OptionButtonLabel = styled.Text`
  color: ${colors.BLUE_500};
  font-size: 17px;
  font-weight: 500;
`;
const PickerContainer = styled.View`
  align-items: center;
`;

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}
function DatePickerOption({
  isVisible,
  date,
  onChangeDate,
  onConfirmDate,
}: DatePickerOptionProps) {
  return (
    <Modal visible={isVisible} transparent animationType={'slide'}>
      <OptionBackground>
        <OptionContainer>
          <PickerContainer>
            <DatePicker
              mode={'date'}
              theme={'auto'}
              date={date}
              onDateChange={onChangeDate}
              locale={'ko'}
            />
          </PickerContainer>
        </OptionContainer>
        <OptionContainer>
          <OptionButton onPress={onConfirmDate}>
            <OptionButtonLabel>확인</OptionButtonLabel>
          </OptionButton>
        </OptionContainer>
      </OptionBackground>
    </Modal>
  );
}

export default DatePickerOption;
