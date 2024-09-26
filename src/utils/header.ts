import axiosInstance from '@/api/axios';

// setHeader 함수는 키와 값을 매개변수로 받아 axios 인스턴스의 공통 헤더에 설정
function setHeader(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value; // axios 인스턴스의 기본 헤더에 새로운 키-값 쌍을 추가 및 업데이트
}

// removeHeader 함수는 키를 매개변수로 받아 해당 키의 헤더를 axios 인스턴스에서 제거
function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    // 지정된 키의 헤더가 존재하지 않으면 함수 종료
    return;
  }

  delete axiosInstance.defaults.headers.common[key]; // axios 인스턴스의 기본 헤더에서 지정된 키를 가진 헤더 삭제
}

export { setHeader, removeHeader };
