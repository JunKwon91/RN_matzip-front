import React, { useRef } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import useForm from '@/hooks/useForm';
import { validateSignup } from '@/utils';
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

function SignupScreen() {
  const signup = useForm({
    initialValue: { email: '', password: '', passwordConfirm: '' },
    validate: validateSignup,
  });

  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const { signupMutation, loginMutation } = useAuth();
  const handleSubmit = () => {
    const { email, password } = signup.values;
    console.log(email, password);
    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => loginMutation.mutate({ email, password }),
      }
    );
  };

  return (
    <Container>
      <InputContainer>
        <InputField
          placeholder={'이메일'}
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode={'email'}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder={'비밀번호'}
          textContentType={'oneTimeCode'}
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder={'비밀번호 확인'}
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </InputContainer>
      <CustomButton label={'회원가입'} onPress={handleSubmit} />
    </Container>
  );
}

export default SignupScreen;
