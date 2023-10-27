import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  contactCardContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.secondary,
  },
  inputWrapper: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: theme.colors.background,
  },
});
