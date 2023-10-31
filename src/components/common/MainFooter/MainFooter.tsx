import React from 'react';
import {View} from 'react-native';
import {IconButton, Pressable} from 'native-base';
import {styles} from './MainFooter.styles';
import theme from '../../../styles/theme';
import {useAppDispatch} from '../../../store/hooks';
import {removeUser} from '../../../store/user/user.slice';
import {setUnAuthorized} from '../../../store/auth/auth.actions';
import {SvgIcons} from '../../../../assets';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../utils/types';

const MainFooter = ({isOnlyChatUser}: {isOnlyChatUser: boolean}) => {
  const navigation = useNavigation<RootNavigationProp>();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setUnAuthorized()).then(() => dispatch(removeUser()));
  };

  return (
    <View style={styles.footerContainer}>
      <Pressable>
        <IconButton
          onPress={() =>
            navigation.navigate('MainScreen', {isOnlyChatUsers: false})
          }
          icon={
            <SvgIcons.contacts
              width={isOnlyChatUser ? 30 : 40}
              height={isOnlyChatUser ? 30 : 40}
            />
          }
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
      <Pressable>
        <IconButton
          onPress={() =>
            navigation.navigate('MainScreen', {isOnlyChatUsers: true})
          }
          icon={<SvgIcons.chat width={30} height={30} />}
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
      <Pressable>
        <IconButton
          onPress={handleLogout}
          icon={
            <SvgIcons.logout
              width={isOnlyChatUser ? 40 : 30}
              height={isOnlyChatUser ? 40 : 30}
            />
          }
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
    </View>
  );
};

export default MainFooter;
