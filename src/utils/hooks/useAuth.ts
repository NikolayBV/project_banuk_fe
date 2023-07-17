import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../types';

export const useAuth = () => {
  const navigation = useNavigation<RootNavigationProp>();
  useEffect(() => {
    const getToken = async () => {
      return await AsyncStorage.getItem('access_token');
    };
    getToken().then(res => {
      if (res) {
        navigation.navigate('MainScreen');
      }
    });
  }, [navigation]);
};
