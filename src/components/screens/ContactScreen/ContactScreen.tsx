import React, {useEffect} from 'react';
import {View} from 'react-native';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './ContactScreen.styles';
import {Controller, useForm} from 'react-hook-form';
import {Box, Input, Pressable, Text} from 'native-base';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  chatUserSelector,
  currentUserSelector,
} from '../../../store/user/user.selectors';
import {IMessage} from '../../../utils/types';
import {
  currentUserMessagesSelector,
  isMessagesLoading,
} from '../../../store/messages/messages.selectors';
import LoadingSpinner from '../../common/LoadingSpinner';
import {SvgIcons} from '../../../../assets';
import {sendMessage} from '../../../store/messages/message.actions';
import WebsocketService from '../../../api/websocket.service';

export interface ContactScreenProps {
  name: string;
  number: string[];
}

const ContactScreen = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(currentUserSelector);
  const chatUser = useAppSelector(chatUserSelector);
  const messages = useAppSelector(currentUserMessagesSelector);
  const loading = useAppSelector(isMessagesLoading);
  const websocketService = new WebsocketService(currentUser?._id);

  useEffect(() => {
    return () => {
      websocketService.disconnect();
    };
  }, []);

  const {control, handleSubmit, setValue} = useForm({
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });
  const onSend = (data: {message: string}) => {
    if (currentUser?._id && chatUser?._id) {
      const createMessage: IMessage = {
        from: currentUser._id,
        to: chatUser._id,
        text: data.message,
        createdAt: new Date(),
      };
      websocketService.sendMessage('message', createMessage);
      dispatch(sendMessage(createMessage)).then(() => {
        setValue('message', '');
      });
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
                      <SvgIcons.send width={30} height={30} />
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
