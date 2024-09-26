import axiosInstance from './axios';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const { data } = await axiosInstance.post('/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data', // 주의: 이 부분이 없으면 이미지 업로드 시 에러가 날 수 있다.
    },
  });
  return data;
};

export { uploadImages };
