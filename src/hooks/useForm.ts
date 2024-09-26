import { useEffect, useState } from 'react';

// 제네릭 타입 T를 사용하는 UseFormProps 인터페이스 정의
interface UseFormProps<T> {
  initialValue: T; // 폼의 초기값 지정
  validate: (value: T) => Record<keyof T, string>; // 유효성 검사 함수를 지정하고 각 필드에 대한 오류 메시지 반환
}

// useForm 커스텀 훅을 정의 (initialValue와 validate를 매개변수로 받는다.)
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue); // 폼의 현재 값을 상태로 관리
  const [touched, setTouched] = useState<Record<string, boolean>>({}); // 폼의 각 필드가 포커스를 잃었는지를 체크
  const [errors, setErrors] = useState<Record<string, string>>({}); // 각 필드의 오류 메시지를 상태로 관리

  // 텍스트 입력 필드의 값이 변경될 때 호출되는 함수
  const handleChangeText = (name: keyof T, text: string) => {
    setValues({
      ...values, // 현재의 모든 값을 복사
      [name]: text, // 변경된 필드의 이름의 키를 사용하여 새로운 값을 설정
    });
  };

  // 입력 필드가 포커스를 잃을 때 호출되는 함수
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched, // 현재의 모든 터치 상태를 복사
      [name]: true, // 포커스를 잃은 필드를 true로 설정
    });
  };

  // 입력 필드에 필요한 속성을 반환하는 함수
  const getTextInputProps = (name: keyof T) => {
    const value = values[name]; // 현재 필드의 값을 가져온다.
    const onChangeText = (text: string) => handleChangeText(name, text); // 텍스트가 변경될 때 호출되는 콜백 설정
    const onBlur = () => handleBlur(name); // 입력 필드가 포커스를 잃을 때 호출되는 콜백 설정

    return { value, onChangeText, onBlur }; // 입력 필드에 필요한 속성 반환
  };

  // 컴포넌트가 마운트되거나 values가 변경될 때마다 실행됩니다.
  useEffect(() => {
    const newErrors = validate(values); // 유효성 검사 함수를 통해 현재 값의 오류를 가져온다.
    setErrors(newErrors); // 오류 상태 갱신
  }, [validate, values]);

  return { values, errors, touched, getTextInputProps };
}

export default useForm;
