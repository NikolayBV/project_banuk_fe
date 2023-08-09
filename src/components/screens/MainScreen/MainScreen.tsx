import React from 'react';
import {ScrollView} from 'react-native';
import {useContacts} from '../../../utils/hooks/useContacts';
import MainLayout from '../../layouts/MainLayouts';
import ContactCard from '../../common/ContactCard';
import MainFooter from '../../common/MainFooter';
import {RootStackParamList} from '../../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const MainScreen = () => {
  const contacts = useContacts();

  return (
    <MainLayout>
      <ScrollView>
        {contacts.map((contact, index) => {
          if (contact.name === 'Николай Бабкин') {
            contact.numbers = ['+7 999 457-93-53'];
          }
          return (
            <ContactCard
              key={index}
              name={contact.name}
              number={contact.numbers}
            />
          );
        })}
      </ScrollView>
      <MainFooter />
    </MainLayout>
  );
};

export default MainScreen;
