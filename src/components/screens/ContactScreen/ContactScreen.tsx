import React from 'react';
import {Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayouts';
import {TextInput} from 'react-native-paper';
import {styles} from './ContactScreen.styles';
import {Controller, useForm} from 'react-hook-form';

export interface ContactScreenProps {
  name: string;
  number: string[];
}

const ContactScreen = () => {
  const route = useRoute();
  const {name, number} = route.params as ContactScreenProps;

  const {control, handleSubmit} = useForm({
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });

  const onSend = (data: {message: string}) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <View style={styles.contactCardContainer}>
        <Text>{name}</Text>
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name={'message'}
            render={({field: {onChange, value}}) => (
              <View>
                <TextInput
                  mode={'outlined'}
                  keyboardType={'twitter'}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your message'}
                  right={
                    <TextInput.Icon
                      onPress={handleSubmit(onSend)}
                      icon={'send'}
                    />
                  }
                />
              </View>
            )}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default ContactScreen;
