import React from 'react';
import {ScrollView} from 'react-native';
import {useContacts} from '../../../utils/hooks/useContacts';
import MainLayout from '../../layouts/MainLayouts';
import ContactCard from '../../common/ContactCard';
import {useAppSelector} from '../../../store/hooks';

const MainScreen = () => {
  const contacts = useContacts();
  const user = useAppSelector(state => state.user.currentUser);
  console.log(user);
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
