import {useEffect, useMemo, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts',
              message: 'This app would like to view your contacts.',
              buttonPositive: 'Please accept bare mortal',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const contacts = await Contacts.getAll();
            setContacts(contacts);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const contacts = await Contacts.getAll();
          setContacts(contacts);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getContacts();
  }, []);

  const formatContacts = contacts.map(contact => {
    return {
      name: contact.displayName,
      numbers: contact.phoneNumbers.map(number => number.number),
    };
  });
  return useMemo(() => formatContacts, [formatContacts]);
};
