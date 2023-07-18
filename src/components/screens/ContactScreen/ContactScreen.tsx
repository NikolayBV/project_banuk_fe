import React from 'react';
import {Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

export interface ContactScreenProps {
  name: string;
  number: string[];
}

const ContactScreen = () => {
  const route = useRoute();
  const {name, number} = route.params as ContactScreenProps;
  console.log(name, number);
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default ContactScreen;
