import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from './HeaderButton';
import { colors } from '@/constants';

interface FeedHomeHeaderLeftProps {}

function FeedHomeHeaderLeft({}: FeedHomeHeaderLeftProps) {
  return (
    <HeaderButton icon={<Ionicons name={'menu'} color={colors.BLACK} size={25} />} />
  );
}

export default FeedHomeHeaderLeft;
