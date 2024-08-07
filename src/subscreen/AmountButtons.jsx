import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {AuthContext} from '../context/AuthContext';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loading from '../screens/Loading';

const AmountButtons = () => {
  const {user, setLoading, loading, setStatus, theme, setButtonInStorage} =
    useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const {buttons} = route.params;
  const [data, setData] = useState({
    btn1: '',
    btn2: '',
    btn3: '',
    btn4: '',
    btn5: '',
    btn6: '',
    btn7: '',
    btn8: '',
    btn9: '',
  });

  useEffect(() => {
    setData({
      btn1: buttons.btn1,
      btn2: buttons.btn2,
      btn3: buttons.btn3,
      btn4: buttons.btn4,
      btn5: buttons.btn5,
      btn6: buttons.btn6,
      btn7: buttons.btn7,
      btn8: buttons.btn8,
      btn9: buttons.btn9,
    });
  }, []);

  const handleSubmit = async () => {
    try {
      setStatus('Updating');
      setLoading(true);
      await fetch('https://www.payx.org.uk/api/update-amount-button', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          btn1: data.btn1,
          btn2: data.btn2,
          btn3: data.btn3,
          btn4: data.btn4,
          btn5: data.btn5,
          btn6: data.btn6,
          btn7: data.btn7,
          btn8: data.btn8,
          btn9: data.btn9,
          _token: 'sjdfhskjdhfsdfsjdfh',
          user_id: user.user.id,
        }),
      }).then(res =>
        res.json().then(response => {
          if (response.status_code === 200) {
            setButtonInStorage(response.data);
            navigation.navigate('Home');
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
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
            <Text style={styles.title}>Amount Buttons</Text>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={[styles.savebtn]}>
              <Text style={styles.savetext}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.body}>
        <View style={styles.buttons}>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn1 || ''}
              keyboardType="numeric"
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn1: e})}
            />
          </View>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn2 || ''}
              keyboardType="numeric"
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn2: e})}
            />
          </View>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn3 || ''}
              keyboardType="numeric"
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn3: e})}
            />
          </View>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn4 || ''}
              keyboardType="numeric"
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn4: e})}
            />
          </View>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn5 || ''}
              keyboardType="numeric"
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn5: e})}
            />
          </View>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn6 || ''}
              keyboardType="numeric"
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn6: e})}
            />
          </View>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn7 || ''}
              keyboardType="numeric"
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn7: e})}
            />
          </View>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn8 || ''}
              keyboardType="numeric"
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn8: e})}
            />
          </View>
          <View style={styles.btnblk}>
            <TextInput
              style={styles.textInput}
              value={data.btn9 || ''}
              placeholder="example : 5"
              placeholderTextColor={'gray'}
              onChangeText={e => setData({...data, btn9: e})}
            />
          </View>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnblk: {
    width: '30%',
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
  },
  textInput: {
    color: 'black',
    fontWeight: 'bold',
    width: 'auto',
    paddingVertical: 10,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#868686aa',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default AmountButtons;
