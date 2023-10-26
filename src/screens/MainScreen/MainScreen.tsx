import React from 'react';
import {ScrollView} from 'react-native';
import MainLayout from '../../components/layouts/MainLayouts';
import ContactCard from '../../components/common/ContactCard';
import MainFooter from '../../components/common/MainFooter';
import {useContacts} from '../../utils/hooks/useContacts';

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
