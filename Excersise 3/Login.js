import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('2124802010050@student.tdmu.edu.vn')
  const [password, setPassword] = useState('12345qqq@')
  const [showPassword, setShowPassword] = useState(false)

  const checkEmail = () => !email.includes('@')
  const checkPassword = () => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    return !regex.test(password)
  }

  const handleLogin = () => {
    if (checkEmail() || checkPassword()) {
      alert('Vui lòng kiểm tra lại thông tin!')
    } else {
      alert('Đăng nhập thành công')
      navigation.replace('DrawerNavigator') // Điều hướng đến menu chính
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/firebase_icon.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Input email"
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={checkEmail()}>
        Nhập sai địa chỉ email
      </HelperText>

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        placeholder="Input password"
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

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Đăng nhập
      </Button>

      <Button onPress={() => navigation.navigate('CreateNewAccount')}>
        Tạo tài khoản mới
      </Button>
      <Button onPress={() => navigation.navigate('ResetPassword')}>
        Quên mật khẩu?
      </Button>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20
  },
  button: {
    marginTop: 10
  }
})
