import { colors } from '@/constants';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const Label = styled.Text`
  font-size: 12px;
  color: ${colors.GRAY_500};
`;

interface ImageInputProps {
  onChange: () => void;
}
function ImageInput({ onChange }: ImageInputProps) {
  return (
    <Pressable
      onPress={onChange}
      style={(pressed) => [pressed && styles.imageInputPressed, styles.imageInput]}
    >
      <Ionicons name={'camera-outline'} size={20} color={colors.GRAY_500} />
      <Label>사진추가</Label>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_300,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  imageInputPressed: {
    opacity: 0.5,
  },
});

export default ImageInput;
