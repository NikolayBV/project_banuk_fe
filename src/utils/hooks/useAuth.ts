import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getUser} from '../../store/user/user.actions';
import {removeUser, setUser} from '../../store/user/user.slice';
import {setAuth, setUnAuth} from '../../store/auth/auth.slice';
import {authSelectors} from '../../store/auth/auth.selectors';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelectors);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      const refresh_token = await AsyncStorage.getItem('refresh_token');
      if (access_token && refresh_token) {
        dispatch(getUser()).then(result => {
          if (result.payload) {
            const {mobile, nickName} = result.payload;
            if (mobile && nickName) {
              dispatch(setUser({mobile, nickName}));
              dispatch(setAuth());
              setAuthorized(true);
            } else {
              dispatch(setUnAuth());
              dispatch(removeUser());
              setAuthorized(false);
            }
          }
        });
      } else {
        dispatch(setUnAuth());
        dispatch(removeUser());
        setAuthorized(false);
      }
    };

    checkAuthorization();
  }, [dispatch, auth]);

  return authorized;
};
