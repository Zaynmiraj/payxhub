import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import {AuthContext} from '../context/AuthContext';
import Loading from '../screens/Loading';
import {KeyContext} from '../context/KeyContext';
const height = Dimensions.get('screen').height;

const Login = () => {
  const navigation = useNavigation();
  const {
    login,
    loading,
    setLoading,
    setStatus,
    setThemeInStorage,
    setSettingInStorage,
    setButtonInStorage,
  } = useContext(AuthContext);
  const {SetKeyLoad, SetReaderMode} = useContext(KeyContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEamil] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    if (email && password) {
      try {
        setLoading(true);
        setStatus('Please wait');
        await fetch(`https://payx.org.uk/api/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password: password,
            _token: 'sdhjsdhfsjdf',
          }),
        }).then(res =>
          res.json().then(response => {
            if (response.status_code === 200) {
              login(
                response.data.email,
                response.data,
                response.account.secret_key,
              );
              SetReaderMode(true);
              setThemeInStorage(response.theme);
              setSettingInStorage(response.setting);
              setButtonInStorage(response.buttons);
              SetKeyLoad(response.account.secret_key);
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Logged in successfully',
              });
            } else {
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: response.message,
              });
            }
          }),
        );
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: error.message,
        });
      } finally {
        setLoading(false);
      }
    } else {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Please fill out fields below',
        textBody: 'Please provide valid email & password',
        autoClose: true,
        button: 'close',
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={{width: '100%', height: height}}>
      <StatusBar
        barStyle="default" // Options: 'default', 'light-content', 'dark-content'
        backgroundColor="#0D7990" // Android specific
        // To show or hide the status bar
      />
      <SafeAreaView></SafeAreaView>
      <View style={styles.container}>
        <View style={[styles.header]}>
          <Image
            source={require('../assets/Logo/paylogo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>PayX</Text>
        </View>
        <View style={[styles.footer]}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
            <View style={[styles.form]}>
              <Text style={styles.formtitle}>Sign In To Your Acccount</Text>
              <View style={[styles.formGroup]}>
                <Text style={styles.label}>
                  Email <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input]}
                  placeholder="Please Enter Your Email"
                  placeholderTextColor={'gray'}
                  onChangeText={e => setEamil(e)}
                />
              </View>
              <View style={[styles.formGroup]}>
                <Text style={styles.label}>
                  Password <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  secureTextEntry={true}
                  style={[styles.input]}
                  placeholder="********"
                  placeholderTextColor={'gray'}
                  onChangeText={e => setPassword(e)}
                />
              </View>
              <View
                style={[
                  styles.formGroup,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    lineWidth={1}
                    disabled={false}
                    style={{color: 'black', marginRight: 10}}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                  <Text style={{color: 'gray'}}>Remember Me</Text>
                </View>
                <TouchableOpacity>
                  <Text style={{color: '#0D7990', fontWeight: '600'}}>
                    Forget Password
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.formGroup]}>
                <TouchableOpacity
                  onPress={() => handleLogin()}
                  style={[styles.button]}>
                  <Text
                    style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.formGroup,
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                  },
                ]}>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                  }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                  <Text
                    style={{fontWeight: '800', fontSize: 15, color: 'black'}}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.socialLogin]}>
              <View style={styles.devider}>
                <Text style={styles.line}></Text>
                <Text style={{color: 'gray', fontWeight: '600'}}>Or</Text>
                <Text style={styles.line}></Text>
              </View>
              <View style={[styles.link]}>
                <TouchableOpacity style={styles.social}>
                  <Icon name="google" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.social}>
                  <Icon name="facebook" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: height,
    backgroundColor: '#0D7990',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  header: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: 100,
    height: 80,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: 'white',
  },
  footer: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  form: {
    width: '90%',
  },
  formtitle: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    color: '#000000ef',
    marginBottom: 10,
  },
  formGroup: {
    width: '100%',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    width: '100%',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  input: {
    width: '100%',
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    color: 'black',
    borderColor: 'gray',
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D7990',
    padding: 12,
    borderRadius: 12,
  },
  devider: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    backgroundColor: '#7a7a7a',
    height: 2,
    width: 150,
  },
  socialLogin: {
    marginVertical: 20,
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  social: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  icon: {
    color: '#0D7990',
    fontSize: 20,
  },
  modal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#80808061',
  },
});

export default Login;
