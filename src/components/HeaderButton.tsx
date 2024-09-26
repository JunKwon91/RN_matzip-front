import { colors } from '@/constants';
import React, { ReactNode } from 'react';
import { PressableProps } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.Pressable`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
`;
const LabelText = styled.Text<{ hasError: boolean }>`
  font-size: 15px;
  font-weight: 500;
  color: ${({ hasError }) => (hasError ? colors.GRAY_200 : colors.PINK_700)};
`;

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

function HeaderButton({
  labelText,
  icon,
  hasError = false,
  ...props
}: HeaderButtonProps) {
  return (
    <Container {...props} disabled={hasError}>
      {!labelText && icon}
      {!icon && labelText && <LabelText hasError={hasError}>{labelText}</LabelText>}
    </Container>
  );
}

export default HeaderButton;
