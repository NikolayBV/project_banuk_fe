import {TouchableOpacity} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import theme from '../../../../theme';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../utils/types';
import {getTwoLettersFromName} from '../../../utils/helpers';

interface ContactCardProps {
  name: string;
  number: string[];
}

const ContactCard = ({name, number}: ContactCardProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const label = getTwoLettersFromName(name);

  const handlePress = () => {
    navigation.navigate('ContactScreen', {name, number});
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card.Title
        title={name}
        subtitle={number}
        left={props => (
          <Avatar.Text
            {...props}
            color={theme.colors.background}
            style={{backgroundColor: theme.colors.secondary}}
            label={label}
          />
        )}
      />
    </TouchableOpacity>
  );
};

export default ContactCard;
