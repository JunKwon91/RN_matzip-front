import axiosInstance from './axios';
import { ImageUri, Post } from '@/types/domain';

type ResponsePost = Post & { images: ImageUri[] };

// Post 타입에서 id 속성을 제외한 새로운 타입을 만들고, 그 타입에 imageUris 속성을 추가
type RequestCreatePost = Omit<Post, 'id'> & { imageUris: ImageUri[] };
const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const { data } = await axiosInstance.post('/posts', body);

  return data;
};

type ResponseSinglePost = ResponsePost & { isFavorite: boolean };
const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
};

const getPosts = async (page = 1): Promise<ResponsePost[]> => {
  const { data } = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
};

const deletePost = async (id: number) => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUris: ImageUri[];
  };
};
const updatePost = async ({
  id,
  body,
}: RequestUpdatePost): Promise<ResponseSinglePost> => {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
};

export { createPost, getPost, getPosts, deletePost, updatePost };
export type { ResponsePost, RequestCreatePost, ResponseSinglePost, RequestUpdatePost };
