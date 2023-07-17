import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {useContacts} from '../../../utils/hooks/useContacts';
import MainLayout from '../../layouts/MainLayouts';

interface ContactCardProps {
  name: string;
  number: string[];
}

const ContactCard = ({name, number}: ContactCardProps) => {
  const label = name
    .split(' ')
    .map(str => str[0].toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <TouchableOpacity onPress={() => console.log('press')}>
      <Card.Title
        title={name}
        subtitle={number}
        left={props => <Avatar.Text {...props} label={label} />}
      />
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const contacts = useContacts();
  return (
    <MainLayout>
      <ScrollView>
        {contacts.map(contact => (
          <ContactCard name={contact.name} number={contact.numbers} />
        ))}
      </ScrollView>
    </MainLayout>
  );
};

export default MainScreen;
