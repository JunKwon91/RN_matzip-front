import EncryptedStorage from 'react-native-encrypted-storage';

// 데이터를 암호화하여 저장하는 함수
const setEncryptStorage = async <T>(key: string, data: T) => {
  // 데이터를 JSON 문자열로 변환하여 주어진 키로 저장
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

// 암호화된 저장소에서 데이터를 불러오는 함수
const getEncryptStorage = async (key: string) => {
  // 주어진 키로 저장된 데이터를 가져온다.
  const storageData = await EncryptedStorage.getItem(key);

  // 데이터가 존재하면 JSON 문자열을 객체로 변환하여 반환하고, 없으면 null을 반환
  return storageData ? JSON.parse(storageData) : null;
};

// 암호화된 저장소에서 데이터를 삭제하는 함수
const removeEncryptStorage = async (key: string) => {
  // 삭제하기 전에 데이터가 존재하는지 확인
  const data = await getEncryptStorage(key);

  // 데이터가 존재하면,
  if (data) {
    // 해당 키로 저장된 데이터를 삭제
    await EncryptedStorage.removeItem(key);
  }
};

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
