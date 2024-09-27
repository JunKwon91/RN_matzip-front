import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions } from 'react-native';
import { AuthStackParamList } from '@/navigations/Stack/AuthStackNavigator';
import { authNavigations } from '@/constants/navigations';
import styled from 'styled-components/native';
import CustomButton from '@/components/common/CustomButton';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 30px;
  align-items: center;
`;
const ImageContainer = styled.View`
  flex: 1.5;
  width: ${Dimensions.get('screen').width / 2}px;
`;
const ImageStyled = styled.Image`
  width: 100%;
  height: 100%;
`;
const ButtonContainer = styled.View`
  flex: 1;
  gap: 10px;
`;

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
  return (
    <Container>
      <ImageContainer>
        <ImageStyled resizeMode={'contain'} source={require('../../assets/matzip.png')} />
      </ImageContainer>

      <ButtonContainer>
        <CustomButton
          label={'로그인하기'}
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label={'회원가입하기'}
          variant={'outlined'}
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </ButtonContainer>
    </Container>
  );
}

export default AuthHomeScreen;
