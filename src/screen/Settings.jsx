import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const Settings = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
    toggleModal();
  };

  const handleCancel = () => {
    toggleModal();
  };

  const logout = () => {
    toggleModal();
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.secondary, flex: 1 }}>
        <ScrollView>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subhead}>Account</Text>
          <View style={styles.first}>
            <Text style={styles.text} onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Text>
            <Icon name="user" size={20} color="#544c4c" style={styles.email} />
            <Text style={styles.text} onPress={() => navigation.navigate('ConfirmationCodeInput')}>Security</Text>
            <Icon
              name="shield-alt"
              size={20}
              color="#544c4c"
              style={styles.privacy}
            />
            <Text style={styles.text} onPress={() => navigation.navigate('Quiz')}>Mini Quiz</Text>
            <Icon
              name="gamepad"
              size={20}
              color="#544c4c"
              style={styles.notification}
            />
            <Text style={styles.text} onPress={() => navigation.navigate('Privacy')}>Privacy Policy</Text>
            <Icon name="lock" size={20} color="#544c4c" style={styles.lock} />
          </View>
          <Text style={styles.subhead}>Support & About</Text>
          <View style={[styles.first, { height: 135 }]}>
            <Text style={styles.text} onPress={() => navigation.navigate('Subscribe')}>My Subscription</Text>
            <Icon
              name="credit-card"
              size={20}
              color="#544c4c"
              style={[styles.email, { bottom: 100 }]}
            />
            <Text style={styles.text} onPress={() => navigation.navigate('Support')}>Help & Support</Text>
            <Icon
              name="question-circle"
              size={20}
              color="#544c4c"
              style={[styles.privacy, { bottom: 60 }]}
            />
            <Text style={styles.text} onPress={() => navigation.navigate('Terms')}>Terms and Policies</Text>
            <Icon
              name="exclamation-circle"
              size={20}
              color="#544c4c"
              style={[styles.notification, , { bottom: 20 }]}
            />
          </View>
          <Text style={styles.subhead}>Actions</Text>
          <View style={[styles.first, { height: 95 }]}>
            <Text style={styles.text} onPress={() => navigation.navigate('Report')}>Report a problem</Text>
            <Icon
              name="flag"
              size={20}
              color="#544c4c"
              style={[styles.email, { bottom: 60 }]}
            />
            <Text
              style={styles.text}
              onPress={logout}>
              Log Out
            </Text>
            <Icon
              name="sign-out-alt"
              size={20}
              color="#544c4c"
              style={[styles.privacy, { bottom: 20 }]}
            />
          </View>
          <Text style={styles.subhead}>Records</Text>
          <View style={[styles.first, { height: 50 }]}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate('test')}>
              My Records
            </Text>
            <Icon
              name="file"
              size={20}
              color="#544c4c"
              style={[styles.email, { bottom: 16 }]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleCancel}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver={true}
      >
        <View style={styles.modalContent}>
          <Icon
            name="exclamation-triangle"
            size={48}
            color="#FF0000"
            style={styles.icon}
          />
          <Text style={[styles.modalTitle, { color: 'black' }]}>Confirm Logout</Text>
          <Text style={[styles.modalMessage, { color: 'black' }]}>Are you sure you want to log out?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.button, styles.logoutButton]}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  first: {
    height: 175,
    width: '85%',
    backgroundColor: '#e6e6e9',
    marginHorizontal: 28,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
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
    marginHorizontal: 20,
    bottom: 143,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacy: {
    position: 'absolute',
    marginHorizontal: 20,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    position: 'absolute',
    marginHorizontal: 18,
    bottom: 59,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lock: {
    position: 'absolute',
    marginHorizontal: 20,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  icon: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#FFCC00',
  },
  logoutButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Settings;
