import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import useAppState from './useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    // 초기값으로 서울의 특정 좌표를 설정합니다.
    latitude: 37.204034,
    longitude: 127.044486,
  });

  // 위치 정보에 대한 오류 상태를 관리
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  // 앱이 활성화되거나 백그라운드로 전환될 때 상태를 추적하는 커스텀 훅
  const { isComback } = useAppState();

  // 컴포넌트가 마운트될 때 현재 위치를 가져오기.
  useEffect(() => {
    // Geolocation API를 사용하여 현재 위치를 가져온다.
    Geolocation.getCurrentPosition(
      (info) => {
        // 위치를 성공적으로 가져오면, coords에서 latitude와 longitude를 추출
        const { latitude, longitude } = info.coords;

        // 추출한 좌표를 userLocation에 업데이트
        setUserLocation({ latitude, longitude });

        // 위치 정보를 성공적으로 가져왔으므로 오류 상태는 false로 설정
        setIsUserLocationError(false);
      },
      () => {
        // 위치 정보를 가져오는 데 실패하면 오류 상태를 true로 설정
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true, // 위치 정보를 최대한 정확하게 가져오기 위해 고정밀 모드를 활성화
      }
    );
  }, [isComback]);

  return { userLocation, isUserLocationError };
}

export default useUserLocation;
