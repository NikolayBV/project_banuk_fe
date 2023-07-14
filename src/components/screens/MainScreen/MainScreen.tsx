import React from 'react';
import {Text, View} from 'react-native';
import {useContacts} from '../../../utils/hooks/useContacts';
import MainLayout from '../../layouts/MainLayouts';

const MainScreen = () => {
  const contacts = useContacts();
  console.log(
    contacts.map(contact => {
      return {
        name: contact.displayName,
        numbers: contact.phoneNumbers.map(number => number.number),
      };
    }),
  );
  return (
    <MainLayout>
      <View>
        <Text>MainScreen!</Text>
      </View>
    </MainLayout>
  );
};

export default MainScreen;
