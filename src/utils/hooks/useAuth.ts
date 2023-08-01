import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../store/hooks';
import {getUser} from '../../store/user/user.actions';
import {removeUser} from '../../store/user/user.slice';
import {setUnAuth} from '../../store/auth/auth.slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuthorization = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      const refresh_token = await AsyncStorage.getItem('refresh_token');
      if (access_token && refresh_token) {
        dispatch(getUser());
      } else {
        dispatch(setUnAuth());
        dispatch(removeUser());
      }
    };

    checkAuthorization();
  }, [dispatch]);
};
