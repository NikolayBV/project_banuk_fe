import {StyleSheet} from 'react-native';
import theme from '../../../styles/theme';

export const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.secondary,
  },
});
