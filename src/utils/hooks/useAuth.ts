import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../store/hooks';
import {getUser} from '../../store/user/user.actions';
import {setUser} from '../../store/user/user.slice';
import {setAuth} from '../../store/auth/auth.slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    const getToken = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      const refresh_token = await AsyncStorage.getItem('refresh_token');
      return {access_token, refresh_token};
    };
    getToken().then(res => {
      if (res.access_token && res.refresh_token) {
        dispatch(getUser()).then(res => {
          const {mobile, nickName} = res.payload;
          if (mobile && nickName) {
            dispatch(setUser({mobile, nickName}));
            dispatch(setAuth);
            setAuthorized(true);
          }
        });
      }
    });
  }, [dispatch]);
  return authorized;
};
