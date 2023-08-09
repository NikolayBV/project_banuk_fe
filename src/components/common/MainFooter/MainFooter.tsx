import React from 'react';
import {View} from 'react-native';
import {IconButton, Pressable} from 'native-base';
import {styles} from './MainFooter.styles';
import theme from '../../../styles/theme';
import {useAppDispatch} from '../../../store/hooks';
import {removeUser} from '../../../store/user/user.slice';
import {setUnAuthorized} from '../../../store/auth/auth.actions';
import {SvgIcons} from '../../../../assets';

const MainFooter = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setUnAuthorized()).then(() => dispatch(removeUser()));
  };

  return (
    <View style={styles.footerContainer}>
      <Pressable>
        <IconButton
          icon={<SvgIcons.chat width={30} height={30} />}
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
      <Pressable>
        <IconButton
          icon={<SvgIcons.contacts width={30} height={30} />}
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
      <Pressable>
        <IconButton
          onPress={handleLogout}
          icon={<SvgIcons.logout width={30} height={30} />}
          _icon={{color: theme.colors.onPrimary}}
        />
      </Pressable>
    </View>
  );
};

export default MainFooter;
