import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  EnterScreenWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  EnterHeading: {
    fontSize: 18,
    color: '#000',
  },
  ButtonGroup: {
    display: 'flex',
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Button: {
    width: '40%',
    backgroundColor: theme.colors.secondary,
  },
});
