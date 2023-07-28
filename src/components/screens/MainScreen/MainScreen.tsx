import React from 'react';
import {ScrollView} from 'react-native';
import {useContacts} from '../../../utils/hooks/useContacts';
import MainLayout from '../../layouts/MainLayouts';
import ContactCard from '../../common/ContactCard';
import MainFooter from '../../common/MainFooter';
import {RootStackParamList} from '../../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen = ({navigation}: Props) => {
  const contacts = useContacts();

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
      <MainFooter navigation={navigation} />
    </MainLayout>
  );
};

export default MainScreen;
