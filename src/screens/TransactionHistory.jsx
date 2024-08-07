import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const TransactionHistory = () => {
  const route = useRoute();
  const {transactions} = route.params;
  const navigation = useNavigation();
  const formatDate = timestamp => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.innerBlock}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Amount</Text>
              <Text style={styles.headerText}>Status</Text>
              <Text style={styles.headerText}>Description</Text>
              <Text style={styles.headerText}>Date</Text>
            </View>
            {transactions ? (
              transactions.data.map(item => (
                <View key={item.id} style={styles.row}>
                  <Text style={styles.rowText}>£{item.amount / 100}.00</Text>
                  <Text
                    style={[
                      styles.rowText,
                      item.status == 'succeeded'
                        ? {
                            backgroundColor: '#00aaff',
                            padding: 6,
                            color: 'white',
                          }
                        : {backgroundColor: 'red', padding: 6, color: 'white'},
                    ]}>
                    {item.status}
                  </Text>
                  <Text style={styles.rowText}>{item.description}</Text>
                  <Text style={styles.rowText}>{formatDate(item.created)}</Text>
                </View>
              ))
            ) : (
              <Text> No History Available</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  block: {
    width: '95%',
    height: '100%',
    marginTop: 20,
  },
  innerBlock: {
    width: '100%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#eeea',
    borderBottomWidth: 1.5,
    paddingHorizontal: 10,
  },
  headerText: {
    color: 'black',
    fontWeight: '600',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
    backgroundColor: '#eeea',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  rowText: {
    fontSize: 12,
    color: 'black',
  },
});

export default TransactionHistory;
