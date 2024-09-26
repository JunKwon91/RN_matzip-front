import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import {
  check, // 권한 상태를 확인하기 위한 함수
  Permission, // 권한 타입을 정의하는 타입
  PERMISSIONS, // 권한 상수를 정의한 객체
  request, // 권한을 요청하기 위한 함수
  RESULTS, // 권한 상태의 결과 상수를 정의한 객체
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO'; // 사용자가 요청할 수 있는 권한의 타입을 정의
type PermissionOS = {
  [key in PermissionType]: Permission; // PermissionType에 따라 각각의 OS에 맞는 Permission을 매핑
};

// 안드로이드에서 사용할 권한을 정의
const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, // 위치 접근 권한
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, // 사진 접근 권한
};

// iOS에서 사용할 권한을 정의
const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, // 위치 접근 권한
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY, // 사진 접근 권한
};

// 권한 요청에 대한 알림 메시지를 정의
const alerts = {
  LOCATION_PERMISSION: {
    TITLE: '위치 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 위치 권한을 허용해주세요.',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 접근 권한이 필요합니다.',
    DESCRIPTION: '설정 화면에서 사진 권한을 허용해주세요.',
  },
} as const;

function usePermission(type: PermissionType) {
  // 컴포넌트가 마운트될 때 권한을 확인
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android'; // 현재 플랫폼이 Android인지 확인
      const permissionOS = isAndroid ? androidPermissions : iosPermissions; // 플랫폼에 따라 사용할 권한 객체를 선택

      // 현재 권한 상태를 확인한다.
      const checked = await check(permissionOS[type]);
      console.log(checked);

      // 권한 요청이 필요할 때 사용자에게 알림을 표시하는 함수
      const showPermissionAlert = () =>
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(), // 설정 화면을 연다.
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ]
        );

      // 현재 권한 상태에 따라 작업 수행
      switch (checked) {
        case RESULTS.DENIED: // 권한이 거부된 경우
          if (isAndroid) {
            showPermissionAlert(); // Android에서 권한이 거부되었을 때, 사용자에게 알림 표시
            return;
          }
          await request(permissionOS[type]); // iOS에서는 권한을 요청
          break;
        case RESULTS.BLOCKED: // 권한이 차단된 경우
        case RESULTS.LIMITED: // 권한이 제한된 경우
          showPermissionAlert(); // 사용자에게 알림 표시
          break;
        default:
          break;
      }
    })();
  }, [type]); // type이 변경될 때마다 다시 실행
}

export default usePermission;
