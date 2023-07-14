import React, {forwardRef, useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {validatePassword, validatePhoneNumber} from '../../../utils/helpers';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './SignInScreen.styles';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {LoginUser} from '../../../utils/types';
import {login} from '../../../store/auth/auth.actions';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import {authSelectors} from '../../../store/auth/auth.selectors';
import {currentUserSelector} from '../../../store/user/user.selectors';
import {Button, TextInput} from 'react-native-paper';

const SignInScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUserSelector);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      mobile: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginUser) => {
    dispatch(login(data));
  };

  return (
    <MainLayout>
      <View style={styles.SignUpWrapper}>
        <Text style={styles.SignUpHeading}>Sign In</Text>
      </View>
      <View style={styles.InputContainer}>
        <View style={styles.InputWrapper}>
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
                  mode={'outlined'}
                  keyboardType={'numeric'}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your mobile number'}
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
                  mode="outlined"
                  label="Password"
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
          Sign In
        </Button>
      </View>
    </MainLayout>
  );
};

export default SignInScreen;
