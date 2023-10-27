import React, {useEffect, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import MainLayout from '../../components/layouts/MainLayouts';
import {styles} from './ContactScreen.styles';
import {Controller, useForm} from 'react-hook-form';
import {Box, Input, Pressable} from 'native-base';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  chatUserSelector,
  currentUserSelector,
} from '../../store/user/user.selectors';
import {IMessage} from '../../utils/types';
import {
  currentUserMessagesSelector,
  isMessagesLoading,
} from '../../store/messages/messages.selectors';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {SvgIcons} from '../../../assets';
import {
  getChatUserMessages,
  sendMessage,
} from '../../store/messages/message.actions';
import WebsocketService from '../../components/common/services/websocket.service';
import MessageCard from '../../components/common/MessageCard';

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
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (currentUser?._id && chatUser?._id) {
      WebsocketService.connect(currentUser._id);
      WebsocketService.addMessageHandler(() => {
        dispatch(getChatUserMessages(chatUser._id!));
      });
    }
    return () => {
      WebsocketService.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

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
      WebsocketService.sendMessage(chatUser._id, createMessage);
      dispatch(sendMessage(createMessage)).then(() => {
        setValue('message', '');
      });
    }
  };

  return (
    <MainLayout>
      <View style={styles.contactCardContainer}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({animated: true});
            }
          }}
          style={{width: '100%'}}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            messages.map(message => {
              return (
                <MessageCard
                  message={message}
                  currentUserId={currentUser?._id}
                  key={message?._id}
                />
              );
            })
          )}
        </ScrollView>
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
