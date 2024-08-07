import {View, Text, StyleSheet, Platform} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Slugan from '../screens/Slugan';
import Buttons from '../screens/Buttons';
import Footer from '../screens/Footer';
import Loading from '../screens/Loading';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import Initializing from '../screens/Initializing';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {AuthContext} from '../context/AuthContext';
import PaymentCaptureScreen from '../screens/PaymentCaptureScreen';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import SecretKeyModal from '../subscreen/SecretKeyModal';
import {KeyContext} from '../context/KeyContext';

const Home = () => {
  const {
    initialize,
    isInitialized,
    discoverReaders,
    discoveredReaders,
    connectedReader,
    connectBluetoothReader,
    getOfflineStatus,
    cancelCollectInputs,
    cancelDiscovering,
    getLocations,
  } = useStripeTerminal({
    onDidChangeConnectionStatus: status => {
      status == 'connecting'
        ? setStatus('Connecting')
        : status == 'connected'
        ? setStatus('Connected Make Payment')
        : null;
    },
    onDidChangePaymentStatus: status => {
      status == 'ready'
        ? setStatus('Ready for Payment')
        : status == 'processing'
        ? setStatus('Payment Processing')
        : null;
    },
    onDidRequestReaderInput: reader => {
      reader ? setStatus(reader[0]) : null;
    },
    onUpdateDiscoveredReaders: reader => {
      setReaderFound('readed');
    },
  });
  const [method, setMethod] = useState(null);
  const {
    readerVisile,
    readersVisible,
    loading,
    setLoading,
    setStatus,
    status,
    appSetting,
    keyModal,
  } = useContext(AuthContext);
  const {key, mode} = useContext(KeyContext);
  const [readerFound, setReaderFound] = useState('notread');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!isInitialized) {
      initialize({
        logLevel: 'verbose',
      });
    }
  }, []);

  const getLocation = async () => {
    try {
      setLoading(true);
      const {locations, error} = await getLocations({limit: 5});
      if (locations) {
        setLocation(locations);
      }

      if (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Location not found',
        });
      } else {
        setLocation(locations);
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const BluetoothReader = async () => {
    getLocation();
    try {
      setStatus('Searching reader');
      readerVisile(false);
      setReaderFound('reading');
      setMethod('bluetooth');
      const {error} = await discoverReaders({
        discoveryMethod: 'bluetoothScan',
        simulated: mode ? false : true,
      });
      if (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: error.message,
        });
        setReaderFound('notread');
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
      setReaderFound('notread');
    } finally {
      setReaderFound('notread');
    }
  };

  const mobleReader = async () => {
    getLocation();
    try {
      readerVisile(false);
      setReaderFound('reading');
      setMethod('mobile');
      setStatus('Searching reader');
      const {error} = await discoverReaders({
        discoveryMethod: 'localMobile',
        simulated: mode ? false : true,
      });
      if (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: error.message,
        });
        setReaderFound('notread');
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
      setReaderFound('notread');
    } finally {
      setReaderFound('notread');
    }
  };

  const connectReader = async readers => {
    try {
      setLoading(true);
      if (method == 'bluetooth') {
        const {error, reader} = await connectBluetoothReader({
          reader: readers,
          locationId: location != null ? location[0].id : readers.locationId,
        });
        if (error) {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: error.message,
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Reader Connected successfully',
          });
          setReaderFound('read-success');
        }
      } else if (method == 'mobile') {
        const {error, reader} = await connectBluetoothReader({
          reader: readers,
          locationId: location != null ? location[0].id : readers.locationId,
        });
        if (error) {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: error.message,
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Reader Connected successfully',
          });
          setReaderFound('read-success');
        }
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReaderVisible = async () => {
    try {
      const {error} = await cancelDiscovering();
      error
        ? Toast.show({
            type: ALERT_TYPE.DANGER,
            title: error.message,
          })
        : setReaderFound(false);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    }
  };

  if (!isInitialized) {
    return <Initializing />;
  }

  if (loading || status == 'Payment Processing' || readerFound == 'reading') {
    return <Loading />;
  }

  if (status == 'insertCard') {
    return <PaymentCaptureScreen />;
  }
  return (
    <View style={[styles.container]}>
      <Slugan />
      <Buttons />
      <Footer />
      {readersVisible ? (
        <View style={[styles.readerBox]}>
          <View style={[styles.readerBlock]}>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                top: 10,
                right: 10,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  readerVisile(false);
                }}
                style={styles.readerClose}>
                <Icon name="xmark" style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.readerTitle}>Readers Type</Text>
            <TouchableOpacity
              onPress={() => mobleReader()}
              style={[
                styles.readerButton,
                Platform.OS === 'android'
                  ? styles.androidShadow
                  : styles.iosShadow,
              ]}>
              <Text style={styles.readerText}> Mobile Reader</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => BluetoothReader()}
              style={[
                styles.readerButton,
                Platform.OS === 'android'
                  ? styles.androidShadow
                  : styles.iosShadow,
              ]}>
              <Text style={styles.readerText}> External Reader</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {discoveredReaders.length > 0 && readerFound == 'readed' ? (
        <View style={[styles.readerBox]}>
          <View style={[styles.readerBlock]}>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                top: 10,
                right: 10,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => handleReaderVisible()}
                style={styles.readerClose}>
                <Icon name="xmark" style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.readerTitle}>Readers Found</Text>
            {discoveredReaders.map(item => (
              <TouchableOpacity
                onPress={() => connectReader(item)}
                key={Math.random()}
                style={[
                  styles.readerButton,
                  Platform.OS === 'android'
                    ? styles.androidShadow
                    : styles.iosShadow,
                ]}>
                <Text style={styles.readerText}> {item.deviceType} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}

      {keyModal || !key ? (
        <View style={[styles.modal]}>
          <SecretKeyModal />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  readerBox: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#70707090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  readerBlock: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  readerTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: '#444444',
    marginVertical: 10,
  },
  readerButton: {
    width: 200,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
  },
  androidShadow: {
    elevation: 3,
  },
  iosShadow: {
    shadowColor: '#eeea',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  readerText: {
    fontSize: 18,
    color: 'black',
  },
  readerClose: {
    width: 32,
    padding: 10,
    backgroundColor: '#eeea',
    borderRadius: 100,
  },
  closeIcon: {
    color: '#0D7990',
    fontSize: 15,
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

export default Home;
