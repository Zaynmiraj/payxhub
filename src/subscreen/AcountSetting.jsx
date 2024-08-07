import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import ImagePicker from 'react-native-image-crop-picker';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Loading from '../screens/Loading';

const AcountSetting = () => {
  const {user, setLoading, loading, setStatus, theme, setUserInStorage} =
    useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const {users} = route.params;
  const [data, setData] = useState({
    name: '',
    email: '',
    profile: '',
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });

  useEffect(() => {
    if (users) {
      setData({
        ...data,
        name: users.name,
        email: users.email,
      });
    }
  }, []);
  const [image, setImage] = useState(null);

  const handleImage = async () => {
    try {
      ImagePicker.openPicker({
        width: 512,
        height: 512,
        cropping: true,
      }).then(image => {
        setImage(image);
      });
    } catch (error) {
      Toast({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (image != null) {
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop(),
      });
    }

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('current_password', data.oldpassword);
    formData.append('new_password', data.newpassword);
    formData.append('confirm_password', data.confirmpassword);
    formData.append('user_id', user.user.id);
    formData.append('_token', 'djfhskjdhfskdf');

    if (
      (data.oldpassword &&
        data.newpassword &&
        data.confirmpassword &&
        data.newpassword === data.confirmpassword) ||
      !data.oldpassword
    ) {
      try {
        setStatus('Updating');
        setLoading(true);
        await fetch('https://www.payx.org.uk/api/update-account', {
          method: 'POST',
          // headers: {'Content-Type': 'application/json'},
          body: formData,
        }).then(res =>
          res.json().then(response => {
            if (response.status_code === 200) {
              setUserInStorage(response.data.email, response.data);
              navigation.navigate('Home');
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: response.message,
              });
            } else if (response.status_code === 204) {
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
    } else if (data.oldpassword && data.newpassword !== data.confirmpassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'New password & Confirm Password does not match',
      });
    } else if (data.oldpassword && !data.newpassword && !data.confirmpassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'New password & Confirm Password required',
      });
    } else if (data.oldpassword && data.newpassword.length < 8) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Password must be at least 8 characters',
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.headerBlock}>
            <TouchableOpacity
              onPress={() => {
                navigation.canGoBack && navigation.goBack();
              }}
              style={[styles.backbtn]}>
              <Icon name="angle-left" style={styles.backicon} />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={[styles.savebtn]}>
              <Text style={styles.savetext}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.image}>
            <View style={styles.imageBlock}>
              {users.profile_photo_path && !image ? (
                <Image
                  style={styles.img}
                  source={{
                    uri: `https://www.payx.org.uk/public/user-profile/${users.profile_photo_path}`,
                  }}
                />
              ) : (
                <Image
                  style={styles.img}
                  source={
                    image
                      ? {uri: image.path}
                      : require('../assets/Logo/paylogo.png')
                  }
                />
              )}

              <TouchableOpacity
                onPress={() => handleImage()}
                style={styles.editBtn}>
                <Icon name="camera" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>
              Your Name{' '}
              <Text style={{color: 'red', marginHorizontal: 4}}>*</Text>
            </Text>
            <TextInput
              value={data.name || ''}
              placeholder="Full Name"
              onChangeText={e => setData({...data, name: e})}
              style={styles.inputText}
              placeholderTextColor={'gray'}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>
              Email Address{' '}
              <Text style={{color: 'red', marginHorizontal: 4}}>*</Text>
            </Text>
            <TextInput
              value={data.email || ''}
              placeholder="Email"
              onChangeText={e => setData({...data, email: e})}
              style={styles.inputText}
              placeholderTextColor={'gray'}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>
              Current Password{' '}
              <Text style={{color: 'red', marginHorizontal: 4}}>*</Text>
            </Text>
            <TextInput
              placeholder="*******"
              onChangeText={e => setData({...data, oldpassword: e})}
              style={styles.inputText}
              placeholderTextColor={'gray'}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>
              New Password{' '}
              <Text style={{color: 'red', marginHorizontal: 4}}>*</Text>
            </Text>
            <TextInput
              placeholder="*******"
              onChangeText={e => setData({...data, newpassword: e})}
              style={styles.inputText}
              placeholderTextColor={'gray'}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>
              Confirm Password{' '}
              <Text style={{color: 'red', marginHorizontal: 4}}>*</Text>
            </Text>
            <TextInput
              placeholder="*******"
              onChangeText={e => setData({...data, confirmpassword: e})}
              style={styles.inputText}
              placeholderTextColor={'gray'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBlock: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  backbtn: {
    padding: 13,
    borderRadius: 100,
    paddingHorizontal: 16,
  },
  backicon: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  savebtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  savetext: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#eeeeee83',
    position: 'relative',
    padding: 15,
  },
  editBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#c1c1c1a0',
    borderRadius: 100,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  group: {
    marginVertical: 10,
    width: '90%',
  },
  label: {
    color: '#818181',
    width: '100%',
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 5,
  },
  inputText: {
    color: 'black',
    fontWeight: '700',
    borderRadius: 10,
    borderColor: '#636363aa',
    borderWidth: 1,
    padding: 10,
    paddingVertical: 15,
  },
});

export default AcountSetting;
