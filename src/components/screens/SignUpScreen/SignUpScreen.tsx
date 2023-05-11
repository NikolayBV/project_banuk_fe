import React from 'react';
import {Text, View} from 'react-native';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './SignUp.styles';
import {Button, Input} from 'native-base';
import {Controller, useForm} from 'react-hook-form';

const SignUpScreen = () => {
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
            rules={{required: 'This field is required'}}
            render={({field: {onChange, value}}) => (
              <View>
                <Input
                  type={'text'}
                  size={'lg'}
                  onChange={onChange}
                  value={value}
                  placeholder={'Enter your mobile number'}
                  style={{flex: 1}}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.InputWrapper}>
          <Text>Enter your nickname</Text>
          <Controller
            control={control}
            name={'nickName'}
            rules={{required: 'This field is required'}}
            render={({field: {onChange, value}}) => (
              <View>
                <Input
                  type={'text'}
                  size={'lg'}
                  onChange={onChange}
                  value={value}
                  placeholder={'Enter your nickname'}
                  style={{flex: 1}}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.InputWrapper}>
          <Text>Enter your password</Text>
          <Controller
            control={control}
            name={'password'}
            rules={{required: 'This field is required'}}
            render={({field: {onChange, value}}) => (
              <View>
                <Input
                  type={'text'}
                  size={'lg'}
                  onChange={onChange}
                  value={value}
                  placeholder={'Enter your password'}
                  style={{flex: 1}}
                />
              </View>
            )}
          />
        </View>
        <View />
        <Button>Sign Up</Button>
      </View>
    </MainLayout>
  );
};

export default SignUpScreen;
