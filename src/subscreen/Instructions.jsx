import React from 'react';
import {View, Text, ScrollView, StyleSheet, Linking} from 'react-native';

export default function Instructions() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>PayXhub & Stripe Setup Instructions</Text>

      <Text style={styles.subheading}>
        Step 1: Creating a Location in Stripe
      </Text>
      <Text style={styles.text}>
        1. Log In to Stripe: {'\n'}
        Go to the{' '}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://dashboard.stripe.com')}>
          Stripe Dashboard
        </Text>{' '}
        and log in with your Stripe account credentials.{'\n\n'}
        2. Navigate to Terminal: {'\n'}
        On the left sidebar, find and click on "Terminal" under the "Payments"
        section.{'\n\n'}
        3. Create a Location: {'\n'}- Click on "Locations" in the Terminal
        section.{'\n'}- Click on the "New" button to create a new location.
        {'\n'}- Fill in the required details such as display name, address,
        city, state, country, and postal code.{'\n'}- Once all details are
        filled in, click the "Save" button to create the location.{'\n\n'}
      </Text>

      <Text style={styles.subheading}>Step 2: Finding Your Secret Key</Text>
      <Text style={styles.text}>
        1. Navigate to API Keys: {'\n'}
        From the Stripe Dashboard, go to the "Developers" section on the left
        sidebar.{'\n'}
        Click on "API keys."{'\n\n'}
        2. View Your API Keys: {'\n'}
        In the API keys section, you will see both your "Publishable key" and
        "Secret key."{'\n'}
        The "Secret key" will be partially obscured. Click on the eye icon next
        to it to reveal the full key.{'\n\n'}
        3. Copy Your Secret Key: {'\n'}
        Click on the "Reveal live key" or "Reveal test key" button (depending on
        whether you are using live or test mode).{'\n'}
        Copy the full secret key for use in PayX Hub Secret key box and save
        {'\n\n'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    color: '#414141',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#3f3f3f',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#323232',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
