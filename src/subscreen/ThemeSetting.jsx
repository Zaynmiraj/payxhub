import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ColorPicker} from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {AuthContext} from '../context/AuthContext';
import Loading from '../screens/Loading';

const ThemeSetting = () => {
  const navigation = useNavigation();
  const {user, setLoading, loading, setStatus, setThemeInStorage, theme} =
    useContext(AuthContext);
  const route = useRoute();
  const {themes} = route.params;
  const [color, setColor] = useState({
    backgroundColor: '#0D7990',
    textColor: '#FFFFF',
    btn_backgroundColor: '#FFFFF',
    btn_textColor: '#000000',
  });

  useEffect(() => {
    if (theme) {
      setColor({
        ...color,
        backgroundColor: themes.theme_background,
        textColor: themes.text_color,
        btn_backgroundColor: themes.btn_background_color,
        btn_textColor: themes.btn_text_color,
      });
    }
  }, []);
  const onColorChange = (selectedColor, text) => {
    if (text == 'bgcolor') {
      setColor({...color, backgroundColor: selectedColor});
    } else if (text == 'tcolor') {
      setColor({...color, textColor: selectedColor});
    } else if (text == 'btbgcolor') {
      setColor({...color, btn_backgroundColor: selectedColor});
    } else if (text == 'bttcolor') {
      setColor({...color, btn_textColor: selectedColor});
    }
  };

  const handleSubmit = async () => {
    try {
      setStatus('Theme updating');
      setLoading(true);
      await fetch('https://www.payx.org.uk/api/update-theme', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id: user.user.id,
          theme_background: color.backgroundColor,
          text_color: color.textColor,
          btn_background_color: color.btn_backgroundColor,
          btn_text_color: color.btn_textColor,
        }),
      }).then(res =>
        res.json().then(response => {
          if (response.status_code == 200) {
            setThemeInStorage(response.data);
            navigation.navigate('Home');
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: response.message,
            });
          } else if (response.status_code == 202) {
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
            <Text style={styles.title}>Theme Setting</Text>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={[styles.savebtn]}>
              <Text style={styles.savetext}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView
        style={{width: '100%', marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.block}>
            <View style={styles.innerBlock}>
              <Text style={styles.lable}>Background Colour</Text>
              <Text
                style={[
                  styles.colors,
                  {backgroundColor: color.backgroundColor},
                ]}></Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'gray'}
                onChangeText={e => setColor({...color, backgroundColor: e})}
                placeholder="#FFFFFF"
                value={color.backgroundColor || ''}
              />
            </View>
            <ColorPicker
              style={styles.colorPicker}
              defaultColor={color.backgroundColor}
              onColorSelected={e => onColorChange(e, 'bgcolor')}
            />
          </View>
          <View style={styles.block}>
            <View style={styles.innerBlock}>
              <Text style={styles.lable}>Text Colour</Text>
              <Text
                style={[
                  styles.colors,
                  {backgroundColor: color.textColor},
                ]}></Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'gray'}
                onChangeText={e => setColor({...color, textColor: e})}
                placeholder="#FFFFFF"
                value={color.textColor || ''}
              />
            </View>
            <ColorPicker
              style={styles.colorPicker}
              defaultColor={color.textColor || '#FFFFFF'}
              onColorSelected={e => onColorChange(e, 'tcolor')}
            />
          </View>
          <View style={styles.block}>
            <View style={styles.innerBlock}>
              <Text style={styles.lable}>Button Text Colour</Text>
              <Text
                style={[
                  styles.colors,
                  {backgroundColor: color.btn_textColor},
                ]}></Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'gray'}
                onChangeText={e => setColor({...color, btn_textColor: e})}
                placeholder="#FFFFFF"
                value={color.btn_textColor || ''}
              />
            </View>
            <ColorPicker
              style={styles.colorPicker}
              defaultColor={color.btn_textColor}
              onColorSelected={e => onColorChange(e, 'bttcolor')}
            />
          </View>
          <View style={styles.block}>
            <View style={styles.innerBlock}>
              <Text style={styles.lable}>Button Colour</Text>
              <Text
                style={[
                  styles.colors,
                  {backgroundColor: color.btn_backgroundColor},
                ]}></Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'gray'}
                onChangeText={e => setColor({...color, btn_backgroundColor: e})}
                placeholder="#FFFFFF"
                value={color.btn_backgroundColor || ''}
              />
            </View>
            <ColorPicker
              style={styles.colorPicker}
              defaultColor={color.btn_backgroundColor}
              onColorSelected={e => onColorChange(e, 'btbgcolor')}
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },

  block: {
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  colorPicker: {
    width: 150,
    height: 150,
  },
  innerBlock: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
    flexDirection: 'column',
  },
  lable: {
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
    width: '100%',
    textAlign: 'left',
  },
  colors: {
    width: 100,
    height: 40,
    borderColor: '#eeea',
    borderWidth: 1,
  },
  textInput: {
    width: 100,
    paddingVertical: 14,
    borderRadius: 10,
    borderColor: '#eeea',
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
  },
});

export default ThemeSetting;
