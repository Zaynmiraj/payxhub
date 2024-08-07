import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {AuthContext} from '../context/AuthContext';
import Loading from '../screens/Loading';

const Signup = () => {
  const navigation = useNavigation();
  const {
    login,
    loading,
    setLoading,
    status,
    setStatus,
    setThemeInStorage,
    setSettingInStorage,
    setButtonInStorage,
  } = useContext(AuthContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEamil] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleRegister = async () => {
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Passwords do not match',
        });
      } else if (password.length < 8) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Password length must be at least 8 characters',
        });
      } else {
        try {
          setStatus('Please wait');
          setLoading(true);
          await fetch('https://www.payx.org.uk/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              _token: 'sdjfhsdkjfhsdf',
            }),
          }).then(res =>
            res.json().then(response => {
              if (response.status_code === 200) {
                navigation.navigate('login');
                Toast.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: "You've created account successfully Sign in now",
                });

                // login(
                //   response.data.email,
                //   response.data,
                //   response.account.secret_key,
                // );
                // setThemeInStorage(response.theme);
                // setSettingInStorage(response.setting);
                // setButtonInStorage(response.buttons);
              } else if (response.status_code === 203) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: response.message,
                });
              } else if (response.status_code === 202) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
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
      }
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Please fill in following fields',
      });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <StatusBar
        barStyle="default" // Options: 'default', 'light-content', 'dark-content'
        backgroundColor="#0D7990" // Android specific
        // To show or hide the status bar
      />
      <SafeAreaView></SafeAreaView>
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <Image
            source={require('../assets/Logo/paylogo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>PayX</Text>
        </View>

        <View style={[styles.footer]}>
          <ScrollView style={{width: '100%', height: '100%'}}>
            <View style={[styles.form]}>
              <Text style={styles.formtitle}>Create New Acccount</Text>
              <View style={[styles.formGroup]}>
                <Text style={styles.label}>
                  Full Name <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input]}
                  value={name || ''}
                  placeholder="Your Full Name"
                  placeholderTextColor={'gray'}
                  onChangeText={e => setName(e)}
                />
              </View>
              <View style={[styles.formGroup]}>
                <Text style={styles.label}>
                  Email <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input]}
                  value={email || ''}
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
                  value={password || ''}
                  style={[styles.input]}
                  placeholder="********"
                  placeholderTextColor={'gray'}
                  onChangeText={e => setPassword(e)}
                />
              </View>
              <View style={[styles.formGroup]}>
                <Text style={styles.label}>
                  Confirm Password <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  value={confirmPassword || ''}
                  secureTextEntry={true}
                  style={[styles.input]}
                  placeholder="********"
                  placeholderTextColor={'gray'}
                  onChangeText={e => setConfirmPassword(e)}
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
                    gap: 10,
                  }}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                  <Text style={{color: '#484747'}}>
                    I agree with all the{' '}
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      terms & conditions
                    </Text>{' '}
                    of PayX.
                  </Text>
                </View>
              </View>
              <View style={[styles.formGroup]}>
                <TouchableOpacity
                  onPress={() => handleRegister()}
                  style={[styles.button]}>
                  <Text
                    style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                    Sign Up
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
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                  <Text
                    style={{fontWeight: '800', fontSize: 15, color: 'black'}}>
                    Sign In
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
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0D7990',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    height: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: 80,
    height: 70,
  },
  title: {
    fontSize: 30,
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  formtitle: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    color: '#000000ef',
    marginVertical: 10,
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
    color: 'black',
    width: '100%',
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
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
    gap: 5,
  },
  line: {
    backgroundColor: '#7a7a7a',
    height: 2,
    width: 150,
  },
  socialLogin: {
    marginVertical: 5,
    backgroundColor: 'black',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    gap: 10,
  },
  social: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'green',
  },
  icon: {
    color: '#0D7990',
    fontSize: 20,
  },
});

export default Signup;
