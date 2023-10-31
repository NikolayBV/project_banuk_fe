import {useEffect, useMemo, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';
import UserServices from '../../api/user.services';
import {useAppSelector} from '../../store/hooks';
import {currentUserSelector} from '../../store/user/user.selectors';

export const useContacts = (isOnlyChatUsers?: boolean) => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const currentUser = useAppSelector(currentUserSelector);

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
            const allContacts = await Contacts.getAll();
            let numbers: string[] = [];
            if (isOnlyChatUsers && currentUser?._id) {
              numbers = await UserServices.getChatUsersNumbers(currentUser._id);
            } else {
              numbers = await UserServices.getRegisterUsersNumbers();
            }
            const filteredContacts = allContacts.filter(contact => {
              const findNumbers = contact.phoneNumbers.find(item => {
                return numbers.includes(
                  item.number.replace(/\D/g, '').trim().slice(-10),
                );
              });
              if (findNumbers) {
                return contact;
              }
            });
            setContacts(filteredContacts);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const allContacts = await Contacts.getAll();
          setContacts(allContacts);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getContacts();
  }, [isOnlyChatUsers]);

  const formatContacts = contacts.map(contact => {
    return {
      name: contact.displayName,
      numbers: contact.phoneNumbers.map(number => number.number),
    };
  });
  return useMemo(() => formatContacts, [formatContacts]);
};
