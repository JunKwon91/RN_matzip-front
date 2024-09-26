import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

function useAppState() {
  // 현재 앱 상태를 참조하기 위한 ref를 생성 (초기값은 AppState의 현재 상태)
  const appState = useRef(AppState.currentState);

  // 현재 앱 상태를 저장하는 상태 변수 (초기값은 appState의 현재 값)
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // 앱이 백그라운드에서 다시 활성화되었는지를 추적
  const [isComback, setIsComback] = useState(false);

  useEffect(() => {
    // 앱 상태 변경 이벤트를 감지하는 리스너 추가
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // 현재 상태가 'inactive' 또는 'background'였고, 새로운 상태가 active라면,
      // 즉, 앱이 백그라운드에서 다시 활성화되었다면 isComback을 true로 설정한다.
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        setIsComback(true);
      }

      // 현재 상태가 'active'였고, 새로운 상태가 'background'로 변경되었다면,
      // 즉, 앱이 백그라운드로 전환되었다면 isComback을 false로 설정한다.
      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComback(false);
      }

      // 현재 상태를 새로운 상태로 업데이트
      appState.current = nextAppState;

      // appStateVisible 상태를 새로운 상태로 업데이트합니다.
      setAppStateVisible(appState.current);
    });

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거한다.
    return () => {
      subscription.remove();
    };
  }, []);

  return { isComback, appStateVisible };
}

export default useAppState;
