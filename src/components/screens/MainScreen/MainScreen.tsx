import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useContacts} from '../../../utils/hooks/useContacts';
import MainLayout from '../../layouts/MainLayouts';
import ContactCard from '../../common/ContactCard';
import {useAppDispatch} from '../../../store/hooks';
import {setUnAuth} from '../../../store/auth/auth.slice';
import {removeUser} from '../../../store/user/user.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {verifyToken} from '../../../store/auth/auth.actions';

const MainScreen = () => {
  const contacts = useContacts();
  const dispatch = useAppDispatch();

  /*useEffect(() => {
    dispatch(setUnAuth());
    dispatch(removeUser());
    AsyncStorage.removeItem('access_token');
    AsyncStorage.removeItem('refresh_token');
  }, []);*/

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        dispatch(verifyToken(token));
      }
    };

    getToken().then(res => console.log(res));
  }, []);

  return (
    <MainLayout>
      <ScrollView>
        {contacts.map((contact, index) => (
          <ContactCard
            key={index}
            name={contact.name}
            number={contact.numbers}
          />
        ))}
      </ScrollView>
    </MainLayout>
  );
};

export default MainScreen;
