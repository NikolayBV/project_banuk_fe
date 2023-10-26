import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  SignUpWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  SignUpHeading: {
    color: theme.colors.onPrimary,
    fontSize: 26,
    fontWeight: 'bold',
  },
  InputContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
  },
  InputWrapper: {
    width: '80%',
    display: 'flex',
    gap: 5,
  },
  SubmitButton: {
    backgroundColor: theme.colors.secondary,
    width: '50%',
  },
});
