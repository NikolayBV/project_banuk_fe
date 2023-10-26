import React from 'react';
import {Box} from 'native-base';
import {IMessage} from '../../../utils/types';
import {styles} from './MessageCard.styles';

interface MessageCardProps {
  message: IMessage;
}

const MessageCard = ({message}: MessageCardProps) => {
  return (
    <Box style={styles.MessageContainer}>
      <Box
        style={styles.MessageWrapper}
        alignSelf="center"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          letterSpacing: 'lg',
        }}
        bg={['red.400', 'blue.400']}>
        {message.text}
      </Box>
    </Box>
  );
};

export default MessageCard;
