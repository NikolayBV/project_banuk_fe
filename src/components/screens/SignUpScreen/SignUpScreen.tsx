import React from 'react';
import {Text, View} from 'react-native';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './SignUp.styles';
import {Controller, useForm} from 'react-hook-form';
import {IUser, RootNavigationProp} from '../../../utils/types';
import {
  validateNickname,
  validatePassword,
  validatePhoneNumber,
} from '../../../utils/helpers';
import {useAppDispatch} from '../../../store/hooks';
import {createUser} from '../../../store/user/user.actions';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      mobile: '',
      nickName: '',
      password: '',
    },
  });

  const onSubmit = (data: IUser) => {
    dispatch(createUser(data)).then(() => navigation.navigate('EnterScreen'));
  };

  return (
    <MainLayout>
      <View style={styles.SignUpWrapper}>
        <Text style={styles.SignUpHeading}>Sign Up</Text>
      </View>
      <View style={styles.InputContainer}>
        <View style={styles.InputWrapper}>
          <Text>Enter your mobile number</Text>
          <Controller
            control={control}
            name={'mobile'}
            rules={{
              required: 'This field is required',
              validate: validatePhoneNumber,
            }}
            render={({field: {onChange, value}}) => (
              <View>
                <TextInput
                  keyboardType={'numeric'}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your mobile number'}
                  style={{flex: 1}}
                />
                {errors.mobile && (
                  <Text style={{color: 'tomato'}}>
                    {errors.mobile?.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <View style={styles.InputWrapper}>
          <Text>Enter your nickname</Text>
          <Controller
            control={control}
            name={'nickName'}
            rules={{
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'Username length must be between 3 and 20 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username length must be between 3 and 20 characters',
              },
              validate: validateNickname,
            }}
            render={({field: {onChange, value}}) => (
              <View>
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your nickname'}
                  style={{flex: 1}}
                />
                {errors.nickName && (
                  <Text style={{color: 'tomato'}}>
                    {errors.nickName?.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <View style={styles.InputWrapper}>
          <Text>Enter your password</Text>
          <Controller
            control={control}
            name={'password'}
            rules={{
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password must contain at least 8 characters!',
              },
              validate: validatePassword,
            }}
            render={({field: {onChange, value}}) => (
              <View>
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your password'}
                  style={{flex: 1}}
                />
                {errors.password && (
                  <Text style={{color: 'tomato'}}>
                    {errors.password?.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <View />
        <Button
          mode={'contained'}
          style={styles.SubmitButton}
          onPress={handleSubmit(onSubmit)}>
          Sign Up
        </Button>
      </View>
    </MainLayout>
  );
};

export default SignUpScreen;
