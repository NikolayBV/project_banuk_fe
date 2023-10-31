import {StyleSheet} from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
  MessageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  MessageWrapper: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: '30%',
    backgroundColor: theme.colors.chatUserMessage,
  },
  UserMessageWrapper: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '40%',
    backgroundColor: theme.colors.yourMessage,
  },
});
