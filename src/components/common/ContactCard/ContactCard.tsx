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
import {getUserByMobile} from '../../../store/user/user.actions';
import {useAppDispatch} from '../../../store/hooks';
import {getChatUserMessages} from '../../../store/messages/message.actions';
import {clearMessages} from '../../../store/messages/message.slice';

interface ContactCardProps {
  name: string;
  number: string[];
}

const ContactCard = ({name, number}: ContactCardProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const label = getTwoLettersFromName(name);
  const dispatch = useAppDispatch();
  const handlePress = () => {
    dispatch(getUserByMobile(number)).then(res => {
      if (typeof res.payload === 'object') {
        dispatch(getChatUserMessages(res.payload._id));
      } else {
        dispatch(clearMessages());
      }
    });
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
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ContactCard;
