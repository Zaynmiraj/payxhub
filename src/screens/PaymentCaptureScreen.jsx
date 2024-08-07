import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import {AuthContext} from '../context/AuthContext';

const PaymentCaptureScreen = () => {
  const {cancelCollectInputs} = useStripeTerminal();
  const {intent, amount} = useContext(AuthContext);

  const handleCancelInput = async () => {};
  return (
    <View style={styles.container}>
      <View style={[styles.block]}>
        <View style={styles.header}>
          {/* <Text style={styles.title}>Thanks For Using PayX</Text> */}
        </View>
        <View style={styles.middle}>
          <Image
            source={require('../assets/Image/contactless.png')}
            style={styles.tapImage}
          />
          <Text style={styles.tapText}>Tap On The Screen</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => handleCancelInput()}
            style={{
              backgroundColor: '#80808044',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 100,
              marginVertical: 20,
            }}>
            <Icon name="xmark" style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.amount}>£{amount}.00</Text>
          <View style={styles.cardIcon}>
            <Image
              source={require('../assets/Image/visa.png')}
              style={styles.cardImage}
            />
            <Image
              source={require('../assets/Image/master.png')}
              style={styles.cardImage}
            />
            <Image
              source={require('../assets/Image/amex.png')}
              style={styles.cardImage}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  block: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: '#0D7990',
    fontWeight: 'bold',
  },
  middle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '60%',
  },
  footer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '20%',
  },
  closeIcon: {
    color: '#0D7990',
    fontSize: 25,
  },
  tap: {
    backgroundColor: '#6A6FFF',
    padding: 20,
  },
  tapImage: {
    width: 180,
    height: 150,
  },
  tapText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  cardIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  cardImage: {
    width: 40,
    height: 30,
  },
  total: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 5,
  },
  amount: {
    fontSize: 40,
    color: '#5e5e5e',
    marginBottom: 5,
    fontWeight: '300',
  },
});

export default PaymentCaptureScreen;
