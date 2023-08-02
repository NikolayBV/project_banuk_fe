import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './ContactScreen.styles';
import {Controller, useForm} from 'react-hook-form';
import {Box, Input, Pressable, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  chatUserIdSelector,
  currentUserIdSelector,
} from '../../../store/user/user.selectors';
import {getUserByMobile} from '../../../store/user/user.actions';
import {IMessage} from '../../../utils/types';
import {
  getChatUserMessages,
  sendMessage,
} from '../../../store/messages/message.actions';
import {
  currentUserMessagesSelector,
  isMessagesLoading,
} from '../../../store/messages/messages.selectors';
import LoadingSpinner from '../../common/LoadingSpinner';

export interface ContactScreenProps {
  name: string;
  number: string[];
}

const ContactScreen = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const {name, number} = route.params as ContactScreenProps;
  const currentUserId = useAppSelector(currentUserIdSelector);
  const chatUserId = useAppSelector(chatUserIdSelector);
  const messages = useAppSelector(currentUserMessagesSelector);
  const loading = useAppSelector(isMessagesLoading);
  useEffect(() => {
    dispatch(getUserByMobile(number));
    if (currentUserId && chatUserId) {
      dispatch(getChatUserMessages(chatUserId));
    }
  }, [chatUserId, currentUserId, dispatch, number]);

  const {control, handleSubmit} = useForm({
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });
  const onSend = (data: {message: string}) => {
    if (currentUserId && chatUserId) {
      const createMessage: IMessage = {
        from: currentUserId,
        to: chatUserId,
        text: data.message,
        createdAt: new Date(),
      };
      dispatch(sendMessage(createMessage));
    }
  };

  return (
    <MainLayout>
      <View style={styles.contactCardContainer}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          messages.map((message, i) => {
            return <Text key={i}>{message.text}</Text>;
          })
        )}
        <Box style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name={'message'}
              render={({field: {onChange, value}}) => (
                <Input
                  variant={'outline'}
                  isFullWidth
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your messages'}
                  InputRightElement={
                    <Pressable onPress={handleSubmit(onSend)}>
                      <Icon
                        name={'send'}
                        size={30}
                        style={{paddingRight: 10}}
                      />
                    </Pressable>
                  }
                />
              )}
            />
          </View>
        </Box>
      </View>
    </MainLayout>
  );
};

export default ContactScreen;
