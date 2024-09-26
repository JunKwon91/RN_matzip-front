/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import Octicons from 'react-native-vector-icons/Octicons';

import InputField from '@/components/InputField';
import { colors, mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/Stack/MapStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import { TextInput } from 'react-native';
import { getDateWithSeparator, validateAddPost } from '@/utils';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import { MarkerColor } from '@/types/domain';
import useGetAddress from '@/hooks/useGetAddress';
import MarkerSelector from '@/components/MarkerSelector';
import ScoreInput from '@/components/ScoreInput';
import DatePickerOption from '@/components/DatePickerOption';
import useModal from '@/hooks/useModal';
import ImageInput from '@/components/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import PreviewImageList from '@/components/PreviewImageList';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const ContentContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
  margin-bottom: 10px;
`;
const InputContainer = styled.View`
  gap: 20px;
  margin-bottom: 20px;
`;
const ImagesViewer = styled.View`
  flex-direction: row;
`;

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({ route, navigation }: AddPostScreenProps) {
  const location = route.params.location;
  const descriptionRef = useRef<TextInput | null>(null);
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  const createPost = useMutateCreatePost();
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);

  const address = useGetAddress(location);
  const dateOption = useModal();
  const imagePicker = useImagePicker({ initialImages: [] });

  usePermission('PHOTO');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [addPost, markerColor, score, address]);

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };
    createPost.mutate(
      { address, ...location, ...body },
      {
        onSuccess: () => navigation.goBack(),
        onError: ({ response }) => console.log(response),
      }
    );
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  return (
    <Container>
      <ContentContainer>
        <InputContainer>
          <InputField
            value={address}
            disabled
            icon={<Octicons name={'location'} size={16} color={colors.GRAY_500} />}
          />
          <CustomButton
            variant={'outlined'}
            size={'large'}
            label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
            onPress={dateOption.show}
          />
          <InputField
            placeholder={'제목을 입력하세요.'}
            error={addPost.errors.title}
            touched={addPost.touched.title}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder={'기록하고 싶은 내용을 입력하세요. (선택)'}
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            blurOnSubmit={false}
            returnKeyType={'next'}
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            markerColor={markerColor}
            score={score}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />

          <ImagesViewer>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </ImagesViewer>

          <DatePickerOption
            date={date}
            isVisible={dateOption.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </InputContainer>
      </ContentContainer>
    </Container>
  );
}

export default AddPostScreen;
