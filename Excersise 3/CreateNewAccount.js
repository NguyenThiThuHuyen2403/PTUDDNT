import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, HelperText, Button, IconButton } from 'react-native-paper';

const CreateNewAccount = ({ navigation }) => {
  const [email, setEmail] = useState('2124802010050@student.tdmu.edu.vn');
  const [password, setPassword] = useState('12345qqq@');
  const [confirmPassword, setConfirmPassword] = useState('12345qqq@');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const checkEmail = () => !email.includes('@');

  const checkPassword = () => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return !regex.test(password);
  };

  const checkConfirmPassword = () => password !== confirmPassword;

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

  const handleCreateAccount = () => {
    if (checkEmail() || checkPassword() || checkConfirmPassword()) {
      alert('Vui lòng kiểm tra lại thông tin!');
    } else {
      alert('Tạo tài khoản thành công');
      navigation.goBack();
    }
  };

  return (
    <View style={myStyle.container}>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email đăng ký"
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={checkEmail()}>
        Nhập sai định dạng email
      </HelperText>

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        placeholder="Mật khẩu"
        left={<TextInput.Icon icon="key" />}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <HelperText type="error" visible={checkPassword()}>
        Mật khẩu 6-16 ký tự, gồm chữ và ký tự đặc biệt
      </HelperText>

      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirm}
        placeholder="Xác nhận mật khẩu"
        left={<TextInput.Icon icon="lock-check" />}
        right={
          <TextInput.Icon
            icon={showConfirm ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirm(!showConfirm)}
          />
        }
      />
      <HelperText type="error" visible={checkConfirmPassword()}>
        Mật khẩu xác nhận không khớp
      </HelperText>

      <Button mode="contained" onPress={() => {
        alert('Tạo tài khoản thành công')
        navigation.goBack()
      }}>
        Tạo tài khoản
      </Button>

      <Button onPress={() => navigation.goBack()}>
        Quay lại đăng nhập
      </Button>
    </View>
  );
};

export default CreateNewAccount;
