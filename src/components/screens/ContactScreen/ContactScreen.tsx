import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './ContactScreen.styles';
import {Controller, useForm} from 'react-hook-form';
import {Box, Input, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {currentUserSelector} from '../../../store/user/user.selectors';
import {getUserByMobile} from '../../../store/user/user.actions';

export interface ContactScreenProps {
  name: string;
  number: string[];
}

const ContactScreen = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const {name, number} = route.params as ContactScreenProps;
  const user = useAppSelector(currentUserSelector);

  useEffect(() => {
    dispatch(getUserByMobile(number)).then(res => {
      console.log(res);
    });
  }, []);

  const {control, handleSubmit} = useForm({
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });

  const onSend = (data: {message: string}) => {
    console.log(data, user);
  };

  return (
    <MainLayout>
      <View style={styles.contactCardContainer}>
        <Box style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name={'message'}
              render={({field: {onChange, value}}) => (
                <Input
                  variant={'outline'}
                  isFullWidth
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your message'}
                  InputRightElement={
                    <Pressable onPress={handleSubmit(onSend)}>
                      <Icon
                        name={'send'}
                        size={30}
                        style={{paddingRight: 10}}
                      />
                    </Pressable>
                  }
                />
              )}
            />
          </View>
        </Box>
      </View>
    </MainLayout>
  );
};

export default ContactScreen;
