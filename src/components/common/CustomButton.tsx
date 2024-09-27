import React from 'react';
import { colors } from '@/constants';
import { StyleSheet, PressableProps, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const PressableBtn = styled.Pressable<{ variant: string; inValid: boolean }>`
  border-radius: 3px;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ variant, inValid }) =>
    variant === 'filled' ? (inValid ? colors.PINK_500 : colors.PINK_700) : 'transparent'};
  border-color: ${({ variant }) =>
    variant === 'outlined' ? colors.PINK_700 : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  opacity: ${({ inValid }) => (inValid ? 0.5 : 1)};
`;
const PressableTextContainer = styled.View<{ size: string }>`
  width: 100%;
  padding: ${({ size }) =>
    size === 'large'
      ? deviceHeight > 700
        ? '15px'
        : '10px'
      : deviceHeight > 700
      ? '12px'
      : '8px'};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const PressableText = styled.Text<{ variant: string }>`
  font-size: 16px;
  font-weight: 700;

  color: ${({ variant }) => (variant === 'filled' ? colors.WHITE : colors.PINK_700)};
`;

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  inValid?: boolean;
}
// screen, window: iOS에서는 차이점이 없다.
// Android에서 screen은 상태표시줄까지 포함하는 크기
const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) {
  return (
    <PressableBtn
      disabled={inValid}
      inValid={inValid}
      variant={variant}
      style={({ pressed }) => [
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
      ]}
      {...props}
    >
      <PressableTextContainer size={size}>
        <PressableText variant={variant}>{label}</PressableText>
      </PressableTextContainer>
    </PressableBtn>
  );
}

const styles = StyleSheet.create({
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
});

export default CustomButton;
