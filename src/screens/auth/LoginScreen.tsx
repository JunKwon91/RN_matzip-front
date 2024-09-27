import React, { useRef } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import useForm from '@/hooks/useForm';
import { validateLogin } from '../../utils';
import useAuth from '@/hooks/queries/useAuth';
import styled from 'styled-components/native';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 30px;
`;
const InputContainer = styled.View`
  gap: 20px;
  margin-bottom: 30px;
`;

function LoginScreen() {
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const passwordRef = useRef<TextInput | null>(null);
  const { loginMutation } = useAuth();
  const handleSubmit = () => {
    console.log('values: ', login.values);
    loginMutation.mutate(login.values);
  };

  return (
    <Container>
      <InputContainer>
        <InputField
          autoFocus
          placeholder={'이메일'}
          error={login.errors.email}
          touched={login.touched.email}
          inputMode={'email'}
          blurOnSubmit={false}
          returnKeyType={'next'}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder={'비밀번호'}
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          blurOnSubmit={false}
          returnKeyType={'join'}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </InputContainer>

      <CustomButton
        label={'로그인'}
        variant={'filled'}
        size={'large'}
        onPress={handleSubmit}
      />
    </Container>
  );
}

export default LoginScreen;
