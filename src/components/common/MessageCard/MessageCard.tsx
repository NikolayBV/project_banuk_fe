import React from 'react';
import {Box} from 'native-base';
import {IMessage} from '../../../utils/types';
import {styles} from './MessageCard.styles';
import {Text} from 'react-native';
import moment from 'moment';

interface MessageCardProps {
  message: IMessage;
  currentUserId: string | undefined;
}

const MessageCard = ({message, currentUserId}: MessageCardProps) => {
  const isCurrentUserMessage = message.from === currentUserId;

  return (
    <Box style={styles.MessageContainer}>
      <Box
        style={
          isCurrentUserMessage
            ? styles.UserMessageWrapper
            : styles.MessageWrapper
        }
        alignSelf="flex-start">
        <Box style={{padding: 3}}>
          <Text>{message.text}</Text>
          <Text style={{fontSize: 10, marginTop: 5}}>
            {moment(new Date(message.createdAt)).format(
              'MMMM Do YYYY, h:mm:ss a',
            )}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageCard;
