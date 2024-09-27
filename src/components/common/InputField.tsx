import React, { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import { Dimensions, TextInput, TextInputProps } from 'react-native';
import { colors } from '../../constants';
import { mergeRefs } from '../../utils';
import styled from 'styled-components/native';

const deviceHeight = Dimensions.get('screen').height;

const PressableContainer = styled.Pressable``;
const TextInputContainer = styled.View<InputFieldProps>`
  border-width: 1px;
  border-color: ${({ touched, error }) =>
    touched && Boolean(error) ? colors.RED_300 : colors.GRAY_200};
  padding: ${deviceHeight > 700 ? 15 : 10}px;
  background-color: ${({ disabled }) => disabled && colors.GRAY_200};
  color: ${({ disabled }) => disabled && colors.GRAY_700};
`;
const ErrorTxt = styled.Text`
  color: ${colors.RED_500};
  font-size: 12px;
  padding-top: 5px;
`;
const TextInputStyled = styled(TextInput)<{ disabled: boolean }>`
  font-size: 16px;
  padding: 0px;
  background-color: ${({ disabled }) => (disabled ? colors.GRAY_200 : colors.WHITE)};
  color: ${({ disabled }) => (disabled ? colors.GRAY_700 : colors.BLACK)};
  ${({ multiline }) =>
    multiline &&
    `
      padding-bottom: ${deviceHeight > 700 ? 45 : 30}px
    `}
`;
const InnerContainer = styled.View<{ isIcon: boolean }>`
  ${({ isIcon }) =>
    isIcon &&
    `
      flex-direction: row;
      align-items: center;
      gap: 5px;
  `}
`;

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}
const InputField = forwardRef(
  (
    { disabled = false, error, icon = null, touched, ...props }: InputFieldProps,
    ref?: ForwardedRef<TextInput>
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <PressableContainer onPress={handlePressInput}>
        <TextInputContainer disabled={disabled} touched={touched} error={error}>
          <InnerContainer isIcon={Boolean(icon)}>
            {icon}
            <TextInputStyled
              disabled={disabled}
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              placeholderTextColor={colors.GRAY_500}
              autoCapitalize={'none'}
              spellCheck={false}
              autoCorrect={false}
              {...props}
            />
          </InnerContainer>
          {touched && Boolean(error) && <ErrorTxt>{error}</ErrorTxt>}
        </TextInputContainer>
      </PressableContainer>
    );
  }
);

export default InputField;
