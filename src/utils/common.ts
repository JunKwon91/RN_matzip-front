import { ForwardedRef } from 'react';

// mergeRefs 함수는 제네릭 타입 T를 받아, 여러 ForwardedRef<T>를 매개변수로 취합니다.
function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
  // 노드를 매개변수로 받는 함수(레퍼런스 콜백)를 반환합니다.
  return (node: T) => {
    refs.forEach((ref) => {
      // 전달받은 모든 레퍼런스를 순회하면서 다음을 수행합니다.
      if (typeof ref === 'function') {
        // 레퍼런스가 함수일 경우
        ref(node); // 해당 함수 레퍼런스를 호출하여 node를 전달합니다.
      } else if (ref) {
        // 레퍼런스가 객체일 경우 (ref가 null이 아닌 경우)
        ref.current = node; // ref 객체의 current 속성에 node를 할당합니다.
      }
    });
  };
}

export { mergeRefs }; // mergeRefs 함수를 외부에서 사용할 수 있도록 내보냅니다.
