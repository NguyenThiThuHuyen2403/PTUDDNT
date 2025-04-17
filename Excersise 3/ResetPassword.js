import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('2124802010050@student.tdmu.edu.vn');

  const checkEmail = () => !email.includes('@');

  const myStyle = {
    container: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      gap: 15,
    },
    image: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginBottom: 20,
    },
  };

  return (
    <View style={myStyle.container}>
      

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email khôi phục"
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={checkEmail()}>
        Nhập sai định dạng email
      </HelperText>

      <Button mode="contained" onPress={() => alert('Đã gửi email khôi phục')}>
        Gửi lại mật khẩu
      </Button>

      <Button onPress={() => navigation.goBack()}>
        Quay lại đăng nhập
      </Button>
    </View>
  );
};

export default ResetPassword;
