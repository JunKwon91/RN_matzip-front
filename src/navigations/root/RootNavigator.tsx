import AuthStackNavigator from '../Stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigarot';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const { isLogin } = useAuth();

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
