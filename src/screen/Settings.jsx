import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import colors from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Settings = () => {
  return (
    <>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subhead}>Account</Text>
      <View style={styles.first}>
        <Text style={styles.text}>Edit Profile</Text>
        <Icon name="user" size={20} color="#544c4c" style={styles.email} />
        <Text style={styles.text}>Security</Text>
        <Icon name="shield-alt" size={20} color="#544c4c" style={styles.privacy} />
        <Text style={styles.text}>Notification</Text>
        <Icon name="bell" size={20} color="#544c4c" style={styles.notification} />
        <Text style={styles.text}>Privacy</Text>
        <Icon name="lock" size={20} color="#544c4c" style={styles.lock} />
      </View>
      <Text style={styles.subhead}>Support & About</Text>
      <View style={[styles.first,{height: 125}]}>
        <Text style={styles.text}>My Subscription</Text>
        <Icon name="credit-card" size={20} color="#544c4c" style={[styles.email,{bottom:92}]} />
        <Text style={styles.text}>Help & Support</Text>
        <Icon name="question-circle" size={20} color="#544c4c" style={[styles.privacy,{bottom:53}]} />
        <Text style={styles.text}>Terms and Policies</Text>
        <Icon name="exclamation-circle" size={20} color="#544c4c" style={[styles.notification,,{bottom:11}]} />
       
      </View>
      <Text style={styles.subhead}>Actions</Text>
      <View style={[styles.first,{height: 95}]}>
        <Text style={styles.text}>Report a problem</Text>
        <Icon name="flag" size={20} color="#544c4c" style={[styles.email,{bottom:62}]} />
        <Text style={styles.text}>Log out</Text>
        <Icon name="sign-out-alt" size={20} color="#544c4c" style={[styles.privacy,{bottom:23}]} />

       
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  first: {
    height: 172,
    width: '85%',
    backgroundColor: '#e6e6e9',
    marginHorizontal: 28,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 4,
  },
  text: {
    fontSize: 19,
    color: '#544c4c',
    marginHorizontal: 60,
    marginVertical: 9,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
  },

  title: {
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30,
  },
  subhead: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 18,
    marginTop: 15,
    marginHorizontal: 40,
  },
  email: {
    position: 'absolute',
    right: 275,
    bottom: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacy: {
    position: 'absolute',
    right: 275,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    position: 'absolute',
    right: 275,
    bottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lock: {
    position: 'absolute',
    right: 275,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Settings;
