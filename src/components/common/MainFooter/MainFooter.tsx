import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconButton, Pressable} from 'native-base';
import {styles} from './MainFooter.styles';
import theme from '../../../styles/theme';
import {useAppDispatch} from '../../../store/hooks';
import {removeUser} from '../../../store/user/user.slice';
import {setUnAuthorized} from '../../../store/auth/auth.actions';

const MainFooter = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setUnAuthorized()).then(() => dispatch(removeUser()));
  };

  return (
    <View style={styles.footerContainer}>
      <Pressable>
        <IconButton
          icon={<Icon name={'contacts'} size={30} />}
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
      <Pressable>
        <IconButton
          icon={<Icon name={'chat'} size={30} />}
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
      <Pressable>
        <IconButton
          onPress={handleLogout}
          icon={<Icon name={'logout'} size={30} />}
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
    </View>
  );
};

export default MainFooter;
