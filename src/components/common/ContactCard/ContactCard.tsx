import {TouchableOpacity} from 'react-native';
import theme from '../../../styles/theme';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../utils/types';
import {getTwoLettersFromName} from '../../../utils/helpers';
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Spacer,
  VStack,
  Text,
} from 'native-base';

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
    <Box>
      <Pressable onPress={handlePress}>
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar size="48px">{label}</Avatar>
            <VStack>
              <Text color="coolGray.800" bold>
                {name}
              </Text>
              <Text color="coolGray.600">{number}</Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ContactCard;
