/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import styled from 'styled-components/native';

import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import PreviewImageList from '@/components/common/PreviewImageList';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import DatePickerOption from '@/components/post/DatePickerOption';
import ImageInput from '@/components/post/ImageInput';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import { colors } from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useDetailStore from '@/store/useDetailPostStore';
import { MarkerColor } from '@/types/domain';
import { getDateWithSeparator, validateAddPost } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput } from 'react-native';
import { LatLng } from 'react-native-maps';

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

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}
function PostForm({ location, isEdit = false }: PostFormProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const { detailPost } = useDetailStore();
  const dateOption = useModal();

  const isEditMode = isEdit && detailPost;
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const [date, setDate] = useState(
    isEditMode ? new Date(String(detailPost.date)) : new Date()
  );
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED'
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost.images : [],
  });
  const [isPicked, setIsPicked] = useState(false);

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

    if (isEditMode) {
      // Update
      updatePost.mutate(
        {
          id: detailPost.id,
          body: body,
        },
        {
          onSuccess: () => navigation.goBack(),
          onError: ({ response }) => console.log(response),
        }
      );

      return;
    }

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
            label={isPicked || isEdit ? getDateWithSeparator(date, '. ') : '날짜 선택'}
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
              showOption
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

export default PostForm;
