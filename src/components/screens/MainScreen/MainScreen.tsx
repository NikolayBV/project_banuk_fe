import React from 'react';
import {ScrollView} from 'react-native';
import MainLayout from '../../layouts/MainLayouts';
import ContactCard from '../../common/ContactCard';
import MainFooter from '../../common/MainFooter';
import {useContacts} from '../../../utils/hooks/useContacts';

const MainScreen = () => {
    const contacts = [{name: 'Nick', numbers: ['89994579353']}];

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
