/* eslint-disable react/react-in-jsx-scope */
import { colors } from '@/constants';
import { createContext, PropsWithChildren, ReactNode, useContext } from 'react';
import { GestureResponderEvent, Modal, ModalProps, PressableProps } from 'react-native';
import styled from 'styled-components/native';

interface OptionContextValue {
  onClickOutSide?: (event: GestureResponderEvent) => void;
}
const OptionContext = createContext<OptionContextValue | undefined>(undefined);

const ModalContainer = styled(Modal)``;
const OptionBackground = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0 0 0 /0.5);
`;
interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animateType?: ModalProps['animationType'];
}
function OptionMain({
  children,
  isVisible,
  hideOption,
  animateType = 'slide',
  ...props
}: OptionMainProps) {
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };
  return (
    <ModalContainer
      visible={isVisible}
      transparent={true}
      animationType={animateType}
      onRequestClose={hideOption}
      {...props}
    >
      <OptionContext.Provider value={{ onClickOutSide }}>
        {children}
      </OptionContext.Provider>
    </ModalContainer>
  );
}

function Background({ children }: PropsWithChildren) {
  const optionContext = useContext(OptionContext);
  return (
    <OptionBackground onTouchEnd={optionContext?.onClickOutSide}>
      {children}
    </OptionBackground>
  );
}

const OptionContainer = styled.View`
  border-radius: 15px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${colors.GRAY_100};
`;
function Container({ children }: PropsWithChildren) {
  return <OptionContainer>{children}</OptionContainer>;
}

const OptionButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  gap: 5px;
`;
const OptionText = styled.Text<{ isDanger: boolean }>`
  font-size: 17px;
  color: ${colors.BLUE_500};
  font-weight: 500;

  ${({ isDanger }) =>
    isDanger &&
    `
    color: ${colors.RED_500};
  `}
`;
interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
}
function Button({ children, isDanger = false, ...props }: ButtonProps) {
  return (
    <OptionButton
      {...props}
      style={({ pressed }) => pressed && { backgroundColor: colors.GRAY_500 }}
    >
      <OptionText isDanger={isDanger}>{children}</OptionText>
    </OptionButton>
  );
}

const TitleContainer = styled.View`
  align-items: center;
  padding: 15px;
`;
const TitleText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.BLACK};
`;
function Title({ children }: PropsWithChildren) {
  return (
    <TitleContainer>
      <TitleText>{children}</TitleText>
    </TitleContainer>
  );
}

const Border = styled.View`
  border-bottom-color: ${colors.GRAY_200};
  border-bottom-width: 1px;
`;
function Divider() {
  return <Border />;
}

export const CompoundOption = Object.assign(OptionMain, {
  Container,
  Background,
  Button,
  Title,
  Divider,
});
