import React from 'react';
import styled from 'styled-components/native';
import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Pressable, Text } from 'react-native';

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
`;
// Styled component로 DrawerContentScrollViewContainer 정의
const DrawerContentScrollViewContainer = styled(DrawerContentScrollView)`
  background-color: ${colors.WHITE};
`;
const UserInfoContainer = styled.View`
  align-items: center;
  margin-top: 15px;
  margin-bottom: 30px;
  margin-left: 15px;
  margin-right: 15px;
`;
const NameText = styled.Text`
  color: ${colors.BLACK};
`;
const UserImageContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-bottom: 10px;
`;
const UserImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 35px;
`;

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logoutMutation, getProfileQuery } = useAuth();
  const { email, nickname, imageUri, kakaoImageUri } = getProfileQuery.data || {};

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaContainer>
      <DrawerContentScrollViewContainer {...props} scrollEnabled={false}>
        <UserInfoContainer>
          <UserImageContainer>
            {imageUri === null && kakaoImageUri === null && (
              <UserImage source={require('@/assets/user-default.png')} />
            )}
            {imageUri === null && kakaoImageUri !== null && (
              <UserImage source={{ uri: kakaoImageUri }} />
            )}
            {imageUri !== null && <UserImage source={{ uri: imageUri }} />}
          </UserImageContainer>

          <NameText>{nickname ?? email}</NameText>
        </UserInfoContainer>
        {/* <DrawerItemList />는 React Navigation의 Drawer Navigator에서 제공하는 기본 컴포넌트로,
           드로어 메뉴에 설정된 화면들에 대한 항목을 자동으로 렌더링합니다.
           */}
        <DrawerItemList {...props} />

        <Pressable style={{ alignItems: 'center', padding: 10 }} onPress={handleLogout}>
          <Text>로그아웃</Text>
        </Pressable>
      </DrawerContentScrollViewContainer>
    </SafeAreaContainer>
  );
}

export default CustomDrawerContent;
